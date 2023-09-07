import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'

import WelcomeView from '@/views/WelcomeView.vue'
import SignIn from '../views/web/SignIn.vue'
import SignUp from '../views/web/SignUp.vue'
import ForgotPassword from '../views/web/ForgotPassword.vue'
import SignUpClimberView from '../views/web/SignUpClimberView.vue'
import ClimberPersonalInfo from '../views/web/ClimberPersonalInfo.vue'
import ClimberClimbingExp from '../views/web/ClimberClimbingExp.vue'
import ClimberFunFacts from '../views/web/ClimberFunFacts.vue'
import ClimberInterestedSkills from '../views/web/ClimberInterestedSkills.vue'
import ApplyAsGuide from '../views/web/ApplyAsGuide.vue'
import SignUpGuideView from '../views/web/SignUpGuideView.vue'
import GuideCompanyInfo from '../views/web/GuideCompanyInfo.vue'
import GuideDocuments from '../views/web/GuideDocuments.vue'
import GuideReviews from '../views/web/GuideReviews.vue'
import GuideExperience from '../views/web/GuideExperience.vue'
import GuideReference from '../views/web/GuideReference.vue'

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
      { path: '/forgot-password', name: 'ForgotPassword', component: ForgotPassword, meta: {requiresVisitor: true} },
      { path: '/apply-as-guide', name: 'ApplyAsGuide', component: ApplyAsGuide, meta: {requiresVisitor: true} },
      { path: '/company-info', component: SignUpGuideView, meta: {requiresVisitor: true},
        children: [
          { path: '/company-info', component: GuideCompanyInfo, name: 'GuideCompanyInfo' },
          { path: '/guide-documents', component: GuideDocuments, name: 'GuideDocuments' },
          { path: '/guide-reviews', component: GuideReviews, name: 'GuideReviews' },
          { path: '/guide-experience', component: GuideExperience, name: 'GuideExperience' },
          { path: '/guide-reference', component: GuideReference, name: 'GuideReference' },
          
        ]
       },

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
