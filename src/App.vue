<template lang="pug">
  #app
    header.header
      nav
        .nav-wrapper
          router-link.brand-logo(to='/')
            img(alt="Vue logo" src="./assets/logo.png")

          a.right.hide-on-large-only(href="#" data-target="mobile-menu" data-activates="mobile-menu" @click="openSidebar")
            i.material-icons menu

          ul.nav-list.right.hide-on-med-and-down
            router-link.nav-list__item(v-for="link in linkMenu" :key="link.title" :to="`${link.url}`" tag="li" exact active-class="active")
              a.nav-list__link
                i.material-icons {{ link.icon }}
                | {{ link.title }}
            li.nav-list__item(v-if="isUserLoggedIn")
              a.nav-list__link(@click="logoutUser")
                i.material-icons exit_to_app
                | Logout

      ul#mobile-menu.sidenav(ref="sidenav")
        router-link.nav-list__item(v-for="link in linkMenu" :key="link.title" :to="`${link.url}`" tag="li" exact active-class="active")
          a.nav-list__link {{ link.title }}
        li.nav-list__item(v-if="isUserLoggedIn")
          a.nav-list__link(@click="logoutUser") Logout

    router-view
</template>

<script>
import { setTimeout } from 'timers';
export default {
  data() {
    return {
      sidebar: null
    }
  },
  computed: {
    isUserLoggedIn() {
      return this.$store.getters.isUserLoggedIn
    },
    linkMenu() {
      if(this.isUserLoggedIn) {
        return [
            {title: 'Home', url: '/', icon: 'account_balance'},
            {title: 'Profile', url: '/profile', icon: 'account_circle'}
        ]
      }
      return [
          {title: 'Home', url: '/', icon: 'account_balance'},
          {title: 'Registration', url: '/reg', icon: 'assignment_ind'},
          {title: 'Authorization', url: '/auth', icon: 'account_circle'},
      ]
    }
  },

  methods: {
    logoutUser() {
      this.$store.dispatch('logoutUser')
      this.$store.dispatch('clearUserPosts')
      if(this.$router.currentRoute.name !== 'home') {
        this.$router.push('/')
      }
    },
    openSidebar() {
      this.sidebar.open()
    }
  },

  mounted() {
    M.Sidenav.init(this.$refs.sidenav)
    this.sidebar = M.Sidenav.getInstance(this.$refs.sidenav)
  }
}
</script>>

<style lang="sass">
#app
  font-family: 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  color: #2c3e50

a
  display: inline-block

.row
  display: flex
  flex-wrap: wrap
  &>.col
    margin-left: auto
    margin-right: auto
    &>.card
      height: calc(100% - 1rem)
      display: flex
      flex-direction: column
      .card-content
        flex-grow: 1

.header
  margin-bottom: 30px

.nav
  &.router-link-exact-active
    color: #42b983
  &-list
    &__link
      display: flex
      align-items: center
      .material-icons
        display: inline-block
        margin-right: 10px

nav
  .nav-wrapper
    .brand-logo
      padding-left: 15px
      padding-right: 15px
      height: 100%
      display: flex
      align-items: center
      &>img
        max-width: 50px
        height: auto
</style>
