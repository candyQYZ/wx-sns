import Vue from 'vue'
import Router from 'vue-router'
import APP from '@/App'
Vue.use(Router)

const index = r => require.ensure([], () => r(require('../pages/index')), 'index')
const detail = r => require.ensure([], () => r(require('../pages/detail')), 'detail')
const myinfo = r => require.ensure([], () => r(require('../pages/myinfo')), 'myinfo')
const posting = r => require.ensure([], () => r(require('../pages/posting')), 'posting')
const topicdetail = r => require.ensure([], () => r(require('../pages/topicdetail')), 'topicdetail')
const topiclist = r => require.ensure([], () => r(require('../pages/topiclist')), 'topiclist')

export default new Router({
  routes: [{
    path: '/',
    component: APP,
    redirect: 'index',
    children: [{
      path: 'index',
      component: index,
    }, {
      path: 'detail',
      component: detail,
    }, {
      path: 'myinfo',
      component: myinfo,
    }, {
      path: 'posting',
      component: posting,
    }, {
      path: 'topicdetail',
      component: topicdetail,
    }, {
      path: 'topiclist',
      component: topiclist,
    }]
  }]
})
