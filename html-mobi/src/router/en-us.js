import Vue from 'vue';
import Router from 'vue-router';
import ForgetPassword from '@/views/en-us/ForgetPassword';
import FindPassword from '@/views/en-us/FindPassword';
import FindpwdSuccess from '@/views/en-us/FindpwdSuccess';
import Emoji from '@/views/en-us/Emoji';
import Myemoji from '@/views/en-us/Myemoji';
import Register from '@/views/en-us/Register';
import RegisterSuccess from '@/views/en-us/RegisterSuccess';

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
    // {
    //   path: '/myemoji',
    //   name: 'myemoji',
    //   component: Myemoji
    // },
    { // 表情商店
      path: '/emoji',
      name: 'emoji',
      component: Emoji
    },
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
