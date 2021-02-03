<template>
  <div class="sidebar">
    <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#fff"
      text-color="#000" active-text-color="#58bc58" :unique-opened="false" router>
      <template v-for="item in items">
        <template v-if="item.subs">
          <el-submenu :index="item.index" :key="item.index">
            <template slot="title">
              <i :class="item.icon"></i>
              <span slot="title">{{ item.title }}</span>
            </template>
            <template v-for="subItem in item.subs">
              <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                <template slot="title">{{ subItem.title }}</template>
                <el-menu-item v-for="(threeItem,i) in subItem.subs" :key="i" :index="threeItem.index">
                  {{ threeItem.title }}</el-menu-item>
              </el-submenu>
              <el-menu-item v-else :index="subItem.index" :key="subItem.index">{{ subItem.title }}</el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index" :key="item.index">
            <i :class="item.icon"></i>
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        collapse: false,
        items: [
          {
            index: 'dashboard',
            title: '基础表格'
          },
          {
            index: 'feature',
            title: 'tab选项卡'
          },
          {
            title: '表单相关',
            index: '3',
            subs: [
              {
                index: 'account-info',
                title: '基本表单',
              },
              {
                index: 'staff-setting',
                title: '三级菜单',
              },
              {
                index: 'follow-setting',
                title: '111',
              },
              {
                index: 'security-center',
                title: '文件上传'
              }
            ]
          },
          {
            index: '4',
            title: 'sm',
            subs: [
              {
                index: 'users-manage',
                title: '111'
              },
              {
                index: 'message-list',
                title: '222',
              },
            ]
          },
        ]
      };
    },
    computed: {
      onRoutes() {
          return  this.$route.name
      }
    },
    created() {
      
    }
  };
</script>

<style scoped>
  .sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
  }

  .sidebar::-webkit-scrollbar {
    width: 0;
  }

  .sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
  }

  .sidebar>ul {
    height: 100%;
  }
</style>