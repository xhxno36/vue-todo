const Todo = () => import('views/todo/TodoBody.vue')
const Login = () => import('views/login/login.vue')

export default [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/todo',
    component: Todo
  }
]
