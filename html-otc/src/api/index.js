import './serves'
import * as urls from './urls'
import store from '../store'
import Msg from '@/tools/msg'
import axios from 'axios'
import { localStore } from '@/tools/localStorage'
import { msgManager } from "@/session/msgManager";
import { Crypto } from "@/tools/crypto"
import { Config } from "@/common/config"
import { group } from "@/session/group";

export const api = {
  getQrcodeUrl(data){
    return new Promise((resolve,reject) => {
      axios.post(urls.LOGIN_QR_CODE, data).then(
        res => {
          resolve(res.data)
        },
        ()=> {
          reject()
        }
      )
    })
  },
  qrcodeLogin(data){
    return new Promise((resolve, reject) => {
      axios.post(urls.QR_LOGIN, data).then(
        res => { 
          if(res.code == 0){
            resolve(res.data)
          }else{
            reject()
          } 
        },
        () => {
        }
      )
    })
  },
  loginAgain(data){
    return new Promise(resolve => {
      axios.post(urls.LOGIN_AGAIN, data).then(
        res => {
          resolve()
        },
        () => {}
      )
    })
  },
  getloginState(data){
    return new Promise((resolve, reject) => {
      axios.post(urls.LOGIN_STATE, data).then(
        res => {
          if(res.code == 0){
            resolve(res.data)
          }else{
            reject()
          } 
        },
        () => {
        }
      )
    })
  },
  createSelectCode(data){
    return new Promise((resolve, reject) => {
      axios.post(urls.CREATE_CODE, data).then(
        res => {
          resolve(res.data)
        },
        () => {
          reject()
        }
      )
    })
  },
  checkSelectCode(data){
    return new Promise((resolve, reject) => {
      axios.post(urls.CHECK_CODE, data).then(
        res => {
          resolve(res.data)
        },
        () => {
          reject()
        }
      )
    })
  },
  getSmsCodeNo(data){
    return new Promise((resolve, reject) => {
      axios.post(urls.GET_SMS_CODE_NO, data).then(
        res => {
          resolve(res)
        },
        () => {
          reject()
        }
      )
    })
  },
  smslogin(data){
    return new Promise((resolve, reject) => {
      axios.post(urls.LOGIN, data).then(
        res => { 
          resolve(res.data)
        },
        () => {
          reject()
        }
      )
    })
  },
  logout(data) {
    return new Promise(resolve => {
      axios.post(urls.LOG_OUT, data).then(
        res => {
          resolve(res)
        },
        () => { }
      )
    })
  },
  getfilesize(data) {
    data={key:'sys_file_size'}
    return new Promise(resolve => {
      axios.post(urls.GET_FILE_SIZE, data).then(
        res => {
          resolve(res)
        },
        () => { }
      )
    })
  },
  searchInfo(data) {
    return new Promise((resolve, reject) => {
      data.ids = Crypto.encryptByDES(data.ids + '');
      axios.post(urls.SEARCH_INFO, data).then(
        res => {
          if (res.data && res.data.length) {
            resolve(res.data);
          } else {
            reject("暂无数据");
          }
        },
        () => {
          reject();
        }
      )
    })
  },
  findUserMobile(data) {
    return new Promise((resolve, reject) => {
      axios.post(urls.FIND_USERMOBILE, data).then(
        res => {
          if (res.data && res.data.length) {
            resolve(res.data);
          } else {
            reject("暂无数据");
          }
        },
        () => {
          reject();
        }
      )
    })
  },
  getFriendInfo(data) {
    return new Promise((resolve, reject) => {

      axios.post(urls.GET_FRIEND_INFO, data).then(
        res => {
          resolve(res.data);
        },
        () => {
          reject();
        }
      )
    })
  },
  updateallowmobile(data) {
    return new Promise((resolve, reject) => {
      axios.post(urls.UPDATE_ALLOWMOBILE, data).then(
        res => {
          resolve(res.data);
        },
        () => {
          reject();
        }
      )
    })
  },
  addcontactdi(data) {
    return new Promise((resolve, reject) => {
      axios.post(urls.ADD_CONTACTDI, data).then(
        res => {
          resolve(res);
        },
        () => {
          reject();
        }
      )
    })
  },
  addFriend(data) {
    data.recipient = Crypto.encryptByDES(data.recipient + '');
    return new Promise((resolve, reject) => {
    axios.post(urls.ADD_FRIEND, data).then(
      res => {
        resolve(res);
      },
      () => { reject(); }
    )
  })
  },
  friendVerify(data) {
    return new Promise((resolve, reject) => {
      data.recipient = Crypto.encryptByDES(data.recipient + '');
      axios.post(urls.FRIEND_VERIFY, data).then(
        () => {
          resolve();
        },
        () => { }
      )
    })
  },
  getVerifyDetail(data) {
    return new Promise((resolve, reject) => {
      data.verifyId = Crypto.encryptByDES(data.verifyId + '');
      axios.post(urls.GET_VERIFY_DETAIL, data).then(
        res => {
          resolve(res.data);
        },
        () => { }
      )
    })
  },
  deleteFriend(data) {
    return new Promise((resolve, reject) => {
      data.recipient = Crypto.encryptByDES(data.recipient + '');
      axios.post(urls.DELETE_FRIEND, data).then(
        res => {
          toast(res.data);
          resolve();
        },
        () => { }
      )
    })
  },
  setFriendSetting(data) {
    return new Promise((resolve, reject) => {
      data.recipient = Crypto.encryptByDES(data.recipient + '');
      axios.post(urls.SET_FRIEND_SETTING, data).then(
        res => {
          toast(res.data);
          resolve()
        },
        () => { }
      )
    })
  },
  setRemark(data) {
    return new Promise((resolve, reject) => {
      axios.post(urls.SET_REMARK, data).then(
        res => {
          resolve(res);
          //更新好友信息
          // friendDB.update();
        },
        () => { }
      )
    })
  },
  joinGroup(data) {
    return new Promise((resolve, reject) => {
      axios.post(urls.JOIN_GROUP, data).then(
        res => {
          toast(res.data);
          resolve();
        },
        () => { }
      )
    })
  },
  createGroup(data) {
    return new Promise((resolve, reject) => {
      axios.post(urls.CREATE_GROUP, data).then(
        res => {
          resolve(res.data);
        },
        () => { }
      )
    })
  },
  getGroupSetting(data) {
    return new Promise((resolve, reject) => {
      axios.post(urls.GET_GROUP_SETTING, data).then(
        res => {
          resolve(res.data);
        },
        res => {
          if (res.code == 101004 || res.code == 101006 ) {
            store.commit('DELETE_SESSION', data.groupId + '-1')
            store.commit('UPDATE_CURRENT_SESSION', {});
            //删除群信息。删除群消息，//删除群成员
            group.quit(data.groupId);
            let obj = {
              sessionId: data.groupId,
              type: 1
            };
            api.removeSession(obj)
          }else if(res.code == 101017){
            store.commit('DELETE_SESSION', data.groupId + '-1')
            store.commit('UPDATE_CURRENT_SESSION', {});
            store.commit('SET_CROWDTOAST_TEXT', res.data)
            //删除群信息。删除群消息，//删除群成员
            group.quit(data.groupId);
            let obj = {
              sessionId: data.groupId,
              type: 1
            };
            api.removeSession(obj)
          }
        }
      )
    })
  },
  setGroupSetting(data) {
    return new Promise((resolve, reject) => {
      axios.post(urls.SET_GROUP_SETTING, data).then(
        res => {
          toast(res.data);
          resolve(res.data);
        },
        () => {
          reject();
        }
      )
    })
  },
  getGroupAffiche(data) {
    return new Promise((resolve, reject) => {
      axios.post(urls.GET_GROUP_AFFICHE, data).then(
        res => {
          resolve(res.data);
        },
        () => {
          reject();
        }
      )
    })
  },
  setGroupAffiche(data) {
    return new Promise((resolve, reject) => {
      axios.post(urls.SET_GROUP_AFFICHE, data).then(
        res => {
          resolve(res.data);
        },
        () => {
          reject();
        }
      )
    })
  },
  deleteGroupAffiche(data) {
    return new Promise((resolve, reject) => {
      axios.post(urls.DELETE_GROUP_AFFICHE, data).then(
        res => {
          resolve(res.data);
        },
        () => {
          reject();
        }
      )
    })
  },
  inviteGroupUser(data) {
    return new Promise((resolve, reject) => {
      axios.post(urls.INVITE_GROUP_USER, data).then(
        res => {
          resolve(res);
        },
        () => {
          reject();
        }
      )
    })
  },
  inviteForbidUser(data) {
    return new Promise((resolve, reject) => {
      axios.post(urls.INVITE_FORBID_USER, data).then(
        res => {
          resolve(res);
        },
        () => {
          reject();
        }
      )
    })
  },
  invitationAgreeJoin(data) {
    return new Promise((resolve, reject) => {
      axios.post(urls.INVITATION_AGREE_JOIN, data).then(
        res => {
          resolve(res);
        },
        () => {
          toast(res.data);
          reject(res);
        }
      )
    })
  },
  deleteGroupUser(data) {
    return new Promise((resolve, reject) => {
      axios.post(urls.DELETE_GROUP_USER, data).then(
        res => {
          toast(res.data);
          resolve(res.data);
        },
        () => {
          reject();
        }
      )
    })
  },
  userQuit(data) {
    return new Promise((resolve, reject) => {
      axios.post(urls.USER_QUIT, data).then(
        res => {
          toast(res.data);
          resolve(res.data);
        },
        res => {
          if (res.code == 101004 || res.code == 101006 || res.code == 101017) {
            store.commit('DELETE_SESSION', data.groupId + '-1')
            store.commit('UPDATE_CURRENT_SESSION', {});
            //删除群信息。删除群消息，//删除群成员
            group.quit(data.groupId);
          }
        }
      )
    })
  },
  deleteGroup(data) {
    return new Promise((resolve, reject) => {
      axios.post(urls.DELETE_GROUP, data).then(
        res => {
          toast(res.data);
          resolve(res.data);
        },
        () => { }
      )
    })
  },
  editMessage(data) {
    return new Promise((resolve, reject) => {
      data.msgId = Crypto.encryptByDES(data.msgId + '');
      data.sessionUserId = Crypto.encryptByDES(data.sessionUserId + '');
      axios.post(urls.EDIT_MESSAGE, data).then(
        res => {
          resolve();
        },
        () => { }
      )
    })
  },
  withdrawMessage(data) {
    return new Promise((resolve, reject) => {
      data.msgId = Crypto.encryptByDES(data.msgId + '');
      data.sessionUserId = Crypto.encryptByDES(data.sessionUserId + '');
      axios.post(urls.WITHDRAW_MESSAGE, data).then(
        res => {
          resolve();
        },
        () => { }
      )
    })
  },
  deleteMessage(data) {
    return new Promise((resolve, reject) => {

      data.sessionUserId = Crypto.encryptByDES(data.sessionUserId + '');
      if (data.folkMsgId) {
        data.folkMsgId = Crypto.encryptByDES(data.folkMsgId);
      }
      if (data.multMsgId) {
        data.multMsgId = Crypto.encryptByDES(data.multMsgId + '');
      }
      axios.post(urls.DELETE_MESSAGE, data).then(
        res => {
          resolve();
        },
        () => { }
      )
    })
  },
  emojiList(data) {
    return new Promise((resolve, reject) => {
      axios.post(urls.EMOJI_lIST, data).then(
        res => {
          resolve(res.data)
        },
        () => {
          reject()
        }
      )
    })
  },
  loadEmoji(data) {
    return new Promise((resolve, reject) => {
      axios.post(urls.LOAD_EMOJI, data).then(
        res => {
          resolve(res.data)
        },
        () => {
          reject()
        }
      )
    })
  },
  addEmoji(data) {
    return new Promise((resolve, reject) => {
      axios.post(urls.ADD_EMOJI, data).then(
        res => {
          resolve(res.data)
        },
        () => {
          reject()
        }
      )
    })
  },
  deleteEmoji(data) {
    return new Promise((resolve, reject) => {
      axios.post(urls.DELETE_EMOJI, data).then(
        res => {
          resolve(res.data)
        },
        () => {
          reject()
        }
      )
    })
  },
  updateEmoji(data) {
    return new Promise((resolve, reject) => {
      axios.post(urls.UPDATE_EMOJI, data).then(
        res => {
          resolve(res.data)
        },
        () => {
          reject()
        }
      )
    })
  },
  emojiDatail(data) {
    return new Promise((resolve, reject) => {
      axios.post(urls.EMOJI_DETAIL, data).then(
        res => {
          resolve(res.data)
        },
        () => {
          reject()
        }
      )
    })
  },
  startCommunication(data) {
    data.receiverId = Crypto.encryptByDES(data.receiverId + '');
    if (data.groupId) {
      data.groupId = Crypto.encryptByDES(data.groupId + '');
    }
    return new Promise((resolve, reject) => {
      axios.post(urls.START_COMMUNICATION, data).then(
        res => {
          resolve(res.data)
        },
        () => {
          reject()
        }
      )
    })
  },
  changeCommunication(data) {
    return new Promise((resolve, reject) => {
      axios.post(urls.CHANGE_COMMUNICATION, data).then(
        () => {
          resolve()
        },
        () => {
          reject()
        }
      )
    })
  },
  changeToAudio(data) {
    axios.post(urls.SWITCH_TO_AUDIO, data).then(
      () => { },
      () => { }
    )
  },
  checkCommunication(data) {
    axios.post(urls.CHECK_COMMUNICATION, data).then(
      () => { },
      () => { }
    )
  },
  setUserSetting(data) {
    axios.post(urls.SET_USER_SETTING, { modularCode: '1', confString: data }).then(
      res => {
        toast(res.data)
      },
      () => { }
    )
  },
  addFeedback(data) {
    return new Promise((resolve, reject) => {
      axios.post(urls.ADD_FEEDBACK, data).then(
        res => {
          resolve(res.data);
        },
        () => {
          reject();
        }
      )
    })
  },
  uploadFile(data) {
    return new Promise((resolve, reject) => {
      axios.post(urls.UPLOAD_FILE, data).then(
        res => {
          resolve(res.data);
        },
        () => {
          reject();
        }
      )
    })
  },
  // getQrcodeUrl(data) {
  //   return new Promise(resolve => {
  //     axios.post(base.codeUrl + "/imrtcweb/login/getOrc.htm", data).then(
  //       res => {
  //         resolve(res.data)
  //       },
  //       () => { }
  //     )
  //   })
  // },
  getloginState(data) {
    return new Promise((resolve, reject) => {
      axios.post(base.codeUrl + "/imrtcweb/login/state.htm", data).then(
        res => {
          if (res.code == 0) {
            resolve(res.data)
          } else {
            reject()
          }
        },
        () => { }
      )
    })
  },
  qrcodeLogin(data) {
    return new Promise((resolve, reject) => {
      axios.post(base.codeUrl + "/imweb/user/qrcodelogin.htm", data).then(
        res => {
          if (res.code == 0) {
            resolve(res.data)
          } else {
            reject()
          }
        },
        () => { }
      )
    })
  },
  sendMessage(data) {
    return new Promise((resolve, reject) => {
      axios.post(urls.SEND_MESSAGE, data).then(
        res => {
          resolve(res.data)
        },
        () => {
          reject(data);
        }
      )
    })
  },
  rtcMessage(data) {
    return new Promise((resolve, reject) => {
      axios.post(urls.RTC_MESSAGE, data).then(
        res => {
          resolve(res.data)
        },
        data => {
          if (data.message) {
            setTimeout(() => {
              reject()
            }, 10 * 1000)
          }
        }
      )
    })
  },
  setNickname(data) {
    return new Promise((resolve, reject) => {
      axios.post(urls.SET_NICKNAME, data).then(
        res => {
          resolve(res.data)
        },
        () => {
          reject()
        }
      )
    })
  },
  setAlias(data) {
    return new Promise((resolve, reject) => {
      axios.post(urls.SET_ALIAS, data).then(
        res => {
          resolve(res.data)
        },
        () => {
          reject()
        }
      )
    })
  },
  setGender(data) {
    return new Promise((resolve, reject) => {
      axios.post(urls.SET_GENDER, data).then(
        res => {
          resolve(res.data)
        },
        () => {
          reject()
        }
      )
    })
  },
  setSignature(data) {
    return new Promise((resolve, reject) => {
      axios.post(urls.SET_SIGNATURE, data).then(
        res => {
          resolve(res.data)
        },
        () => {
          reject()
        }
      )
    })
  },
  setArea(data) {
    return new Promise((resolve, reject) => {
      axios.post(urls.SET_AREA, data).then(
        res => {
          resolve(res.data)
        },
        () => { }
      )
    })
  },
  getMesssages(data) {
    return new Promise((resolve, reject) => {
      let paramId = data.sessionUserId
      data.sessionUserId = Crypto.encryptByDES(data.sessionUserId + '');
      axios.post(urls.GET_MESSAGE_LIST, data).then(
        res => {
          Msg.chatHistoryInit(res.data.list, data.type, paramId).then(list => {
            resolve(list)
          });
        },
        res => {
          if (res.code == 101004 || res.code == 101006 || res.code == 101017) {
            //不是群成员，或者群已经解散
            store.commit('DELETE_SESSION', paramId + '-' + data.type)
            store.commit('UPDATE_CURRENT_SESSION', {});
            group.quit(paramId);
          }
        }
      )
    })
  },
  getOrders(data) {
    return new Promise((resolve, reject) => {
      data.msgId = Crypto.encryptByDES(data.msgId + '');
      data.sessionUserId = Crypto.encryptByDES(data.sessionUserId + '');
      axios.post(urls.GET_ORDER_LIST, data).then(
        res => {
          resolve(res.data)
        },
        res => {
          if (res.code == 101004 || res.code == 101006 || res.code == 101017) {
            //不是群成员，或者群已经解散//预留位置
          } else {
            reject();
          }
        }
      )
    })
  },
  removeSession(data) {
    return new Promise((resolve, reject) => {
      data.sessionId = Crypto.encryptByDES(data.sessionId + '');
      axios.post(urls.REMOVE_SESSION, data).then(
        () => {
          resolve()
        },
        () => { }
      )
    })
  },
  getShareUrl(data) {
    return new Promise((resolve, reject) => {
      axios.post(urls.SHARE_URL, data).then(
        res => {
          resolve(res.data)
        },
        () => { }
      )
    })
  },
  postShareUrl(url) {
    return new Promise((resolve, reject) => {
      axios.post(url, {}).then(
        res => {
          resolve(res.data);
        },
        () => { }
      )
    })
  },
  getReadedList(data) {
    return new Promise((resolve, reject) => {
      data.groupId = Crypto.encryptByDES(data.groupId + '');
      data.msgId = Crypto.encryptByDES(data.msgId + '');
      axios.post(urls.GET_READED_LIST, data).then(
        res => {
          resolve(res.data);
        },
        () => { }
      )
    })
  },
  getMemberInfo(data) {
    return new Promise((resolve, reject) => {
      axios.post(urls.GET_MEMBER_INFO, data).then(
        res => {
          resolve(res.data);
        },
        () => { }
      )
    })
  },
  getUserByAlias(data) {
    return new Promise((resolve, reject) => {
      //data.sessionId = Crypto.encryptByDES(data.sessionId + '');
      axios.post(urls.GET_USER_BY_ALIAS, data).then(
        res => {
          resolve(res.data);
        },
        () => { }
      )
    })
  },
  startTempSession(data) {
    return new Promise((resolve, reject) => {
      data.sessionId = Crypto.encryptByDES(data.sessionId + '');
      axios.post(urls.TEMP_SESSION, data).then(
        res => {
          resolve(res.data);
        },
        () => { }
      )
    })
  },
  getTempFriendInfo(data) {
    return new Promise((resolve, reject) => {
      let sId = data.sessionId;
      data.sessionId = Crypto.encryptByDES(data.sessionId + '');
      axios.post(urls.GET_TEMP_FRIEND_INFO, data).then(
        res => {
          if (res.data.avatar) {
            res.data.headImg = res.data.avatar;
          }

          let cycle = localStore.readRegularCleaning(sId);
          if (cycle && res.data.cleanMsgCycle > 0 && res.data.cleanMsgDate > cycle.cleanMsgDate) {
            msgManager.regularCleaning(sId, res.data.cleanMsgDate, +res.data.cleanMsgCycle);
          }

          if (res.data.cleanMsgCycle) {
            let obj = {
              cleanMsgDate: res.data.cleanMsgDate,
              cleanMsgNextDate: res.data.cleanMsgNextDate,
              cleanMsgCycle: +res.data.cleanMsgCycle
            }
            localStore.updateRegularCleaning(sId, obj);
          }
          resolve(res.data);
        },
        () => { }
      )
    })
  },
  addBlackList(data) {
    return new Promise((resolve, reject) => {
      data.treatedIds = Crypto.encryptByDES(data.treatedIds + '');
      axios.post(urls.ADD_BLACK_LIST, data).then(
        () => {
          resolve();
        },
        () => { }
      )
    })
  },
  removeBlackList(data) {
    return new Promise((resolve, reject) => {
      data.treatedIds = Crypto.encryptByDES(data.treatedIds + '');
      axios.post(urls.REMOVE_BLACK_LIST, data).then(
        () => {
          resolve();
        },
        () => { }
      )
    })
  },
  setGroupAdmin(data) {
    return new Promise((resolve, reject) => {
      axios.post(urls.SET_GROUP_ADMIN, data).then(
        () => {
          resolve();
        },
        () => { }
      )
    })
  },
  transferGroup(data) {
    return new Promise((resolve, reject) => {
      axios.post(urls.TRANSFER_GROUP, data).then(
        () => {
          resolve();
        },
        () => { }
      )
    })
  },
  forbiddenWord(data) {
    return new Promise((resolve, reject) => {
      axios.post(urls.FORBIDDEN_WORD, data).then(
        res => {
          toast(res.data);
          resolve(res.data);
        },
        () => { }
      )
    })
  },
  getMemberApply(data) {
    return new Promise((resolve, reject) => {
      axios.post(urls.GET_MEMBER_APPLY, data).then(
        res => {
          resolve(res.data);
        },
        () => { }
      )
    })
  },
  auditMemberApply(data) {
    return new Promise((resolve, reject) => {
      axios.post(urls.AUDIT_MEMBER_APPLY, data).then(
        () => {
          resolve();
        },
        res => {
          reject(res);
        }
      )
    })
  },
  userJoinGroup(data) {
    return new Promise((resolve, reject) => {
      data.groupId = Crypto.encryptByDES(data.groupId + '');
      data.shareId = Crypto.encryptByDES(data.shareId + '');
      axios.post(urls.USER_JOIN_GROUP, data).then(
        () => {
          resolve();
        },
        () => {
        }
      )
    })
  },
  getAliasList(data) {
    return new Promise((resolve, reject) => {
      axios.post(urls.GET_ALIASLIST, data).then(
        res => {
          resolve(res.data);
        },
        () => {
        }
      )
    })
  },
  addFriendShare(data) {
    return new Promise((resolve, reject) => {
      data.recipient = Crypto.encryptByDES(data.recipient + '');
      axios.post(urls.ADD_FRIEND_SHARE, data).then(
        () => {
          resolve();
        },
        () => {
        }
      )
    })
  },
  addCopyRecord(data) {
    return new Promise((resolve, reject) => {
      axios.post(urls.ADD_COPY_RECORD, data).then(
        res => {
          resolve(res.data);
        },
        () => { }
      )
    })
  },
  addCopyChatMessage(data){
    return new Promise((resolve, reject) => {
      axios.post(urls.ADD_COPY_RECORD , data).then(
        res => {
          resolve(res.data);
        },
        () => { }
      )
    })
  },
  getRecordList(data) {
    return new Promise((resolve, reject) => {
      data.id = Crypto.encryptByDES(data.id +'')
      axios.post(urls.GET_RECORD_LIST, data).then(
        res => {
          resolve(res.data);
        },
        () => { }
      )
    })
  },
  addFavorites(data) {
    return new Promise((resolve, reject) => {
      axios.post(urls.ADD_FAVORITES, data).then(
        () => {
          resolve();
        },
        () => { }
      )
    })
  },
  deleteFavorites(data) {
    return new Promise((resolve, reject) => {
      axios.post(urls.DELETE_FAVORITES, data).then(
        res => {
          resolve(res.data);
        },
        () => { }
      )
    })
  },
  getFavorites(data) {
    return new Promise((resolve, reject) => {
      axios.post(urls.GET_FAVORITES, data).then(
        res => {
          resolve(res.data)
        },
        () => {
          reject()
        }
      )
    })
  },
  getFavoritesDetail(data) {
    return new Promise((resolve, reject) => {
      axios.post(urls.GET_FAVORITES_DETAIL, data).then(
        res => {
          resolve(res.data)
        },
        () => {
          reject()
        }
      )
    })
  },
  getFriendConfSetting(data) {
    return new Promise((resolve, reject) => {
      data.recipient = Crypto.encryptByDES(data.recipient + '');
      axios.post(urls.GET_FRIEND_CONF_SETTING, data).then(
        res => {
          resolve(res.data)
        },
        () => { }
      )
    })
  },

  getGroupUser(data) {
    return new Promise((resolve, reject) => {
      // data.recipient = Crypto.encryptByDES(data.recipient + '');
      axios.post(urls.GET_GROUP_USER, data).then(
        res => {
          resolve(res.data)
        },
        res => {
          if (res.code != 0) {
            resolve({
              groupId: data.groupId,
              userId: data.userId,
              isAdmin: "-1",
              createTime: new Date().getTime(),
              nickName: data.userId
            })
          }
        }
      )
    })
  },
  setServiceSetting(data) {
    return new Promise((resolve, reject) => {
      axios.post(urls.SET_SERVICE_SETTING, data).then(
        () => {
          resolve()
        },
        () => { }
      )
    })
  },
}

export const actionApi = {
  getallowmobile(data, cb) {
    axios.post(urls.GET_ALLOWMOBILE, data).then(
      res => {
        res.data.forEach(e => {
          if(e.id==0){
            store.commit('SET_ISALLOWMOBILE', e.state)
          }
        })
        
      },
      () => { }
    )
  },
  getFriendList(data, cb) {
    axios.post(urls.GET_FRIEND_LIST, data).then(
      res => {
        let obj = formatList(0, res.data);
        cb(obj)
      },
      () => { }
    )
  },
  getGroupList(data, cb) {
    axios.post(urls.GET_ALL_GROUP_SETTING, data).then(
      res => {
        let obj = formatList(1, res.data);
        cb(obj)
      },
      () => { }
    )
  },
  getGroupMember(data, cb) {
    axios.post(urls.GET_GROUP_MEMBER, data).then(
      res => {
        let obj = formatList(0, res.data);

        for (let key in obj) {
          if (store.state.friendList[key] && store.state.friendList[key].notes) {
            obj[key].notes = store.state.friendList[key].notes;
          }
        }
        cb(obj)
      },
      res => {
        if (res.code == 101004 || res.code == 101006 ) {
          store.commit('DELETE_SESSION', data.groupId + '-1')
          store.commit('UPDATE_CURRENT_SESSION', {});
          //删除群信息。删除群消息，//删除群成员
          group.quit(data.groupId);
          let obj = {
            sessionId: data.groupId,
            type: 1
          };
          api.removeSession(obj)
        }else if(res.code == 101017){
          store.commit('DELETE_SESSION', data.groupId + '-1')
          store.commit('UPDATE_CURRENT_SESSION', {});
          store.commit('SET_CROWDTOAST_TEXT', res.data)
          //删除群信息。删除群消息，//删除群成员
          group.quit(data.groupId);
          let obj = {
            sessionId: data.groupId,
            type: 1
          };
          api.removeSession(obj)
        }
      }
    )
  },
  getNewFriend(data, cb) {
    axios.post(urls.GET_NEW_FRIEND, data).then(
      res => {
        cb(res)
      },
      () => { }
    )
  },
  getSessionList(data, cb) {
    if (data.froms) {
      data.froms = Crypto.encryptByDES(data.froms + '');
    }
    axios.post(urls.GET_SESSION_LIST, data).then(
      res => {
        Msg.chatListInit(res.data.list);
        cb(res.data);
      },
      () => { }
    )
  },
  /**
   * 设置消息已读
   * @param {*} data 
   * @param {*} cb 
   */
  setSessionReadId(data, cb) {
    if (!data.froms) {
      return;
    }
    axios.post(urls.SET_SESSION_READID, data).then(
      res => {
        cb();
      },
      () => { }
    )
  },
  getUserSetting(data, cb) {
    axios.post(urls.GET_USER_SETTING, data).then(
      res => {
        cb(res.data)
      },
      () => { }
    )
  },
  setUserSetting(data) {
    axios.post(urls.SET_USER_SETTING, { modularCode: '1', confString: data }).then(
      () => { },
      () => { }
    )
  },
  getReadNum(data, cb) {
    let sId = data.groupId;
    data.groupId = Crypto.encryptByDES(data.groupId + '');
    axios.post(urls.GET_READED_NUM, data).then(
      res => {
        cb(res.data);
        let cycle = localStore.readRegularCleaning(sId);

        if (cycle && res.data.cleanMsgDate > cycle.cleanMsgDate) {
          msgManager.regularCleaning(sId, res.data.cleanMsgDate, +res.data.cleanMsgCycle);
        }

        if (res.data.cleanMsgCycle) {
          let obj = {
            cleanMsgDate: res.data.cleanMsgDate,
            cleanMsgNextDate: res.data.cleanMsgNextDate,
            cleanMsgCycle: +res.data.cleanMsgCycle
          }
          localStore.updateRegularCleaning(sId, obj);
        }
        let lastReadMsgId = res.data.lastReadMsgId;
        if (lastReadMsgId) {          
          //更新已读
          if (res.data.groupId == store.getters.currentSession.paramId && store.getters.currentSession.fromType == 1) {
            store.getters.currentSession.readMsgId=lastReadMsgId
            let msg = store.state.message;
            for (let key in msg) {
              if (key <= lastReadMsgId) {
                let m = msg[key];
                if (!m.readNum) {
                  m.readNum = 1;
                  store.commit("UPDATE_MESSAGE_READ", m);
                }
              }
              if (Number(key) == res.data.msgId) {
                let m = msg[key];
                m.readNum = res.data.readNum;
                store.commit("UPDATE_MESSAGE_READ", m);
              }
            }
          }

          msgManager.setReadMsgBySessionId(1, sId, lastReadMsgId);
          // group.setReadNumBySessionId(sId,res.data.mId,res.data.readNum);
        }
      },
      res => {
        if (res.code == 101004 || res.code == 101006 ) {
          store.commit('DELETE_SESSION', sId + '-1')
          store.commit('UPDATE_CURRENT_SESSION', {});
          //删除群信息。删除群消息，//删除群成员
          group.quit(sId);
          let obj = {
            sessionId: sId,
            type: 1
          };
          api.removeSession(obj)
        }else if(res.code == 101017){
          store.commit('DELETE_SESSION', sId + '-1')
          store.commit('UPDATE_CURRENT_SESSION', {});
          store.commit('SET_CROWDTOAST_TEXT', res.data)
          //删除群信息。删除群消息，//删除群成员
          group.quit(sId);
          let obj = {
            sessionId: sId,
            type: 1
          };
          api.removeSession(obj)
        }
      }
    )
  },
  getBlackList(data, cb) {
    axios.post(urls.GET_BLACK_LIST, data).then(
      res => {
        let obj = formatList(0, res.data);
        cb(obj)
      },
      () => { }
    )
  },
}

function toast(text) {
  store.commit('SET_TOAST_TEXT', text)
}

function formatList(type, list) {
  let obj = {};
  for (let i = 0; i < list.length; i++) {
    let item = list[i];
    if (item.avatar) {
      item.headImg = item.avatar;
    }

    if (type == 0 && !item.nickName) {
      item.nickName = item.userId + '';
    }

    if (type == 0) {
      obj[item.userId] = item;
    } else {
      if (item.groupId) {
        obj[item.groupId] = item;
      }
    }
  }
  return obj;
}