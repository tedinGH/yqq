
import '../../utils/app'
import store from '../../store'
import {sha1} from '../../utils/sha1.js'
import CryptoJS from 'crypto-js'

let dcodeIO = require('../../utils/utfx.min')
let websocket,
		user = JSON.parse(app.getCookie('user')),
    utfx = dcodeIO.dcodeIO.utfx,
		wsStatus=false,
		timer = {}, 
		failMsg = {}

function subscribe(callback) {
	if(websocket!=undefined&&websocket!=null){
		websocket.close();
		websocket=null;
	}
	websocket=new WebSocket("wss://download.fc653.com:8443/testws")
	// 接受ArrayBuffer实例作为参数
	websocket.binaryType = 'arraybuffer'

	//收到消息
	websocket.onmessage = function(event){
		let data = bufferToMsgEntity(event.data)
		switch (data.type) {
			case 21://登陆成功
				wsStatus=true
				if(typeof(callback)=='function') callback()
				break
			case 22://登陆失败
				wsStatus=false
				alert.msg("登陆失败!")
				break
			case 26://重连成功
				wsStatus=true
				break
			case 27://重连失败
				wsStatus=false
				alert.msg("登陆失败!")
				break
			case 10://心跳包
				sendArrayBuffer(getReceiptHeardPacket())
				break
			case 32://其他地方登陆
				alert("您的otc账号已被其它设备登陆，如非本人操作请及时冻结账号！若重新登陆请刷新浏览器")
				break
			case 40: //消息发送成功回执
				try{
					store.state.messages[data.msgId].send = 2;
					clearInterval(timer[data.msgId])
				} catch(err){}
				break
			case 10004://订单消息-类群消息
				groupMsghandler(data)
				break
			default:
				new Error('Unknow message type')
				break
		}
	}
	
	//连接关闭的时候触发
	websocket.onclose = function(event){
		wsStatus=false
	}
	
	//连接打开的时候触发
	websocket.onopen = function(event){
			websocket.send(connection(user.userId,user.token))
	}
}

subscribe()

//订单消息处理  -类使用群聊
function groupMsghandler(data){
	sendArrayBuffer(getReceiptMsgId(data.msgId))
	let msgEntity = JSON.parse(data.body)
	msgEntity.msgId = data.msgId;
	if(msgEntity.msgType==11){//文本信息
		let msg = socket.decryptByDES(msgEntity.msg,data.fromId)
		msg = msg.replace(/ /g, '&nbsp;')
		msg = msg.replace(/\n/g,"<br/>")
		msgEntity.msg = msg
		store.commit('addMessage', msgEntity)
	}else if(msgEntity.msgType==12){//图片消息
		let msg = JSON.parse(socket.decryptByDES(msgEntity.msg,data.fromId));
		msgEntity.msg = msg.imgUrl;
		store.commit('addMessage', msgEntity)
	}else{//系统通知
		store.commit('addMessage', msgEntity)
	}
}

//发送处理
function sendArrayBuffer(arrayBuffer){
  if(wsStatus){
    websocket.send(arrayBuffer)
  }else{
    alert("消息服务已断开连接,请刷新重连！")
  }
}

//发送处理
function connection(userId,password){
  return getArrayBuffer(20,getMsgId(),0,0,userId+','+password+','+getLange()+',web')
}

// 自动生成消息id
function getMsgId(){
	let timestamp=new Date().getTime()
	return timestamp%1000000000
}

function getReceiptHeardPacket(){
	return getArrayBuffer(11)
}

function getReceiptMsgId(msgId){
	return getArrayBuffer(40,msgId)
}

function replayLabel(msg){
	msg=msg.replace(/<br\s*\/?>/gi,"\r\n")//换行转换
	msg=msg.replace(/&nbsp;/g, ' ')//空格转换
	msg=msg.replace(/<div>/g, "\r\n")//特殊化div转换行
	msg=msg.replace(/<[^>]+>/g,"")//其它标签去除
	return msg
}

function stringSource(s) {
	let i = 0
	return () => i < s.length ? s.charCodeAt(i++) : null
}

function getArrayBuffer(type,msgId,toId,fromId,body){
	if(type!=undefined&&type!=null){
		let length = 4,
				strLength = 0,
				strCodes
		if(msgId!=undefined&&msgId!=null){
			length = 8
			if(body!=undefined&&body!=null){
				strCodes = stringSource(body)
				strLength = utfx.calculateUTF16asUTF8(strCodes)[1]
				length = 20+strLength;
			}
		}
		let buffer = new ArrayBuffer(length) // 初始化长度为UTF8编码后字符串长度+4个Byte的二进制缓冲区
		let view = new DataView(buffer)
		view.setUint32(0, type)
		if(length>=8){
			view.setUint32(4,msgId)
			if(length>8){
				view.setUint32(8,toId)
				view.setUint32(12,fromId)
				view.setUint32(16,strLength)
				let offset =20
				utfx.encodeUTF16toUTF8(stringSource(body), function (b) {
					view.setUint8(offset++, b)
				}.bind(this))
			}
		}
		return buffer
	}
	return null           
}

//二进制转换字符串过程
function bufferToMsgEntity(arrayBuffer){
	let arraySize = arrayBuffer.byteLength,
			view = new DataView(arrayBuffer),
			msgEntity = {},
			result = [] 
	msgEntity.type = view.getUint32(0)
	if(arraySize>=8){
		msgEntity.msgId = view.getUint32(4)
		if(arraySize>8){
			msgEntity.toId = view.getUint32(8)
			msgEntity.fromId = view.getUint32(12)
			let strLength = view.getUint32(16),
					offset=20,
					end = offset+strLength
			utfx.decodeUTF8toUTF16(function () {
				return offset < end ? view.getUint8(offset++) : null; // 返回null时会退出此转换函数
			}.bind(this), (char) => {
				result.push(char)
			})
			let strResult = result.reduce((prev, next)=>{
				return prev + String.fromCharCode(next)
			}, '')
			msgEntity.body=strResult
		}
	}
	return msgEntity
}

function getLange(){
  let JsSrc =(navigator.language || navigator.browserLanguage).toLowerCase()
  let lange=""
  if(JsSrc.indexOf('zh')>=0)lange="zh_CN"
  else if(JsSrc.indexOf('en')>=0) lange="en"
  else lange="zh_CN"
  return lange
}

let socket = {
	sendMsg(toId,content,msgType){ //发送消息
		let msgId = getMsgId(),
				msg = msgType==11?replayLabel(content):JSON.stringify(content)
		if(websocket.readyState == WebSocket.OPEN) { 
			let body=`{"orderCode":"${toId}","nickName":"${user.nickName}","msg":"${socket.encryptByDES(msg,toId)}","msgType":${msgType},"avatar":"${user.avatar}"}`
			sendArrayBuffer(getArrayBuffer(10004,msgId,toId,user.userId,body)) 
		}else{ 
			let body=`{"orderCode":"${toId}","nickName":"${user.nickName}","msg":"${socket.encryptByDES(msg,toId)}","msgType":${msgType},"avatar":"${user.avatar}"}`
			sendArrayBuffer(getArrayBuffer(10004,msgId,toId,user.userId,body)) 
		}
		let message = {
			avatar: user.avatar,
			fromId: user.userId,
			msg: msgType==11?content:content.imgUrl,
			msgId: msgId,
			msgType: msgType,
			nickName: user.nickName,
			orderCode: '',
			roomId: '',
			time: new Date().getTime(),
			send:1  //1发送中，2发送成功，3发送失败
		}
		store.commit('addMessage', message) //自动生成消息记录
		timer[msgId.toString()] = setTimeout(()=>{
			try{
				failMsg[msgId.toString()] = msg;
				store.state.messages[msgId].send = 3;
			} catch(err){}
		},60000)
	},
	resendMsg(msgId,toId){ //重新发送消息
		let resend = function(){
			let msg = store.state.messages[msgId]	
			msg.send = 1;
			if(websocket.readyState == WebSocket.OPEN) { 
				let body=`{"orderCode":"${toId}","nickName":"${msg.nickName}","msg":"${socket.encryptByDES(failMsg[msgId],toId)}","msgType":${msg.msgType},"avatar":"${msg.avatar}"}`
				sendArrayBuffer(getArrayBuffer(10004,msgId,toId,msg.fromId,body)) 
			}
			timer[msgId.toString()] = setTimeout(()=>{
				try{
					store.state.messages[msgId].send = 3;
				} catch(err){}
			},60000)
		}
		if(websocket.readyState != WebSocket.OPEN) subscribe(resend)
		else resend()
	},
	getImgUrl(file,url){
		return new Promise((resolve,reject)=>{
			let newform=new FormData()     
			newform.append("mFile",file)      
			newform.append("deviceType",'2')
			newform.append("cval",sha1(user.token+Date.parse(new Date())))
			newform.append("uid",parseInt(user.userId).toString(16))
			newform.append("rtime",Date.parse(new Date()))
			let xml = new XMLHttpRequest()
			xml.open("post",url,true)
			xml.send(newform)
			xml.onreadystatechange = ()=>{
				if(xml.status == 200){
					setTimeout(()=>{
						let data = JSON.parse(xml.responseText)
						if(data.code == 0) resolve(data.data)
						else reject(data.data)
					},20)
				}
			}
		})
	},
	isShowTime(firstTime,endTime){
		if((parseInt(endTime)-parseInt(firstTime))>=180000) return true
		else return false
	},
	resetPwd(pwd){
		pwd += ""
		let str = ""
		if(pwd.length>=8) return pwd
		for (let i=0;i<(8-pwd.length);i++){
			str += "0"
		}
		return str += pwd
	},
	decryptByDES(ciphertext, key) {//DES 解密
		key = this.resetPwd(key)
		ciphertext = ciphertext.replace(/\s*/g, "")
		let keyHex = CryptoJS.enc.Utf8.parse(key)
		let decrypted = CryptoJS.DES.decrypt({
				ciphertext: CryptoJS.enc.Base64.parse(ciphertext)
		}, keyHex, {
				mode: CryptoJS.mode.CBC,
				padding: CryptoJS.pad.Pkcs7,
				iv: CryptoJS.enc.Latin1.parse("12345678")
		})
		return decrypted.toString(CryptoJS.enc.Utf8)
	},
	encryptByDES(message, key) {//DES 加密
		key = this.resetPwd(key)
		let keyHex = CryptoJS.enc.Utf8.parse(key)
		let encrypted = CryptoJS.DES.encrypt(message, keyHex, {
				mode: CryptoJS.mode.CBC,
				padding: CryptoJS.pad.Pkcs7,
				iv:CryptoJS.enc.Latin1.parse("12345678")
		});
		return encrypted.toString()
	}
}

export default socket