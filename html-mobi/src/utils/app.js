(function(app) {
    // 新增localStorage
    app.setStore = (name, content) => {
        if (!name) return;
        if (typeof content !== 'string') {
            content = JSON.stringify(content);
        }
        window.localStorage.setItem(name, content);
    }

    // 获取localStorage
    app.getStore = name => {
        if (!name) return;
        return window.localStorage.getItem(name);
    }

    // 删除localStorage
    app.removeStore = name => {
        if (!name) return;
        window.localStorage.removeItem(name);
    }

    //新增cookie
    app.setCookie = (cname, cvalue, ex) => {
            var d = new Date();
            d.setTime(d.getTime() + ex);
            var expires = "expires=" + d.toUTCString();
            document.cookie = cname + "=" + cvalue + "; " + expires+";path=/;";
        },

    //获取cookie 
    app.getCookie = (cname) => {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1);
            if (c.indexOf(name) != -1) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    },

    //清除cookie
    app.clearCookie = (name) => {
        app.setCookie(name, "", -1);
    },

    //查找cookie
    app.checkCookie = (name) => {
        var user = app.getCookie(name);
        return new Promise((resolve, reject) => {
            if (user != "") {
                resolve(user);
            } else {
                reject();
            }
        });
    }

    //toast信息提示窗
    app.myalert = (title,time) => {
        var msg = document.createElement('div');
        msg.innerHTML = '<div id="myMsg" class="myMsg" ><p>'+ title +'</p></div>';
        var msgBox = msg.firstChild;
        document.body.appendChild(msgBox);
        setTimeout(()=>{
            document.body.removeChild(msgBox);
        },time || 1500)
    };
}(window.app = {}));