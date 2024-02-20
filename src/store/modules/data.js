export default {
    state: {
        bannerImage: '/temp/banner_image.png',
        default_avatar: require('@/assets/svg/avatar.svg'),
        climberSkills: ['Top rope', 'Leading', 'Multi pitch'],
        newGuide: JSON.parse(localStorage.getItem('newGuide')) || '',
        newEvent: JSON.parse(localStorage.getItem('newEvent')) || {},
        signedUp: false,
        categories: [
            {id: 1, name: 'Ice Climbing', value: 0, image: require('@/assets/images/ice_climbing.png')},
            {id: 2, name: 'Rock Climbing', value: 0, image: require('@/assets/images/mountain_climbing.png')},
            // {id: 3, name: 'Trad', value: 0, image: require('@/assets/images/trad.png')},
            {id: 3, name: 'Mixed Climbing', value: 0, image: require('@/assets/images/lead.png')},
            {id: 4, name: 'Mountaineering', value: 0, image: require('@/assets/images/mountaineering.png')},
            {id: 5, name: 'Other', alias: '', value: 0, image: require('@/assets/images/trad.png')}
        ],
        experience_required: ['Beginner', 'Intermediate', 'Advanced'],
        repeat_at: [
            { label: 'Daily', value: 'daily' },
            { label: 'Weekly', value: 'weekly' },
            { label: 'Weekdays', value: 'weekdays' },
            { label: 'Weekends', value: 'weekends' },
            { label: 'Monthly', value: 'monthly' }
        ]
    },
    mutations: {
        handleSignedUp(state) {
            state.signedUp = true
        },
        stopProgress(state) {
            state.signedUp = false
        },
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
            stored.guide_license = payload.guide_license
            localStorage.setItem('newGuide', JSON.stringify(stored))
            state.newGuide.guide_awards = dataArray
            state.newGuide.guide_insurance = payload.guide_insurance
            state.newGuide.guide_certificate = payload.guide_certificate
            state.newGuide.guide_license = payload.guide_license
        },
        updateGuideReviews(state, payload) {
            let stored = JSON.parse(localStorage.getItem('newGuide'))
            stored.customer_reviews = payload.customer_reviews
            localStorage.setItem('newGuide', JSON.stringify(stored))
            state.newGuide.customer_reviews = payload.customer_reviews
        },
        updateCategoryValue(state, payload) {
            const i = state.categories.findIndex(x => x.name === payload.name)
            if(payload.name.toLowerCase() === 'other') {
                state.categories[i].value = payload.value
                state.categories[i].alias = payload.alias
            }else {
                state.categories[i].value = payload.value
            }
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
                stored.event_duration = payload.event_duration
                stored.repeat = payload.repeat
                stored.repeat_at = payload.repeat_at
                localStorage.setItem('newEvent', JSON.stringify(stored))
                state.newEvent.event_name = payload.event_name
                state.newEvent.start_date = payload.start_date
                state.newEvent.end_date = payload.end_date
                state.newEvent.event_duration = payload.event_duration
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
            stored.event_type = payload.event_type
            stored.price = payload.price
            stored.price_range = payload.price_range
            stored.attendance_limit = payload.attendance_limit
            stored.event_description = payload.event_description
            localStorage.setItem('newEvent', JSON.stringify(stored))
            state.newEvent.event_type = payload.event_type
            state.newEvent.attendance_limit = payload.attendance_limit
            state.newEvent.price = payload.price
            state.newEvent.price_range = payload.price_range
            state.newEvent.event_description = payload.event_description
        },
        saveEventForm4(state, payload) {
            let stored = JSON.parse(localStorage.getItem('newEvent'))
            if(payload.guide_gears) {
                let gearsString = payload.guide_gears
                let gearsArray = gearsString.split(',')
                stored.guide_gears = gearsArray
                state.newEvent.guide_gears = gearsArray
            }else {
                stored.guide_gears = []
                state.newEvent.guide_gears = []
            }
            if(payload.climber_gears) {
                let gearsString = payload.climber_gears
                let gearsArray = gearsString.split(',')
                stored.climber_gears = gearsArray
                state.newEvent.climber_gears = gearsArray
            }else {
                stored.climber_gears = []
                state.newEvent.climber_gears = []
            }
            stored.faqs = payload.faqs
            stored.experience_required = payload.experience_required
            stored.itinerary = payload.itinerary
            stored.event_terms = payload.event_terms
            localStorage.setItem('newEvent', JSON.stringify(stored))
            state.newEvent.faqs = payload.faqs
            state.newEvent.experience_required = payload.experience_required
            state.newEvent.itinerary = payload.itinerary
            state.newEvent.event_terms = payload.event_terms
            state.newEvent.color = payload.color
        },
        updateEventTerms(state, payload) {
            let stored = JSON.parse(localStorage.getItem('newEvent'))
            stored.event_terms = payload
            localStorage.setItem('newEvent', JSON.stringify(stored))
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
        // guide_step3_isSet(state) {
        //     return state.newGuide.customer_reviews ? true : false
        // },
        guide_step4_isSet(state) {
            return state.newGuide.guide_experience ? true : false
        },
        guide_step5_isSet(state) {
            return state.newGuide && state.newGuide.completed ? true : false
        },
        
 
        
    }
}