/**
 * 根据访问设备 样式ID 生成相应浮窗
 * @param {boolean} isMobile true-手机 false-PC
 * @param {Integer} styleId  样式ID
 */
function createDiv(isMobile, styleId) {
  if (!isMobile) {
    if (styleId == 28867) {
      var oneInner = document.createElement("div");
      oneInner.setAttribute(
        "style",
        "z-index: 100000;background:#6A96EA;position:fixed;right:0;top:calc(50vh - 156px); width:104px;height:312px;border-radius:30px 0px 0px 30px;;cursor:pointer;"
      );
      oneInner.setAttribute("class", "bo");
      document.body.appendChild(oneInner);
      oneInner.innerHTML =
        '<div class="link1"></div><div class="link1"></div><div class="link1"></div>';
      var img1 = document.getElementsByClassName("link1").item(0);
      var img2 = document.getElementsByClassName("link1").item(1);
      var img3 = document.getElementsByClassName("link1").item(2);
      img1.setAttribute(
        "style",
        "width:82px;height:102px;border-bottom: 2px solid #fff; background: url(https://kefu.bcirclepay.com/test/img/01.png) no-repeat center ;margin-left:11px"
      );
      img2.setAttribute(
        "style",
        "width:82px;height:102px;border-bottom: 2px solid #fff; background: url(https://kefu.bcirclepay.com/test/img/02.png) no-repeat center ;margin-left:11px"
      );
      img3.setAttribute(
        "style",
        "width:82px;height:102px;background: url(https://kefu.bcirclepay.com/test/img/03.png) no-repeat center ;margin-left:11px"
      );

      img1.onclick = function() {
        rtcMessage.clickChat();
      };
      oneInner.onmouseover = function() {
        rtcMessage.moveToChat();
      };
    } else {
      var oneInner = document.createElement("div");
      // oneInner.setAttribute("style", "background:#6A96EA;position:fixed;right:0;top:calc(50vh - 26px); width:52px;height:52px;border-radius:10px;cursor:pointer;");
      oneInner.setAttribute("class", "button-box");
      document.body.appendChild(oneInner);
      oneInner.innerHTML = '<div class="link"></div>';
      var img1 = document.getElementsByClassName("link").item(0);
      // img1.setAttribute("style", " width:52px;height:52px; background: url(https://kefu.bcirclepay.com/test/img/2-01.png) no-repeat center")
      oneInner.onclick = function() {
        rtcMessage.clickChat();
      };
      oneInner.onmouseover = function() {
        rtcMessage.moveToChat();
      };
    }
  }
}
