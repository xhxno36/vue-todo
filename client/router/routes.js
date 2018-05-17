const Todo = () => import('views/todo/TodoBody.vue')
const Login = () => import('views/login/login.vue')

export default [
  {
    path: '/',
    name: 'home',
    // https://router.vuejs.org/zh-cn/essentials/redirect-and-alias.html
    redirect: to => {
      console.log('routes path:/ home')
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
    beforeEnter (to, from, next) {
      console.log('login routes beforeEnter invoked')
      next()
    },
    // 向login组件传递props
    props: true
    /* props: {
      id: '456'
    } */
    // props: (route) => ({id: route.query.id})
  },
  {
    path: '/todo',
    name: 'todo',
    alias: '/dashboard',
    component: Todo,
    beforeEnter (to, from, next) {
      console.log('todo routes beforeEnter invoked')
      next()
    },
    meta: {
      requireAuth: true
    },
    children: [
      {
        path: 'sub',
        meta: {
          requireAuth: true
        },
        component: Login
      }
    ]
  }
]
