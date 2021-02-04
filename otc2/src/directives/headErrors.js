let headUrl = require('../assets/images/error-head2.png');

export const headErrors = {
  inserted(el, binding) {
    var img = new Image();
    img.src = el.src;
    img.onerror = () => {
      el.src = headUrl;
    }
  },
  update(el, binding) {
    var img = new Image();
    img.src = el.src;
    img.onerror = () => {
      el.src = headUrl;
    }
  }
}