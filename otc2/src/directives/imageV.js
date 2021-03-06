import store from '../store'

let imageUrl = require('../assets/images/icon/v-b.png');

export const imageV = {
  inserted(el, binding) {
    let lang = store.state.lang;
    var img = new Image();
    img.src = el.src;
    img.onerror = () => {
      el.src = imageUrl;
      el.classList.add("img-l");
      el.title = lang.common.imageOutDate;
    }
  },
  update(el, binding) {
    let lang = store.state.lang;
    var img = new Image();
    img.src = el.src;
    img.onerror = () => {
      el.src = imageUrl;
      el.classList.add("img-l");
      el.title = lang.common.imageOutDate;
    }
  }
}