import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'

import WelcomeView from '@/views/WelcomeView.vue'
import SignIn from '../views/web/SignIn.vue'
import SignUp from '../views/web/SignUp.vue'
import SignUpClimberView from '../views/web/SignUpClimberView.vue'
import ClimberPersonalInfo from '../views/web/ClimberPersonalInfo.vue'
import ClimberClimbingExp from '../views/web/ClimberClimbingExp.vue'
import ClimberFunFacts from '../views/web/ClimberFunFacts.vue'
import ClimberInterestedSkills from '../views/web/ClimberInterestedSkills.vue'

import Dashboard from '../views/Dashboard.vue'

const routes = [
  {
    path: '/home',
    component: Dashboard,
    meta: { requiresAuth: true },
    children: [
      { path: '/', component: Dashboard, name: 'Dashboard' }
    ]
  },
  { 
    path: '/signin', component: WelcomeView,
    children: [
      { path: '/signin', name: 'SignIn', component: SignIn, meta: {requiresVisitor: true} },
      { path: '/signup', name: 'SignUp', component: SignUp, meta: {requiresVisitor: true} },
      { path: '/signup-personal-info', component: SignUpClimberView,
        meta: {requiresNewUser: true},
        children: [
          { path: '/signup-personal-info', name: 'ClimberPersonalInfo', component: ClimberPersonalInfo },
          { path: '/signup-climbing-experience', name: 'ClimberClimbingExp', component: ClimberClimbingExp },
          { path: '/signup-fun-facts', name: 'ClimberFunFacts', component: ClimberFunFacts },
          { path: '/signup-interested-new-skills', name: 'ClimberInterestedSkills', component: ClimberInterestedSkills },

          

          
        ]
      },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
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
        name: 'Dashboard'
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
