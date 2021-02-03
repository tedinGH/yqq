import api from '@/api'
import { validate } from '@/utils/validate';
import CountryCode from '@/components/common/CountryCode.vue'

export default {
  data (){
		return {
			showSelect: false,
			send: {
				phoneCode: '+',
				country: ''
			},
			type: 0,
			step: 0,
			data: '',
			isAgree: false,
			picture1: '',
			picture2: '',
			picture3: '',
			base: base,
			locales: this.$store.state.langData,
			lang:this.$store.state.language,
			showPage: false
		}
	},
	components: { 
		CountryCode
	},
	methods: {
		uploadImage(e, i){
			let file = e.target.files[0]
			if (file.size > 1024 * 1024) {
				this.$toast(this.locales.imgLimit);
				return false;
			} else {
				let reader = new FileReader();
				reader.readAsDataURL(file);
				let newform=new FormData();         
				newform.append("mFile", file);         
				newform.append("privateFile", true);
				newform.append("uid",-1);
				let xml = new XMLHttpRequest();
				xml.open("post", base.imfileUrl + '/upload/picture1.htm', true);
				xml.send(newform);
				xml.onreadystatechange = (res)=>{
					if(xml.readyState==4 && xml.status == 200){
						let obj = xml.responseText;
						obj = JSON.parse(obj);
						this.handleUpload(i,obj.data);
					}
				};
			}
		},
		handleUpload(i, url){
			if(i==1) this.picture1 = url;
			else if(i==2) this.picture2 = url;
			else this.picture3 = url;
		},
		setType(i){
			this.type = i;
		},
		showCountryCode(){
			this.showSelect = !this.showSelect;
		},
		countrycodeHandler(data){
			this.showSelect = !this.showSelect;
			this.send.phoneCode = data.PHONE_CODE;
			this.send.country =  data.COUNTRY_NAME;
			if(this.lang=='en_US') this.send.country =  data.COUNTRY_NAME_EN;
			if(this.lang=='my') this.send.country =  data.COUNTRY_NAME_MY;
		},
		agree(){
			this.isAgree = !this.isAgree;
		},
		next(){
			let name = this.$refs.name.value,
        	surname = this.$refs.surname.value,
        	idcard = this.$refs.idcard .value;
        	if(this.send.phoneCode=='+') { 
      			this.$toast(this.locales.selectArea)
      			return
    		}
			if(!validate.isName(name)){
				this.$toast(this.locales.nameError);
				return false;
			}
			if(!validate.isName(surname)){
				this.$toast(this.locales.surnameError);
				return false;
			}
			if(!idcard){
				this.$toast(this.locales.idNumber);
				return false;
			}
			if(!this.isAgree){
				this.$toast(this.locales.promice);
				return false;
      }
      
			this.data = {
        'countryCode': this.send.phoneCode, 
        'authType': this.type, 
        'name': name, 
        'surname': surname, 
        'idNumber':idcard 
      };
		  this.step = 4;
		},
		submit(){
			if(!this.picture1){
				this.$toast(this.locales.IDFront)
				return false
			}
			if(!this.picture2){
				this.$toast(this.locales.IDBack)
				return false
			}
			if(!this.picture3){
				this.$toast(this.locales.IDSignature)
				return false
      }
      
      this.data.photoPath = this.picture1 + ';' + this.picture2 + ';' + this.picture3;
      
			api.userAuth(this.data).then(
				data => {
					this.$toast(data);
					this.step = 1;
				},() => {}
			)
		},
		reAuth(){
			this.step = 0;
		}
	},
	mounted() {
    this.$indicator.open();

    api.checkAuth({}).then(
      data => {
        this.step = data.result;
        this.$indicator.close();
        this.showPage = true;
      },() => {}
    )
	}
}