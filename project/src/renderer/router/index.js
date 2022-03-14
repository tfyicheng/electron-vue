import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const router = new Router({
  mode: 'hash',
  routes: [
    {
      path: '/gn',
      name: 'gn',
      component: require('@/components/gn/gn').default,
      children: [
      ]
    },
    {
      path: '/',
      name: 'login',
      component: require('@/components/login').default
    },
    {
      path: '/index',
      name: 'main',
      component: require('@/components/main/main').default,
      children: [
        {
          path: '/zdcs',
          name: 'ZDCS',
          component: require('@/components/view/ZDCS').default
        },
        {
          path: '/sdcs',
          name: 'SDCS',
          component: require('@/components/view/SDCS/SDCS').default,
        },
        {
          path: '/zdsb',
          name: 'ZDSB',
          component: require('@/components/view/ZDSB').default
        },
        {
          path: '/txl',
          name: 'TXL',
          component: require('@/components/view/TXL').default
        }, {
          path: '/sjcj',
          name: 'SJCJ',
          component: require('@/components/view/SJCJ/sjcj').default
        }, {
          path: '/xnpg',
          name: 'XNPG',
          component: require('@/components/view/XNPG').default
        },

      ]
    }, {
      path: '/spth',
      name: 'spth',
      component: require('@/components/gn/spth').default
    }, {
      path: '/yyth',
      name: 'yyth',
      component: require('@/components/gn/yyth').default
    },
  ]
})
router.beforeEach((to, from, next) => {
  console.log(to.path)
  if (to.matched.length === 0) {
    //next("/404");
  } else {
    //如果匹配到就跳转
    if (to.path !== "/404") {
      sessionStorage.setItem("routerCatch", to.path);
    }
    next();
  }
})
export default router