export default {
  state: {
    user: null
  },

  mutations: {
    setUser (state, payload) {
      state.user = payload
    }
  },

  actions: {
    registerUser ({ commit }, payload) {
      commit('setUser', payload)
    },
    loginUser ({ commit }, payload) {
      commit('setUser', payload)
    },
    autoLoginUser ({ commit }, payload) {
      commit('setUser', payload)
    },
    logoutUser ({ commit }) {
      commit('setUser', null)
    }
  },

  getters: {
    user (state) {
      return state.user
    },
    isUserLoggedIn (state) {
      return !!state.user
    }
  }
}
