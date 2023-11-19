export default {
    state: {
        bannerImage: '/temp/banner_image.png',
        default_avatar: require('@/assets/images/avatar.png'),
        climberSkills: ['Top rope', 'Leading', 'Multi pitch'],
        newGuide: JSON.parse(localStorage.getItem('newGuide')) || '',
        newEvent: JSON.parse(localStorage.getItem('newEvent')) || {},
        categories: [
            {id: 1, name: 'Ice Climbing', value: 0, image: require('@/assets/images/ice_climbing.png')},
            {id: 2, name: 'Rock Climbing', value: 0, image: require('@/assets/images/mountain_climbing.png')},
            // {id: 3, name: 'Trad', value: 0, image: require('@/assets/images/trad.png')},
            {id: 3, name: 'Mixed Climbing', value: 0, image: require('@/assets/images/lead.png')},
            {id: 4, name: 'Mountaineering', value: 0, image: require('@/assets/images/mountaineering.png')},
            {id: 5, name: 'Other', value: 0, image: require('@/assets/images/trad.png')}

        ]
    },
    mutations: {
        updateCompanyInfo(state, payload) {
            let stored = JSON.parse(localStorage.getItem('newGuide'))
            if(stored) {
                stored.name = payload.name
                stored.email = payload.email
                stored.phone_number = payload.phone_number
                stored.country = payload.country
                localStorage.setItem('newGuide', JSON.stringify(stored))
                state.newGuide.name = payload.name
                state.newGuide.email = payload.email
                state.newGuide.phone_number = payload.phone_number
                state.newGuide.country = payload.country

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
            stored.guide_terms = payload.guide_terms
            localStorage.setItem('newGuide', JSON.stringify(stored))
            state.newGuide.guide_awards = dataArray
            state.newGuide.guide_insurance = payload.guide_insurance
            state.newGuide.guide_certificate = payload.guide_certificate
            state.newGuide.guide_terms = payload.guide_terms
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
        },
        saveEventForm1(state, payload) {
            let stored = JSON.parse(localStorage.getItem('newEvent'))
            if(stored) {
                stored.event_name = payload.event_name
                stored.start_date = payload.start_date
                stored.end_date = payload.end_date
                stored.start_time = payload.start_time
                stored.repeat = payload.repeat
                stored.repeat_at = payload.repeat_at
                localStorage.setItem('newEvent', JSON.stringify(stored))
                state.newEvent.event_name = payload.event_name
                state.newEvent.start_date = payload.start_date
                state.newEvent.end_date = payload.end_date
                state.newEvent.start_time = payload.start_time
                state.newEvent.repeat = payload.repeat
                state.newEvent.repeat_at = payload.repeat_at
            }else {
                localStorage.setItem('newEvent', JSON.stringify(payload))
                state.newEvent = payload
            }
        },
        saveEventForm2(state, payload) {
            let stored = JSON.parse(localStorage.getItem('newEvent'))
            stored.category = payload.category
            stored.address = payload.address
            stored.latitude = payload.latitude
            stored.longitude = payload.longitude
            stored.gallery = payload.gallery
            localStorage.setItem('newEvent', JSON.stringify(stored))
            state.newEvent.category = payload.category
            state.newEvent.address = payload.address
            state.newEvent.latitude = payload.latitude
            state.newEvent.longitude = payload.longitude
            state.newEvent.gallery = payload.gallery
        },
        saveEventForm3(state, payload) {
            let stored = JSON.parse(localStorage.getItem('newEvent'))
            stored.attendance_limit = payload.attendance_limit
            if(payload.gears) {
                let gearsString = payload.gears
                let gearsArray = gearsString.split(',')
                stored.gears = gearsArray
                state.newEvent.gears = gearsArray
            }else {
                stored.gears = []
                state.newEvent.gears = []
            }
            stored.faqs = payload.faqs
            stored.price = payload.price
            stored.itinerary = payload.itinerary
            stored.event_description = payload.event_description
            localStorage.setItem('newEvent', JSON.stringify(stored))
            state.newEvent.attendance_limit = payload.attendance_limit
            state.newEvent.faqs = payload.faqs
            state.newEvent.price = payload.price
            state.newEvent.itinerary = payload.itinerary
            state.newEvent.event_description = payload.event_description
            state.newEvent.color = payload.color
        },
        updateEventGallery(state, payload) {
            let stored = JSON.parse(localStorage.getItem('newEvent'))
            stored.gallery = payload
            localStorage.setItem('newEvent', JSON.stringify(stored))
        },
        clearNewEvent(state) {
            state.newEvent = {}
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