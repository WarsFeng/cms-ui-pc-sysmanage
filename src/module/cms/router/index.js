import Home from '@/module/home/page/home.vue';
import page_list from '@/module/cms/page/page_list.vue';
import page_add from '@/module/cms/page/page_add.vue';

export default [{
  path: '/cms',
  component: Home,
  name: 'CMS内容管理',
  hidden: false
  ,
  children: [
    {path: '/cms/page/list', name: '页面列表', component: page_list, hidden: false},
    {path: '/cms/page/add', name: '页面新增', component: page_add, hidden: true}
  ]
}/*,
  {
    path: '/login',
    component: Login,
    name: 'Login',
    hidden: true
  }*/
]
