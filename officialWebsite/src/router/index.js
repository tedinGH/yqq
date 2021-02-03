import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: '',
    redirect: '',
    component: r => require.ensure([], () => r(require('@/views/index.vue')), 'demo'),
    children:[
      {
        path: '/home',
        component: () => import('@/components/home/home.vue'),
        name: 'home',
        meta:"Home"
      },
      {
        path: '/product',
        component: () => import('@/components/home/product.vue'),
        name: 'product',
        meta: 'Product'
      },
      {
        path: '/about',
        component: () => import('@/components/home/about.vue'),
        name: 'about',
        meta: 'About'
      },
      {
        path: '/industry',
        component: () => import('@/components/home/industry.vue'),
        name: 'industry',
        meta: 'Industry'
      },
      {
        path: '/partner',
        component: () => import('@/components/home/partner.vue'),
        name: 'partner',
        meta: 'Partner'
      },
      {
        path: '/service',
        component: () => import('@/components/home/service.vue'),
        name: 'service',
        meta: 'Service'
      },
    ]
  },
  {
    path: '/register/:lang',
    name:"register",
    meta:"Register",
    component: r => require.ensure([], () => r(require('@/views/register.vue')), 'demo')
  },
  {
    path: '/forget/:lang',
    name:"forget",
    meta:"forget",
    component: r => require.ensure([], () => r(require('@/views/forget.vue')), 'demo')
  },
  {
    path: '/success',
    name:"success",
    meta:"Success",
    component: r => require.ensure([], () => r(require('@/views/success.vue')), 'demo')
  },
  {
    path: '/*',
    redirect: '/home',
  },
];

const router = new VueRouter({
  routes
});
router.beforeEach((to, form, next) => {
  window.document.title ='Ant | '+ to.meta
  next()
});
const originalPush = VueRouter.prototype.push
    VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
export default router;
