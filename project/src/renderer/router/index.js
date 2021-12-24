import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const router = new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: require('@/components/login').default
    },
    {
      path: '/index',
      name:'main',
      component:require('@/components/main/main').default,
      children:[
        {
          path: '/zdtest',
          name: 'zdtest',
          component: require('@/components/view/zdtest').default
        },
        {
          path: '/sdtest',
          name: 'sdtest',
          component: require('@/components/view/sdcs/sdtest').default
        },
        {
          path: '/zdsb',
          name: 'zdsb',
          component: require('@/components/view/zdsb').default
        },
        {
          path: '/sjcj',
          name: 'sjcj',
          component: require('@/components/view/sjcj').default
        }
      ]
    }
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