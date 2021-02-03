import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: '/:id/:url/:userid/:data/:style/:checkCode/:device',
    redirect: '',
    component: r => require.ensure([], () => r(require('@/views/Home.vue')), 'demo')
  },
  {
    path: '/leave',
    component: r => require.ensure([], () => r(require('@/views/leavemsg.vue')), 'demo')
  },
  {
    path: '/notfond',
    component: r => require.ensure([], () => r(require('@/views/404.vue')), 'demo')
  }
];

const router = new VueRouter({
  routes
});

export default router;
