import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'



const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})



// const adminsGuard = (to, from, next) => {
//   if (store.getters.is_admin) {
//     next();
//   } else {
//     next(false);
//   }
// };

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.auth) {
      next({
        name: 'SignIn',
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresVisitor)) {
    if (store.getters.auth) {
      next({
        name: 'Home'
      })
    } else{
      next()
    }
  }
  else if (to.matched.some(record => record.meta.requiresNewUser)) {
    if (!store.getters.newUser) {
      next({
        name: 'SignIn'
      })
    } else{
      next()
    }
  }
  else {
    next()
  }
})

export default router
