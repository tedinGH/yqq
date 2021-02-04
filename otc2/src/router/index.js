import Vue from 'vue'
import Router from 'vue-router'
import Scanlogin from "@/views/scanlogin"
Vue.use(Router);

var router = new Router({
  mode:buildEnvironment == 1 ? 'history' : 'hash',
  routes: [
    {
      path: '/',
      redirect: {
        name: 'index'
      },
      component: () => import("@/views/Index"),
    },
    { // 好友
      path: '/',
      name: 'index',
      component: () => import("@/views/Index"),
    },               
    { 
      path: '/complete',
      name: 'complete',
      component: () => import("@/views/complete"),
    },
    {
      path:'/scan-login',
      component:Scanlogin,
      name:'login'
    },
    { // 以上路由都匹配不到的时候重定向到首页
      path: '/*',
      redirect: {
        name: 'index'
      }
    },
  
  ]
});

router.beforeEach(function(to, from, next ) {
  window.scrollTo(0, 0);
  next();
});

export default router;
