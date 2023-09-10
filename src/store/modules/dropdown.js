export default {
    state: {
      dynamicFloatingDiv: { right: '', left: '', top: '', bottom: ''},
    },
    mutations: {
      setDynamicFloatingDiv(state, payload) {
        const rect = payload.getBoundingClientRect()
        let top = rect.top
        let left = rect.left

        console.log(payload)
        if(state.mobile) {
          state.dynamicFloatingDiv.left = '0'
          state.dynamicFloatingDiv.bottom = '0'
        }else{
          state.dynamicFloatingDiv.left = left
          state.dynamicFloatingDiv.top = top
          state.dynamicFloatingDiv.bottom = '100'
        }
        payload.classList.add('this-will-change')
      },
      reSetDynamicFloatingDiv(state, payload) {
        state.dynamicFloatingDiv.left = null
        state.dynamicFloatingDiv.top = null
        state.dynamicFloatingDiv.bottom = null
        payload.classList.remove('this-will-change')
      }
    },
    getters: {
      // getFloatingDiv: (state) => state.dynamicFloatingDiv,
    }
}