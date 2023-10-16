export default {
    state: {
        bannerImage: '/temp/banner_image.png',
        default_avatar: require('@/assets/images/avatar.png'),
        climberSkills: ['Top rope', 'Leading', 'Multi pitch'],
        newGuide: JSON.parse(localStorage.getItem('newGuide')) || '',
        categories: [
            {id: 1, name: 'Ice Climbing', value: 0, image: require('@/assets/images/ice_climbing.png')},
            {id: 2, name: 'Mountain Climbing', value: 0, image: require('@/assets/images/mountain_climbing.png')},
            {id: 3, name: 'Trad', value: 0, image: require('@/assets/images/trad.png')},
            {id: 4, name: 'Lead', value: 0, image: require('@/assets/images/lead.png')},
            {id: 5, name: 'Mountaineering', value: 0, image: require('@/assets/images/mountaineering.png')}

        ]
    },
    mutations: {
        updateCompanyInfo(state, payload) {
            let stored = JSON.parse(localStorage.getItem('newGuide'))
            if(stored) {
                stored.name = payload.name
                stored.email = payload.email
                stored.phone_number = payload.phone_number
                localStorage.setItem('newGuide', JSON.stringify(stored))
                state.newGuide.name = payload.name
                state.newGuide.email = payload.email
                state.newGuide.phone_number = payload.phone_number
            }else {
                localStorage.setItem('newGuide', JSON.stringify(payload))
                state.newGuide = payload
            }
        },
        updateGuideDoc(state, payload) {
            let inputString = payload.guide_awards
            let dataArray = inputString.split(',')
            let stored = JSON.parse(localStorage.getItem('newGuide'))
            stored.guide_awards = dataArray
            stored.guide_insurance = payload.guide_insurance
            stored.guide_certificate = payload.guide_certificate
            localStorage.setItem('newGuide', JSON.stringify(stored))
            state.newGuide.guide_awards = dataArray
            state.newGuide.guide_insurance = payload.guide_insurance
            state.newGuide.guide_certificate = payload.guide_certificate
        },
        updateGuideReviews(state, payload) {
            let stored = JSON.parse(localStorage.getItem('newGuide'))
            stored.customer_reviews = payload.customer_reviews
            localStorage.setItem('newGuide', JSON.stringify(stored))
            state.newGuide.customer_reviews = payload.customer_reviews
        },
        updateCategoryValue(state, payload) {
            const i = state.categories.findIndex(x => x.name === payload.name)
            state.categories[i].value = payload.value
        },
        updateGuideExperience(state, payload) {
            let stored = JSON.parse(localStorage.getItem('newGuide'))
            stored.guide_experience = payload
            localStorage.setItem('newGuide', JSON.stringify(stored))
            state.newGuide.guide_experience = payload
        },
        updateGuideReferees(state, payload) {
            let stored = JSON.parse(localStorage.getItem('newGuide'))
            stored.referees = payload
            localStorage.setItem('newGuide', JSON.stringify(stored))
            state.newGuide.referees = payload
        },
        updateGuideCompleted(state) {
            let stored = JSON.parse(localStorage.getItem('newGuide'))
            stored.completed = true
            localStorage.setItem('newGuide', JSON.stringify(stored))
            state.newGuide.completed = true
        },
        removeNewGuide(state) {
            state.newGuide = ''
        }
    },
    getters: {
        guide_step1_isSet(state) {
            return state.newGuide.name ? true : false
        },
        guide_step2_isSet(state) {
            return state.newGuide.guide_awards || state.newGuide.guide_insurance || state.newGuide.guide_certificate ? true : false
        },
        guide_step3_isSet(state) {
            return state.newGuide.customer_reviews ? true : false
        },
        guide_step4_isSet(state) {
            return state.newGuide.guide_experience ? true : false
        },
        guide_step5_isSet(state) {
            return state.newGuide && state.newGuide.completed ? true : false
        },
        
 
        
    }
}