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
  },

  removeList(state, list) {
    state.lists.splice(state.lists.indexOf(list), 1)
  },

  removeListCard(state, { card, listIndex }) {
    var cardIndex = state.lists[listIndex].cards.indexOf(card)
    state.lists[listIndex].cards.splice(cardIndex, 1)
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
  },

  removeList ({commit}, list) {
    commit('removeList', list)
  },

  removeListCard ({commit}, cardDetails) {
    commit('removeListCard', {
      card: cardDetails.card,
      listIndex: cardDetails.listIndex
    })
  },
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