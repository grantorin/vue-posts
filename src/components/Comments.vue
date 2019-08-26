<template lang="pug">
  div
    h6 New Comment
    form(@submit.prevent="addComment")
      .row
        .col.s12
          .row
            .input-field.col.s12.m6
              input#email.validate(type="email" v-model="email")
              label(for="email") Email
            .input-field.col.s12.m6
              input#name.validate(type="text" v-model="commentName")
              label(for="name") Title
            .input-field.col.s12
              textarea#textarea1.materialize-textarea(v-model="commentText")
              label(for="textarea1") Comment
        .col.s12
          button.right.btn.waves-effect.waves-light.waves-effect(type="submit")
            | Add
            i.material-icons.right send

    .row(v-for="comment in comments" :key="comment.id")
      .col.s12
        .card.horizontal
          .card-stacked
            .card-content
              span.card-title {{ comment.name }}
              p {{ comment.body }}
            .card-action
              a(:href="`mailto:${comment.email}`") {{ comment.email }}
</template>

<script>
export default {
  props: ['postId'],
  data() {
    return {
      commentName: '',
      commentText: '',
      email: '',
      comments: []
    }
  },

  methods: {
    addComment() {
      if(this.commentName && this.commentText && this.email) {
        this.$http.post(`https://jsonplaceholder.typicode.com/comments`, {
            body: this.commentText,
            email: this.email,
            postId: this.postId,
            name: this.commentName
          })
          .then(comment => {
            console.log(comment.data)
            this.comments.unshift(comment.data)
            Materialize.toast('success', 6000)
          })
          .catch(err => {
            Materialize.toast(err.message, 6000)
            console.log(err)
          })
      } else {
        Materialize.toast('Warning: Required all fields', 6000)
      }
    }
  },

  mounted() {
    if(this.$store.getters.user) {
      this.email = this.$store.getters.user.email
    }
    this.$http.get(`https://jsonplaceholder.typicode.com/comments?postId=${this.postId}`)
        .then(comments => {
          this.comments = comments.data.sort((a, b) => {
            return a.id < b.id ? 1 : -1
          })
        })
        .catch(err => {
          Materialize.toast(err.message, 6000)
          console.log(err)
        })
  }
}
</script>

<style lang="sass">
</style>
