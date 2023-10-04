import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'

import WelcomeView from '@/views/WelcomeView.vue'
import SignIn from '../views/web/SignIn.vue'
import SignUp from '../views/web/SignUp.vue'
import ForgotPassword from '../views/web/ForgotPassword.vue'
import ResetPassword from '../views/web/ResetPassword.vue'
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

import AdminDashboard from '../views/AdminDashboard.vue'
import Home from '../views/app/Home.vue'
import Events from '../views/climbers/EventsView.vue'
import Chats from '../views/app/ChatsView.vue'
import Calendar from '../views/guides/Calendar.vue'
import Payout from '../views/guides/Payout.vue'
import Guides from '../views/app/GuidesView.vue'
import Statistics from '../views/admin/Statistics.vue'
import SubAdmins from '../views/admin/SubAdmins.vue'
import Climbers from '../views/app/ClimbersView.vue'

import VerifyEmail from '@/views/web/VerifyEmail.vue'
import GuideRegistrationComplete from '@/views/web/GuideRegistrationComplete.vue'




const routes = [
  {
    path: '/home',
    component: AdminDashboard,
    meta: { requiresAuth: true },
    children: [
      { path: '/', component: Home, name: 'Home' },
      { path: '/events', component: Events, name: 'Events'},
      { path: '/chats', component: Chats, name: 'Chats'},
      { path: '/calendar', component: Calendar, name: 'Calendar'},
      { path: '/payout', component: Payout, name: 'Payout'},
      { path: '/guides', component: Guides, name: 'Guides'},
      { path: '/statistics', component: Statistics, name: 'Statistics'},
      { path: '/sub-admins', component: SubAdmins, name: 'SubAdmins'},
      { path: '/climbers', component: Climbers, name: 'Climbers'}

    ]
  },
  { 
    path: '/signin', component: WelcomeView,
    children: [
      { path: '/signin', name: 'SignIn', component: SignIn, meta: {requiresVisitor: true} },
      { path: '/signup', name: 'SignUp', component: SignUp, meta: {requiresVisitor: true} },
      { path: '/forgot-password', name: 'ForgotPassword', component: ForgotPassword, meta: {requiresVisitor: true} },
      { path: '/reset-password/:payload', name: 'ResetPassword', component: ResetPassword, meta: {requiresVisitor: true} },
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
  { path: '/verify-account-email/:token', name: 'VerifyEmail', component: VerifyEmail},
  { path: '/guide-registration-completed/:token', name: 'GuideRegistrationComplete', component: GuideRegistrationComplete},


]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


// Guards
// const super_adminGuard = (to, from, next) => {
//   // Perform your checks here
//   if (conditionIsMet) {
//     // If the condition is met, allow the route transition
//     next();
//   } else {
//     // If the condition is not met, block the route transition
//     next(false);
//   }
// };
// const adminsGuard = (to, from, next) => {
//   if (conditionIsMet) {
//     next();
//   } else {
//     next(false);
//   }
// };
// const guidesGuard = (to, from, next) => {
//   if (conditionIsMet) {
//     next();
//   } else {
//     next(false);
//   }
// };
// const climbersGuard = (to, from, next) => {
//   if (conditionIsMet) {
//     next();
//   } else {
//     next(false);
//   }
// };

// const routes = [
//   {
//     path: '/my-route',
//     component: MyComponent,
//     beforeEnter: myGuard, // Attach your guard function
//   },
//   // Other routes...
// ];

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
