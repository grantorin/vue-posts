<template lang="pug">
  .container
    h5 Profile
    .row
      .input-field.col.s6
        input#name.validate(type="text" v-model="name")
        label(for="name") Name
    .row
      .input-field.col.s6
        input#account.validate(type="text" v-model="account")
        label(for="account") Account
    .row
      .input-field.col.s6
        input#email.validate(type="email" v-model="email")
        label(for="email") Email
</template>

<script>
export default {
  data() {
    return {
      name: '',
      account: '',
      email: ''
    }
  },

  created() {
    const user = this.$store.getters.user
    if (user) {
      this.name = user.name
      this.email = user.email
    }
  }
}
</script>
