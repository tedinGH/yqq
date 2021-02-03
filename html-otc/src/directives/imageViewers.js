import Vue from "vue";
import store from "../store";
import lightGallery from "../components/common/H5videos";
import { Config } from "@/common/config"
import { msgManager } from "@/session/msgManager";


export const viewers = {
  inserted(el, binding) {
    el.onclick = () => {
      handler(el, binding);
    };
  },
  update(el, binding, vnode, oldVnode) {
    el.onclick = () => {
      handler(el, binding);
    };
  }
};

// const handler = (el, binding) => {
//   let data = binding.value.data
//     let indexMsgId = binding.value.idx, index = 0;
//     const ViewerConstructor = Vue.extend(lightGallery);
//     let instance = new ViewerConstructor();
//     let imgs = [], msgContent1;

//     for (let i = 0; i < data.length; i++) {
//       let cache = data[i];
//       if (i == indexMsgId) {
//         index = i;
//       }

//       // let msgContent = typeof cache.bodyContent == "string" ? JSON.parse(cache.bodyContent) : cache.bodyContent;
//       let msgContent = cache.bodyContent;
//       let fileUrl, subHtml = '', poster;
//       fileUrl = msgContent.videoUrl ? msgContent.videoUrl : msgContent.imgUrl;
//       try {
//         let arrayFileName = fileUrl.split('?attname=');
//         if (arrayFileName.length > 1) {
//           subHtml = arrayFileName[1];
//         }
//       } catch (error) {
//         continue;
//       }
      
//       poster = msgContent.videoUrl;

//       if (cache.bodyType == "5") {
//         let videoUrl = Config.fileDownUrl + 'original/' + fileUrl;
//         msgContent1 = {
//           poster: Config.fileDownUrl + 'compress/' + poster +'.png',
//           v_src: videoUrl,
//           thumb: Config.fileDownUrl + 'compress/' + poster +'.png',
//           info: [msgContent.imgWidth, msgContent.imgHeigh],
//           html: '#video1',
//           subHtml: subHtml
//         };
//       } else {
//         msgContent1 = {
//           src: Config.fileDownUrl + 'original/' + fileUrl,
//           thumb: Config.fileDownUrl + 'compress/' + fileUrl,
//           info: [msgContent.imgWidth, msgContent.imgHeigh],
//           subHtml: subHtml
//         };
//       }
//       imgs.push(msgContent1);
//     }
//     instance.images = imgs;
//     instance.$mount();
//     document.body.appendChild(instance.$el);
//     instance.showImage(index);
// };

const handler = (el, binding) => {
  let data = binding.value.data
  console.log(data);
  const ViewerConstructor = Vue.extend(lightGallery);
  let instance = new ViewerConstructor();
  let item = {};
  if(data.bodyType==5){
    item = {
      poster: Config.fileDownUrl + 'compress/' + data.bodyContent.videoUrl +'.png',
      v_src: Config.fileDownUrl + 'original/' + data.bodyContent.videoUrl,
      thumb: Config.fileDownUrl + 'compress/' + data.bodyContent.videoUrl +'.png',
      info: '',
      html: '#video1',
      subHtml: ''
    };
  }else{
    item = {
      src:Config.fileDownUrl + 'original/' + data.bodyContent.imgUrl,
      thumb:el.src,
      info:'',
      subHtml:'',
      html: '',
    }
  }
  let imgs = [];
  imgs.push(item);
  instance.images=imgs;
  instance.$mount();
  document.body.appendChild(instance.$el);
  instance.showImage(0);
};
