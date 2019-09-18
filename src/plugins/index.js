import '@/plugins/materialize.css'
import Materialize from '@/plugins/materialize'

const M = {
  install (Vue, options) {
    Vue.$M = Materialize
  }
}

export default M
