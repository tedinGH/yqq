import store from "../store"
let headUrl = './static/images/video-e.png'
export const videoError = {
  inserted(el, binding) {

    try {
      setTimeout(() => {
        var img = new Image()
        img.src = el.firstChild.src

        let loadImg = document.createElement("img")
        loadImg.classList.add("img-loading")
        loadImg.src = require("../assets/images/code-loading.gif")
        el.appendChild(loadImg)
        el.style.background = "#F0F4F8"
        img.onerror = () => {
          el.style.width = "140px"
          el.style.height = "140px"
          el.style.height = "140px"
          el.classList.add("msg-video-err")
          el.classList.add("display-flex")
          el.classList.remove('msg-video')
          el.innerHTML = ` <img src="${headUrl}" />`
        } 
        img.onload = () => {
          el.removeChild(loadImg)
          el.style.background = "none"
        }
      }, 200)
    } catch (error) {}
  },
  update(el, binding) {
    let lang = store.state.lang
    var img = new Image()
    img.src = el.firstChild.src
    img.onerror = () => {
      el.style.width = "140px"
      el.style.height = "140px"
      el.style.height = "140px"
      el.classList.add("msg-video-err")
      el.classList.add("display-flex")
      el.classList.remove('msg-video')
      el.innerHTML = ` <img src="${headUrl}" />`
    }
  }
}
