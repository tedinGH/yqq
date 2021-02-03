import store from "../store";

let imageUrl = require("../assets/images/img-e.png");

export const imageError = {
  inserted(el, binding) {
    let lang = store.state.translate;
    var img = new Image();
    img.src = el.src;
    img.onerror = () => {
      el.src = imageUrl;
      el.title = lang.common.imageOutDate;
    };
  },
  update(el, binding) {
    let lang = store.state.translate;
    var img = new Image();
    img.src = el.src;
    img.onerror = () => {
      el.src = imageUrl;
      el.title = lang.common.imageOutDate;
    };
  }
};
