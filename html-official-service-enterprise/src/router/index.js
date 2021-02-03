import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [{
    path: "/",
    name: "home",
    meta: "home",
    component: r => require.ensure([], () => r(require("@/views/Home.vue")), "demo"),
  },
  {
    path: "/register",
    name: "register",
    component: r => require.ensure([], () => r(require("@/views/register.vue")), "demo"),
    meta: "register"
  },
  {
    path: '/admin',
    redirect: '/admin/dashboard'
  },
  {
    path: "/admin",
    name: "admin",
    component: r => require.ensure([], () => r(require("@/views/Admin.vue")), "demo"),
    meta: "admin",
    children: [{
        path: "/admin/dashboard",
        name: "dashboard",
        meta: "dashboard",
        component: r => require.ensure([], () => r(require("@/views/dashBoard/dashBoard.vue")), "demo"),
      },
      {
        path: "/admin/feature",
        name: "feature",
        meta: "feature",
        component: () => import("@/views/feature/menuEdit.vue"),
      },
      {
        path: "/admin/account-info",
        component: () => import("@/views/setting/accountInfo.vue"),
        name: "account-info",
        meta: "setting",
      },
      {
        path: "/admin/staff-setting",
        component: () => import("@/views/setting/staff.vue"),
        name: "staff-setting",
        meta: "setting",
      },
      {
        path: "/admin/follow-setting",
        component: () => import("@/views/setting/followSetting.vue"),
        name: "follow-setting",
        meta: "setting",
      },
      {
        path: "/admin/security-center",
        component: () => import("@/views/setting/securityCenter.vue"),
        name: "security-center",
        meta: "setting",
      },
      {
        path: "/admin/users-manage",
        component: () => import("@/views/users/usersManage.vue"),
        name: "users-manage",
        meta: "users",
      },
      {
        path: "/admin/message-list",
        component: () => import("@/views/users/messageList.vue"),
        name: "message-list",
        meta: "users",
      },
    ]
  },
  {
    path: "/*",
    redirect: "/"
    // component: r => require.ensure([], () => r(require('@/views/Home.vue')), 'demo')
  }
];
const router = new VueRouter({
  // mode: 'history',
  routes
});
router.onError(error => {
  const pattern = /Loading chunk (\d)+ failed/g;
  const isChunkLoadFailed = error.message.match(pattern);
  const targetPath = router.history.pending.fullPath;
  if (isChunkLoadFailed) {
    router.replace(targetPath);
  }
});
export default router;