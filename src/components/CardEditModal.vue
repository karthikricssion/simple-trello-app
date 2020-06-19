<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-body">
            <slot name="body">
              <div class="mdl-form-input">
                <input type="text" v-model="itemToEdit.title" placeholder="Give a title"/>
              </div>

              <div class="mdl-form-input">
                <textarea v-model="itemToEdit.description" placeholder="Give a description for the task"></textarea>
              </div>

              <div class="card-comments-container">
                <h5>Comments</h5>
                <div class="card-comments-inputs">
                  <div class="mdl-form-input">
                    <textarea v-model="comment" placeholder="Give a description for the task"></textarea>
                  </div>
                  <button class="btn btn-success" @click="addComment">Add Comment</button>
                </div>

                <div class="card-list-comments">
                  <div class="single-comment" v-for="(comment, index) in itemToEdit.comments" :key="index">
                    {{comment.text}}
                    <span class="commented-time">{{ comment.createdAt | moment("calendar") }}</span>
                  </div>
                </div>
              </div>
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <button class="btn delete-btn" @click="$emit('deleteCard');$emit('close')">
                <delete-icon fillColor="#c23b2d" :size="20" />
              </button>

              <button class="btn btn-link" @click="$emit('close')">Cancel</button>
              <button class="btn btn-primary" @click="updateContant()">Save</button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>

const newCommentObj = function(comment) {
  return {
    text: comment,
    createdAt: Date.now()
  }
}

export default {
  name: 'CardEditModal',
  props: ['itemToEdit', 'listIndex'],
  data() {
    return {
      comment: ''
    }
  },
  
  methods: {
    updateContant: function() {
      var self = this
      this.$store.dispatch('updateCardInList', {
        card: self.itemToEdit,
        listIndex: self.listIndex
      })
      this.$emit('close')
    },

    addComment: function() {
      var comment = this.comment.trim()
      if(comment) {
        this.itemToEdit.comments.push(newCommentObj(comment))
        this.comment = ''
      } else {
        console.log('Dude, u need have a look at the list')
      }
    }
  }
}
</script>

<style lang="less">
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 600px;
  margin: 0px auto;
  background-color: #e2e4e6;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;

  button {
    text-transform: uppercase;
    font-size: 11px;
    font-weight: 400;
    margin-right: 8px;;
  }

  .modal-footer {
    .btn-link {
      color: #4d4d4d;
      text-decoration: none;
    }
  }
}

.modal-footer {
  position: relative;

  .delete-btn {
    position: absolute;
    left: 0;
    margin: 0;
  }
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-default-button {
  float: right;
}

.modal-body {
  max-height: 500px;
  overflow-y: auto;

  .mdl-form-input {
    margin-bottom: 10px;

    input[type="text"] {
      font-size: 14px;
      font-weight: 400;
      line-height: 1.3;
      background-color: #fff;
      padding: 8px;
      color: #4d4d4d;
      border: 0;
      border-bottom: 1px solid #ccc;
      border-radius: 3px;
      outline: 0 !important;
      resize: none;
      width: 100%;
    }

    textarea {
      font-size: 14px;
      font-weight: 400;
      line-height: 1.3;
      background-color: #fff;
      padding: 8px;
      color: #4d4d4d;
      border: 0;
      border-bottom: 1px solid #ccc;
      border-radius: 3px;
      outline: 0 !important;
      resize: none;
      width: 100%;
    }
  }

  .card-comments-container {
    width: 70%;

    .card-comments-inputs {
      
    }
  }

  .single-comment {
    padding: 8px;
    margin-top: 8px;
    background-color: #cccccc;
    border-radius: 5px;
    padding-bottom: 16px;
    font-size: 14px;
    position: relative;

    .commented-time {
      position: absolute;
      bottom: 0;
      font-size: 10px;
      right: 8px;
      padding: 4px;
    }
  }
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

</style>
