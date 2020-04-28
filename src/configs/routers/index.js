export const routes = [
  {
    label: 'home',
    path: '/',
    private: true,
    exact: true,
    component: 'home',
  },
  {
    label: 'profile',
    path: '/profile',
    private: true,
    exact: true,
    component: 'profile',
  },
  {
    label: 'dashboard',
    path: '/dashboard',
    private: true,
    exact: true,
    component: 'dashboard',
  },
  {
    label: 'Login',
    path: '/login',
    exact: true,
    component: 'login'
  },
  {
    label: 'Register',
    path: '/register',
    exact: true,
    component: 'register'
  },
]
