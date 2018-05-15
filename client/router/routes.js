const Todo = () => import('views/todo/TodoBody.vue')
const Login = () => import('views/login/login.vue')

export default [
  {
    path: '/',
    name: 'home',
    // https://router.vuejs.org/zh-cn/essentials/redirect-and-alias.html
    // redirect: '/login'
    /* redirect: {
      name: 'login'
    } */
    redirect: to => {
      console.log(to)
      // return '/login'
      return {
        name: 'login'
      }
    }
  },
  {
    path: '/login/:id?',
    name: 'login',
    // 别名
    alias: '/denglu',
    component: Login,
    // 向login组件传递props
    props: true
  },
  {
    path: '/todo',
    name: 'todo',
    alias: '/dashboard',
    component: Todo
  }
]
