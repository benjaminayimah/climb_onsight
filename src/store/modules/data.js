export default {
    state: {
        bannerImage: require('@/assets/images/banner_image.png'),
        default_avatar: require('@/assets/images/avatar.png'),
        climberSkills: ['Top rope', 'Leading', 'Multi pitch'],
        newGuide: JSON.parse(localStorage.getItem('newGuide')) || ''
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
        updateGuideExperience() {
            //
        },
        updateGuideReferees(state, payload) {
            let stored = JSON.parse(localStorage.getItem('newGuide'))
            stored.referees = payload
            localStorage.setItem('newGuide', JSON.stringify(stored))
            state.newGuide.referees = payload
        }
    }
}