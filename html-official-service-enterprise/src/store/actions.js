
import * as types from './mutation-types'
import store from "@/store"

export const setLayout = ({ commit }, payload) => {
  commit(types.SET_LAYOUT, payload)
}
