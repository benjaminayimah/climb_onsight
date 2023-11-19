import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'

import WelcomeView from '@/views/WelcomeView.vue'
import SignIn from '../views/web/SignIn.vue'
import SignUp from '../views/web/SignUp.vue'
import ForgotPassword from '../views/web/ForgotPassword.vue'
import ResetPassword from '../views/web/ResetPassword.vue'
import GuideSignUp from '../views/web/GuideSignUp.vue'
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
import MyEvents from '../views/climbers/MyEvents.vue'
import ExploreEvents from '../views/climbers/ExploreEvents.vue'

import Chats from '../views/app/ChatsView.vue'
import Calendar from '../views/guides/Calendar.vue'
import Payout from '../views/guides/Payout.vue'
import Guides from '../views/app/GuidesView.vue'
import Statistics from '../views/admin/Statistics.vue'
import SubAdmins from '../views/admin/SubAdmins.vue'
import Climbers from '../views/app/ClimbersView.vue'
import UpcomingEvents from '../views/app/UpcomingEvents.vue'

import VerifyEmail from '@/views/web/VerifyEmail.vue'
import GuideRegistrationComplete from '@/views/web/GuideRegistrationComplete.vue'
import AccessDenied from '@/views/app/AccessDenied.vue'

import BookingSuccess from '@/views/climbers/BookingSuccess.vue'
import BookingCanceled from '@/views/climbers/BookingCanceled.vue'


// Guards
const superGuard = (to, from, next) => {
  // Perform your checks here
  if (store.getters.is_super) {
    // If the condition is met, allow the route transition
    next();
  } else {
    next({
      name: 'AccessDenied'
    });
  }
};
const guidesGuard = (to, from, next) => {
  if (store.getters.is_guide) {
    next();
  } else {
    next({
      name: 'AccessDenied'
    });
  }
};
const guidesAndSuperGuard = (to, from, next) => {
  if (store.getters.is_guide || store.getters.is_super) {
    next();
  } else {
    next({
      name: 'AccessDenied'
    });
  }
};
const climbersGuard = (to, from, next) => {
  if (store.getters.is_climber) {
    next();
  } else {
    next({
      name: 'AccessDenied'
    });
  }
};
//climber signup guards
const climberSignUpStepper2 = (to, from, next) => {
  if (store.getters.climber_step1_isSet) {
    next();
  } else {
    next({
      name: 'ClimberPersonalInfo'
    });
  }
};
const climberSignUpStepper3 = (to, from, next) => {
  if (store.getters.climber_step2_isSet) {
    next();
  } else {
    next({
      name: 'ClimberClimbingExp'
    });
  }
};
const climberSignUpStepper4 = (to, from, next) => {
  if (store.getters.climber_step3_isSet) {
    next();
  } else {
    next({
      name: 'ClimberFunFacts'
    });
  }
};

//guide signup guards

const guideSignUpStepper2 = (to, from, next) => {
  if (store.getters.guide_step1_isSet) {
    next();
  } else {
    next({
      name: 'GuideCompanyInfo'
    });
  }
};
const guideSignUpStepper3 = (to, from, next) => {
  if (store.getters.guide_step2_isSet) {
    next();
  } else {
    next({
      name: 'GuideDocuments'
    });
  }
};
const guideSignUpStepper4 = (to, from, next) => {
  if (store.getters.guide_step3_isSet) {
    next();
  } else {
    next({
      name: 'GuideReviews'
    });
  }
};
const guideSignUpStepper5 = (to, from, next) => {
  if (store.getters.guide_step4_isSet) {
    next();
  } else {
    next({
      name: 'GuideExperience'
    });
  }
};
const guideSignUpCompleted = (to, from, next) => {
  if (store.getters.guide_step5_isSet) {
    next();
  } else {
    next({
      name: 'ApplyAsGuide'
    });
  }
};


const routes = [
  {
    path: '/home',
    component: AdminDashboard,
    meta: { requiresAuth: true },
    children: [
      { path: '/', component: Home, name: 'Home' },
      { path: '/my-events', component: MyEvents, name: 'MyEvents', beforeEnter: climbersGuard},
      { path: '/explore-events', component: ExploreEvents, name: 'ExploreEvents', beforeEnter: climbersGuard},
      { path: '/chats', component: Chats, name: 'Chats'},
      { path: '/calendar', component: Calendar, name: 'Calendar', beforeEnter: guidesGuard},
      { path: '/payout', component: Payout, name: 'Payout', beforeEnter: guidesGuard},
      { path: '/guides', component: Guides, name: 'Guides', beforeEnter: superGuard},
      { path: '/statistics', component: Statistics, name: 'Statistics', beforeEnter: superGuard},
      { path: '/sub-admins', component: SubAdmins, name: 'SubAdmins', beforeEnter: superGuard},
      { path: '/climbers', component: Climbers, name: 'Climbers', beforeEnter: superGuard},
      { path: '/upcoming-events', component: UpcomingEvents, name: 'UpcomingEvents', beforeEnter: guidesAndSuperGuard },
      { path: '/access-denied', component: AccessDenied, name: 'AccessDenied'},
      { path: '/booking/success/:session_id', name: 'BookingSuccess', component: BookingSuccess },
      { path: '/booking/canceled/:session_id', name: 'BookingCanceled', component: BookingCanceled },

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
      { path: '/guide-signup/:payload', name: 'GuideSignUp', component: GuideSignUp, meta: {requiresVisitor: true} },
      { path: '/company-info', component: SignUpGuideView, meta: {requiresVisitor: true},
        children: [
          { path: '/company-info', component: GuideCompanyInfo, name: 'GuideCompanyInfo' },
          { path: '/guide-documents', component: GuideDocuments, name: 'GuideDocuments', beforeEnter: guideSignUpStepper2 },
          { path: '/guide-reviews', component: GuideReviews, name: 'GuideReviews', beforeEnter: guideSignUpStepper3 },
          { path: '/guide-experience', component: GuideExperience, name: 'GuideExperience', beforeEnter: guideSignUpStepper4 },
          { path: '/guide-reference', component: GuideReference, name: 'GuideReference', beforeEnter: guideSignUpStepper5 }
        ]
       },

      { path: '/signup-personal-info', component: SignUpClimberView,
        meta: {requiresNewUser: true},
        children: [
          { path: '/signup-personal-info', name: 'ClimberPersonalInfo', component: ClimberPersonalInfo },
          { path: '/signup-climbing-experience', name: 'ClimberClimbingExp', component: ClimberClimbingExp, beforeEnter: climberSignUpStepper2 },
          { path: '/signup-fun-facts', name: 'ClimberFunFacts', component: ClimberFunFacts, beforeEnter: climberSignUpStepper3 },
          { path: '/signup-interested-new-skills', name: 'ClimberInterestedSkills', component: ClimberInterestedSkills, beforeEnter: climberSignUpStepper4 },
        ]
      },
    ]
  },
  { path: '/verify-account-email/:token', name: 'VerifyEmail', component: VerifyEmail},
  { path: '/guide-registration-completed', name: 'GuideRegistrationComplete', component: GuideRegistrationComplete, beforeEnter: guideSignUpCompleted },


]

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
