<template lang="pug">
  ul.pagination
    li.waves-effect(@click="prevPage" :class="{'disabled': currentPage <= 1}")
      a(href="#!")
        i.material-icons chevron_left
    li.waves-effect(v-for="item in totalPages" :class="{'active': item === currentPage}" @click="emitPage(item)")
      a(href="#!") {{ item }}
    li.waves-effect(@click="nextPage" :class="{'disabled': currentPage >= totalPages}")
      a(href="#!")
        i.material-icons chevron_right
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    current: {
      type: Number,
      default: 1
    },
    perPage: Number,
    total: Array
  },

  data() {
    return {
      currentPage: this.current,
      pages: []
    }
  },

  computed: {
    totalPages() {
      return Math.ceil(this.total.length / this.perPage)
    }
  },

  methods: {
    nextPage() {
      if (this.currentPage < this.totalPages)
        this.emitPage(this.currentPage + 1)
    },
    prevPage() {
      if (this.currentPage > 1)
        this.emitPage(this.currentPage - 1)
    },
    splitPages() {
      let subPages = []
      for (let i = 0; i < this.totalPages; i++){
          subPages[i] = this.total.slice((i * this.perPage), (i * this.perPage) + this.perPage)
      }
      this.pages = subPages
    },
    emitPage(current) {
      this.currentPage = +current
      this.$emit('setPage', this.pages[this.currentPage - 1])
    }
  },

  mounted() {
    this.splitPages()
    if (this.pages.length) {
      this.emitPage(this.currentPage)
    }
  }
}
</script>
