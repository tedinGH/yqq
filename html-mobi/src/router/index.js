import Vue from 'vue';
import Router from 'vue-router';
import ForgetPassword from '@/components/ForgetPassword';
import FindPassword from '@/components/FindPassword';
import FindpwdSuccess from '@/components/FindpwdSuccess';
import FindpwdFail from '@/components/FindpwdFail';
import Emoji from '@/components/Emoji';
import Register from '@/components/Register';
import ConfirmAgain from '@/components/ConfirmAgain';
import RegisterSuccess from '@/components/RegisterSuccess';
import RegisterFail from '@/components/RegisterFail';

import CountryCode from '@/components/subcompoments/CountryCode';

import { state, mutations } from '../store/mutations.js';

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
    { // 找回密码失败
      path: '/findpwd-fail',
      name: 'findpwd-fail',
      component: FindpwdFail
    },

    { // 用户注册
      path: '/register/:userSourceType/:inviterId/:tempId',
      name: 'register',
      component: Register
    },
    { // 设置密码
      path: '/confirm-again/:userSourceType/:inviterId',
      name: 'confirm-again',
      component: ConfirmAgain
    },
    { // 注册成功
      path: '/register-success',
      name: 'register-success',
      component: RegisterSuccess
    },
    { // 注册失败
      path: '/register-fail/:userSourceType/:inviterId',
      name: 'register-fail',
      component: RegisterFail
    },
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
