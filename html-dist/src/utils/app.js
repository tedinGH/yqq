(function(app) {
    // 新增localStorage
    app.setStore = (name, content) => {
        if (!name) return;
        if (typeof content !== 'string')  content = JSON.stringify(content)
        window.localStorage.setItem(name, content)
    }

    // 获取localStorage
    app.getStore = name => {
        if (!name) return
        return window.localStorage.getItem(name)
    }

    // 删除localStorage
    app.removeStore = name => {
        if (!name) return
        window.localStorage.removeItem(name)
    }

    //新增cookie
    app.setCookie = (cname, cvalue, ex) => {
        var d = new Date()
        d.setTime(ex)
        var expires = "expires=" + d.toUTCString()
        document.cookie = cname + "=" + cvalue + "; " + expires + ";path=/;"
    }

    //获取cookie 
    app.getCookie = (cname) => {
        var name = cname + "="
        var ca = document.cookie.split(';')
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i]
            while (c.charAt(0) == ' ') c = c.substring(1)
            if (c.indexOf(name) != -1)  return c.substring(name.length, c.length)
        }
        return ""
    }

    //清除cookie
    app.clearCookie = (name) => {
        app.setCookie(name, "", -1)
    }

    //查找cookie
    app.checkCookie = (name) => {
        var user = app.getCookie(name);
        return new Promise((resolve, reject) => {
            if (user != "") resolve(user)
            else reject()
        });
    }
    
    // 下划线字符串转小峰驼
    app.toCamel = function(str) {
        var str2 = ''
        if (str.indexOf('_') < 0) {
            str2 = str
        } else {
            var words = str.split('_')
            for (var i = 1; i < words.length; i++) {
                words[i] = words[i].substr(0, 1).toUpperCase() + words[i].substr(1)
            }
            str2 = words.join('')
        }
        return str2
    }

    //小峰驼字符串转下划线
    app.toUnderline = function(str) {
        var str2 = ''
        if ((/[A-Z]/).test(str)) {
            str2 = str.replace(/([A-Z])/g, function($1) {
                return '_' + $1.toLowerCase()
            })
        } else {
            str2 = str
        }
        return str2
    }

    app.getEnvironmet = function(){
        if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent))  return 'IOS'
        else if (/(Android)/i.test(navigator.userAgent)) return window.device = 'Android'
        else return  'PC'
    }

    app.check = {
        isPhone(value) {
            if (!/^\d{6,}$/.test(value))  return false
            return true
        },
        isChinessPhone(value) {
            if (!/^(1[3|4|5|6|7|8|9][0-9]([\\-]?[0-9]{4}){2})$/.test(value))  return false
            return true
        },
        isEmail(value) {
            if (!/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(value)) return false;
            return true
        },
        isPsw(value) {
            if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d:~!\\@#$%^&*()_+{}|=:\-"<>\[\]\;\'\,\.\/]{8,20}$/.test(value)) return false
            return true
        },
        isSmsCode(value) {
            if (!/^\d{6}$/.test(value))  return false
            return true
        },
        isEmailCode(value) {
            if (!/^\d{4}$/.test(value))  return false
            return true
        },
        isName(value) {
            if (!value)  return false;
            if (!/^.*[~!@#\$%\^&\*\(\)_+\-=\[\]\{\}\\\|\'\";:,\<\.\>\/\?\s+].*$/.test(value) && !/^[0-9]{1,}$/.test(value))  return true
        },
        isNumber(value) {
            if(typeof(+value)!='number') return false
            value = value || String(this)
            var reg =  /^[+-]?\d*\.?\d{0,10}$/
            return reg.test(value)
        },
        isPositiveNumber(value) {
            if(typeof(+value)!='number') return false
            value = value || String(this)
            var reg =  /^[+-]?\d*\.?\d{0,10}$/
            return reg.test(value)&&value>0
        },
    }

}(window.app = {}));