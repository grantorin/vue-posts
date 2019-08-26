<template lang="pug">
  .container
    .row(v-if="post")
      .col.s12
        template(v-if="!isOwnwerPostCurrentUser")
          span.new.badge(data-badge-caption="author" v-if="owner") {{ owner }}
          h3 {{ post.title }}
          p {{ post.body }}
        template(v-else)
          form( @submit.prevent="editPost")
            .input-field.col.s12
              input.validate(type="text" v-model="post.title" required)
              textarea#textarea1.materialize-textarea(v-model="post.body" required)
            button.right.btn.waves-effect.waves-light(type="submit")
              | Save
              i.material-icons.right send
    .row
      .col.s12
        comments(:postId="id")
</template>

<script>
import Comments from '@/components/Comments'

export default {
  components: {
    Comments
  },

  data() {
    return {
      id: this.$route.params['id'],
      ownerId: this.$route.query['ownerId'],
      owner: ''
    }
  },

  computed: {
    post() {
      return this.$store.getters.post(this.id)
    },

    isOwnwerPostCurrentUser() {
      if(this.$store.getters.user) {
        return this.ownerId === this.$store.getters.user.id
      }
    }
  },

  methods: {
    editPost() {
      this.$http.put(`https://jsonplaceholder.typicode.com/posts/${this.id}`, {
          title: this.post.title,
          body: this.post.body,
          userId: this.$store.getters.user.id
        })
        .then(post => {
          this.$store.dispatch('putPost', post.data)
          Materialize.toast('success', 1000)
          this.$router.push('/')
        })
        .catch(err => {
          Materialize.toast(err.message, 6000)
          console.log(err)
        })
      }
  },

  mounted() {
    this.$http.get(`https://jsonplaceholder.typicode.com/users/${this.ownerId}`)
        .then(user => {
          this.owner = user.data.name
        })
        .catch(err => {
          Materialize.toast(err.message, 6000)
          console.log(err)
        })
  }
}
</script>
