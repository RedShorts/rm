import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index/index'
import mine from '@/components/mine/mine'
import login from '@/components/login/login'
import search from '@/components/public/search'
import monitor from '@/components/monitor/monitor'
import ranking from '@/components/ranking/ranking'
//import test from '@/components/test/test'

Vue.use(Router)

const router = new Router({
  routes: [
    { 
      path: '/', 
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'index',
      component: index,
      meta: {
        keepAlive: true // 需要被缓存
      }
    },
    {
      path: '/monitor',
      name: 'monitor',
      component: monitor
    },
    {
      path: '/ranking',
      name: 'ranking',
      component: ranking
    },
    {
    	path: '/mine',
    	name: 'mine',
    	component: mine,
      meta: {
        keepAlive: true // 需要被缓存
      }
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/search',
      name: 'search',
      component: search
    },
    // {
    //   path: '/test',
    //   name: 'test',
    //   component: test
    // }

  ]
})
export default router