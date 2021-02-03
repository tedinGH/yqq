import Vue from "vue";
import store from "../store";
import lightGallery from "../components/common/H5videos";
import { Config } from "@/common/config";
import { msgEnumTypes, sessionEnumTypes } from "@/common/enum";
import { msgManager } from "@/session/msgManager";

export const viewer = {
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

const handler = (el, binding) => {
  const showViewer = (el, binding, data) => {
    let indexMsgId = el.dataset.id,
      index = 0;
    const ViewerConstructor = Vue.extend(lightGallery);
    let instance = new ViewerConstructor();
    let imgs = [],
      msgContent1;
    let cacheArray = [];

    for (let i = 0; i < data.length; i++) {
      let cache = data[i];
      if (cache.type == msgEnumTypes.video || cache.type == msgEnumTypes.img) {
        cacheArray.push(cache);
      } //音频先剔除
    }
    cacheArray.sort((a, b) => a.bodyTime - b.bodyTime); //排序
    for (let i = 0; i < cacheArray.length; i++) {
      let cache = cacheArray[i];
      if (cache.id == indexMsgId) {
        index = i;
      }
      let msgContent = cache.viewShow || cache.item;
      let fileUrl,
        subHtml = "",
        poster;
      fileUrl = msgContent.fileUrl ? msgContent.fileUrl : msgContent.imgUrl;
      try {
        let arrayFileName = fileUrl.split("?attname=");
        if (arrayFileName.length > 1) {
          subHtml = arrayFileName[1];
        }
      } catch (error) {
        continue;
      }

      poster = msgContent.fileUrl;
      if (cache.type == msgEnumTypes.video) {
        let videoUrl = Config.fileDownUrl + fileUrl;
        msgContent1 = {
          poster: Config.fileDownUrl.replace("/cs/", "/") + "compress/" + poster + ".png",
          v_src: videoUrl,
          thumb: Config.fileDownUrl.replace("/cs/", "/") + "compress/" + poster + ".png",
          info: [msgContent.imgWidth, msgContent.imgHeigh],
          html: "#video1",
          subHtml: subHtml
        };
      } else {
        if (fileUrl.indexOf("data:") >= 0) {
          msgContent1 = {
            src: fileUrl,
            thumb: fileUrl,
            info: [msgContent.imgWidth, msgContent.imgHeigh],
            subHtml: subHtml
          };
        } else {
          msgContent1 = {
            src: Config.fileDownUrl.replace("/cs/", "/") + "1080/" + fileUrl,
            thumb: Config.fileDownUrl.replace("/cs/", "/") + "compress/" + fileUrl,
            info: [msgContent.imgWidth, msgContent.imgHeigh],
            subHtml: subHtml
          };
        }
      }
      imgs.push(msgContent1);
    }
    instance.images = imgs;
    instance.$mount();
    document.body.appendChild(instance.$el);
    instance.showImage(index);
  };

  let dataObject = binding.value;
  // console.log(dataObject, binding.value);
  const payload = dataObject;
  showViewer(el, binding, payload);
};
