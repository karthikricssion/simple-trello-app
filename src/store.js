import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  boards: [],
  lists: []
}

const mutations = {
  addBoard(state, board) {
    state.boards.push(board)
  },

  addListToBoard(state, list) {
    state.boards = state.boards.map(board => {
      if(board.uid === list.boardId) {
        board.lists.push(list)
        return board
      }
      return board
    })    
  },

  applyListDrag(state, dropResult) {
    const { removedIndex, addedIndex, payload } = dropResult
    let itemToAdd = payload

    if (removedIndex !== null) {
      state.boards = state.boards.map(board => {
        if(board.uid == itemToAdd.boardId) {
          board.lists.splice(removedIndex, 1)
        }
        return board
      })
    }
    
    if (addedIndex !== null) {
      state.boards = state.boards.map(board => {
        if(board.uid == itemToAdd.boardId) {
          board.lists.splice(addedIndex, 0, itemToAdd)
        }
        return board
      })
    }
  },

  addCardToList(state, cardData) {
    state.boards = state.boards.map(board => {
      if(board.uid == cardData.boardId) {
        board.lists = board.lists = board.lists.map(list => {
          if(list.uid === cardData.listId) {
            list.cards.push(cardData)
          }
          return list
        })
      }
      return board
    })
  },

  moveCard(state, data) {
    state.boards = state.boards.map(board => {
      if(board.uid == data.newColumn.boardId) {
        board.lists.splice(data.columnIndex, 1, data.newColumn)
      }
      return board
    })
  },

  removeList(state, list) {
    state.boards = state.boards.map(board => {
      if(board.uid == list.boardId) {
        board.lists.splice(board.lists.indexOf(list), 1)
      }
      return board
    })
  },

  removeBoardListCard(state, card) {
    state.boards = state.boards.map(board => {
      if(board.uid == card.boardId) {
        board.lists = board.lists = board.lists.map(list => {
          if(list.uid === card.listId) {
            list.cards.splice(list.cards.indexOf(card), 1)
          }
          return list
        })
      }
      return board
    })
  },

  updateCardInBoardList(state, card ) {
    state.boards = state.boards.map(board => {
      if(board.uid == card.boardId) {
        board.lists = board.lists = board.lists.map(list => {
          if(list.uid === card.listId) {
            list.cards = list.cards.map(c => {
              if(c.uid == card.uid) {
                return card
              }
              return c
            })
          }
          return list
        })
      }
      return board
    })
  },

  deleteBoard(state, board) {
    state.boards.splice(state.boards.indexOf(board), 1)
  }
}

const actions = {
  addBoard ({commit}, board) {
    commit('addBoard', {
      ...board,
      uid: board.uid || (Date.now()).toString()
    })
  },

  deleteBoard ({ commit }, board) {
    commit('deleteBoard', {
      ...board
    })
  },

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

  removeBoardListCard ({commit}, card) {
    commit('removeBoardListCard', card)
  },

  updateCardInBoardList ({commit}, cardDetails) {
    commit('updateCardInBoardList', cardDetails )
  }
}

const getters = {
  getBoards: (state) => () => {
    return state.boards
  },

  getBoardById: (state) => (id) => {
    return state.boards.filter(i => { return i.uid === id })[0]
  },

  getBoardListsById: (state) => (id) => {
    return state.boards.filter(i => { return i.uid === id })[0].lists 
  },

  getBoardListCardsyId: (state) => (boardId, listId) => {
    return state.boards.filter(i => { return i.uid === boardId })[0].lists
      .filter(list => { return list.uid === listId })[0].cards
  },
}

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})