import store from "../store";
let headUrl = require("../assets/images/img-e.png");
export const imagePreview = {
  inserted(el, binding) {
    try {
      let lang = store.state.translate;
      var img = new Image();
      img.src = el.firstChild.src;

      if (!el.firstChild.src) return;

      let loadImg = document.createElement("img");
      loadImg.classList.add("img-loading");
      loadImg.src = require("../assets/images/code-loading.gif");
      el.appendChild(loadImg);

      el.style.background = "#FFFFFF";
      // console.log(el)
      img.onerror = (e) => {
        // console.log(e)
        if (el.classList[1] == "msg-img") {
          el.style.width = "146px";
          el.style.height = "143px";
          el.classList.add("display-flex");
          el.innerHTML = ` <img src="${headUrl}" />`;
        } else {
          el.style.width = "146px";
          el.style.height = "143px";
          el.classList.add("display-flex");
          el.innerHTML = ` <img src="${headUrl}" />`;
        }
      };
      img.onload = () => {
        el.removeChild(loadImg);
        el.style.background = "";
      };
    } catch (error) {}
  },
  update(el, binding) {
    console.log(1111)
    let lang = store.state.lang;
    var img = new Image();
    img.src = el.firstChild.src;
    img.onerror = () => {
      if (!el.firstChild.src) {
        el.style.width = "140px";
        el.style.height = "140px";
        el.style.height = "140px";
        el.classList.add("display-flex");
        el.innerHTML = ` <img src="${headUrl}" />`;
      }
    };
  }
};
