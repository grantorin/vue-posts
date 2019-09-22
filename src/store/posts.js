/* eslint-disable eqeqeq */
export default {
  state: {
    posts: []
  },

  mutations: {
    removePost (state, payload) {
      let removePostIndex = state.posts.findIndex(post => post.id == payload)
      state.posts.splice(removePostIndex, 1)
    },

    setPosts (state, payload) {
      state.posts = payload
    },

    putPost (state, payload) {
      const editablePostIndex = state.posts.findIndex(post => post.id == payload.id)
      state.posts[editablePostIndex] = payload
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

    fetchPosts ({ commit }, payload) {
      commit('setPosts', payload)
    }
  },

  getters: {
    posts (state) {
      return state.posts
    },

    post (state) {
      return postId => {
        return state.posts.find(post => post.id == postId)
      }
    }
  }
}
