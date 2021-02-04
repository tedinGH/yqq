import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "",
    name: "home",
    meta: "home",
    component: r =>
      require.ensure([], () => r(require("@/views/Home.vue")), "demo"),
    children: [
      {
        path: "/session",
        component: () => import("@/components/home/session/sessionlist.vue"),
        name: "session"
      },
      {
        path: "/friend",
        component: () => import("@/components/home/friend/friendlist.vue"),
        name: "friend"
      },
      {
        path: "/dashboard",
        component: () => import("@/components/home/dashboard/index.vue"),
        name: "dashboard"
      },
      {
        path: "/personageinfo",
        component: () =>
          import("@/components/home/personage/personageinfo.vue"),
        name: "personageinfo"
      }
    ]
  },
  {
    path: "/login/:lang",
    name: "login",
    component: r =>
      require.ensure([], () => r(require("@/views/Login.vue")), "demo")
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
