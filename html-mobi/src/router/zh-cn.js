import Vue from 'vue';
import Router from 'vue-router';
import ForgetPassword from '@/views/zh-cn/ForgetPassword';
import FindPassword from '@/views/zh-cn/FindPassword';
import FindpwdSuccess from '@/views/zh-cn/FindpwdSuccess';
import Emoji from '@/views/zh-cn/Emoji';
import Myemoji from '@/views/zh-cn/Myemoji';
import Register from '@/views/zh-cn/Register';
import RegisterSuccess from '@/views/zh-cn/RegisterSuccess';

Vue.use(Router);
var router = new Router({
  routes: [
    {
      path: '/',
      redirect: {
        name: 'forget-password'
      }
    },
    { // 忘记密码
      path: '/forget-password/:type/:account/:code',
      name: 'forget-password',
      component: ForgetPassword
    },
		{ // 找回密码
		  path: '/find-password',
		  name: 'find-password',
		  component: FindPassword
		},
    { // 找回密码成功
      path: '/findpwd-success',
      name: 'findpwd-success',
      component: FindpwdSuccess
    },
    { // 用户注册
      path: '/register/:userSourceType/:inviterId/:tempId',
      name: 'register',
      component: Register
    },
    { // 注册成功
      path: '/register-success',
      name: 'register-success',
      component: RegisterSuccess
    },
		{ // 表情商店
      path: '/emoji',
      name: 'emoji',
      component: Emoji
    },
    // {
    //   path: '/myemoji',
    //   name: 'myemoji',
    //   component: Myemoji
    // },
    { // 以上路由都匹配不到的时候重定向到首页
      path: '/*',
      redirect: {
        name: 'forget-password'
      }
    },
  ]
});
router.beforeEach(function(to, from, next ) {
  // console.log(state, mutations);
  window.scrollTo(0, 0);
  next();
});

export default router;
