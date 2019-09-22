<template lang="pug">
  .container
    .progress(v-if="preload")
      .indeterminate

    .row(v-show="!preload")
      .col.s12
        //- a.waves-effect.waves-light.btn button
        a.waves-effect.waves-light.btn(@click="sortDown")
          i.material-icons.left arrow_downward
          | down
        a.waves-effect.waves-light.btn(@click="sortUp")
          i.material-icons.right arrow_upward
          | up
        a.waves-effect.waves-light.btn(@click="filterUserPosts" v-if="user")
          i.material-icons.right all_inclusive
          | {{ isMyPost | filterTitleIsMyPostBtn }}

    .row(v-show="!preload")
      .col.s12.m6.xl4(v-for="post in posts" :key="post.id")
        .card
          .card-content
            span.card-title {{ post.title }}
            p {{ post.body | filterDescription }}
          .card-action
            router-link(:to="{ name: 'post', params: {id: post.id}, query: {ownerId: post.userId} }") more
            a.btn-floating.right.waves-effect.waves-light.red(title="remove post" @click="removePost(post.id)" v-if="user && post.userId === user.id")
              i.material-icons clear

    .pagination-box(v-if="postsAll && postsAll.length")
      pagination(:current="1" :perPage="9" :total="userPosts || postsAll" @setPage="setPage($event)")
</template>

<script>
import { setTimeout } from 'timers';
import Pagination from '@/components/Pagination';

export default {
  name: 'Home',
  components: {
    Pagination
  },
  data() {
    return {
      preload: true,
      isMyPost: true,
      posts: null,
      userPosts: null
    }
  },

  computed: {
    postsAll() {
      setTimeout(() => {
        this.preload = false
      }, 1000)

      return this.$store.getters.posts
    },

    user() {
      return this.$store.getters.user
    }
  },

  filters: {
    filterDescription(string) {
      return string.length > 150 ? string.slice(0, 150) + ' ...' : string;
    },
    filterTitleIsMyPostBtn(isMy) {
      return isMy ? 'my posts' : 'all posts'
    }
  },

  methods: {
    setPage(posts) {
      this.posts = posts
    },
    sortDown() {
      let sortposts = this.posts.sort((a, b) => {
        return a.id < b.id ? 1 : -1
      })
      this.$store.dispatch('setPosts', sortposts)
    },

    sortUp() {
      let sortposts = this.posts.sort((a, b) => {
        return a.id > b.id ? 1 : -1
      })
      this.$store.dispatch('setPosts', sortposts)
    },

    filterUserPosts() {
      if(!this.$store.getters.isUserLoggedIn) return

      const user = this.$store.getters.user
      if(!this.userPosts) {
        let userPosts = this.postsAll.filter(item => {
          return item.userId === user.id
        })
        this.userPosts = userPosts
        this.isMyPost = false
      } else {
        this.userPosts = null
        this.isMyPost = true
      }
    },

    removePost(id) {
      this.$http.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then(resp => {
          if(resp.status === 200) {
            this.$store.dispatch('removePost', id)

            let removePostIndex = this.userPosts.findIndex(post => post.id == id)
            this.userPosts.splice(removePostIndex, 1)

            this.$toasted.show('success', {
              duration: 3000
            })
          }
        })
        .catch(err => {
          this.$toasted.show(err.message, {
            duration: 5000
          })
          console.log(err)
        })
    }
  }
}
</script>

<style lang="sass">
.btn
  margin-right: 10px
  margin-left: 10px

.pagination-box
  display: flex
  justify-content: center
</style>
