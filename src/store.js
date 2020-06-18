import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  lists: []
}

const mutations = {
  addListToBoard(state, list) {
    state.lists.push(list)
  },

  applyListDrag(state, dropResult) {
    const { removedIndex, addedIndex, payload } = dropResult
    let itemToAdd = payload
    
    if (removedIndex !== null) {
      itemToAdd = state.lists.splice(removedIndex, 1)[0]
    }
    
    if (addedIndex !== null) {
      state.lists.splice(addedIndex, 0, itemToAdd)
    }
  },

  addCardToList(state, cardData) {
    state.lists = state.lists.map(list => {
      if(list.uid === cardData.listId) {
        list.cards.push(cardData.card)
      }
      return list
    })
  },

  moveCard(state, data) {
    state.lists.splice(data.columnIndex, 1, data.newColumn)
  }
}

const actions = {
  addListToBoard ({ commit }, list) {
    commit('addListToBoard', {
      ...list,
      uid: list.uid || (Date.now()).toString()
    })
  },

  applyListDrag ({ commit }, dropResult) {
    commit('applyListDrag', dropResult)
  },

  addCardToList ({ commit }, cardData) {
    commit('addCardToList', cardData)
  },

  moveCard ({commit}, dropCardResult) {
    commit('moveCard', dropCardResult)
  }
}

const getters = {
  getBoardLists: (state) => () => {
    return state.lists
  },

  getBoardListById: (state) => (id) => {
    return state.lists.filter(i => { return i.uid === id })
  },

  getListCardsyId: (state) => (id) => {
    for(let i = 0; state.lists.length; i++) {
      if(state.lists[i].uid === id) {
        return state.lists[i].cards
      }
    }
  },
}

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})