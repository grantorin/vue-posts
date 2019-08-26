/* eslint-disable eqeqeq */
export default {
  state: {
    posts: [],
    userPosts: null
  },

  mutations: {
    removePost (state, payload) {
      let removePostIndex = state.posts.findIndex(post => post.id == payload)
      state.posts.splice(removePostIndex, 1)
      removePostIndex = state.userPosts.findIndex(post => post.id == payload)
      state.userPosts.splice(removePostIndex, 1)
    },

    setPosts (state, payload) {
      state.posts = payload
    },

    setUserPosts (state, payload) {
      state.userPosts = payload
    },

    putPost (state, payload) {
      const editablePostIndex = state.posts.findIndex(post => post.id == payload.id)
      state.posts[editablePostIndex] = payload
    },

    clearUserPosts (state) {
      state.userPosts = null
    }
  },

  actions: {
    removePost ({ commit }, payload) {
      commit('removePost', payload)
    },

    putPost ({ commit }, payload) {
      commit('putPost', payload)
    },

    setPosts ({ commit }, payload) {
      commit('setPosts', payload)
    },

    setUserPosts ({ commit }, payload) {
      commit('setUserPosts', payload)
    },

    fetchPosts ({ commit }, payload) {
      commit('setPosts', payload)
    },

    clearUserPosts ({ commit }) {
      commit('clearUserPosts')
    }
  },

  getters: {
    posts (state) {
      return state.posts
    },

    userPosts (state) {
      return state.userPosts
    },

    post (state) {
      return postId => {
        return state.posts.find(post => post.id == postId)
      }
    }
  }
}
