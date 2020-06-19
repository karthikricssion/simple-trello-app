const boards = [
  {
    uid: '1',
    title: 'Getting started',
    lists: [
      {
        uid: '11',
        boardId: '1',
        data: 'How to use',
        cards: [
          {
            boardId: '1',
            listId: '11',
            uid: '114',
            title: '',
            description: 'Click the list title to edit',
            comments: [
              
            ]
          },
          {
            boardId: '1',
            listId: '11',
            uid: '115',
            title: '',
            description: 'The board name shown above is also editable',
            comments: [
              
            ]
          },
          {
            boardId: '1',
            listId: '11',
            uid: '111',
            title: '',
            description: 'This is a sample card',
            comments: [
              
            ]
          },
          {
            boardId: '1',
            listId: '11',
            uid: '112',
            title: 'You can give a title for this card any time',
            description: 'Click me to get to know the details of this card',
            comments: [
              {
                text: 'You can use the text box above me to add another comment',
                createdAt: Date.now()
              },
              {
                text: 'This is a sample content',
                createdAt: Date.now()
              }
            ]
          },
          {
            boardId: '1',
            listId: '11',
            uid: '113',
            title: '',
            description: 'You can click the add card link below each list to add new task ',
            comments: [
              {
                text: 'This is a sample content',
                createdAt: Date.now()
              }
            ]
          }
        ]
      },
      {
        uid: '12',
        boardId: '1',
        data: 'How to use drag and drop',
        cards: [
          {
            boardId: '1',
            listId: '12',
            uid: '121',
            title: '',
            description: 'Just click & hold, drag me to left outside list',
            comments: [
              
            ]
          },
          {
            boardId: '1',
            listId: '12',
            uid: '122',
            title: '',
            description: 'Click and drag me below to sort inside list',
            comments: [
              
            ]
          },
          {
            boardId: '1',
            listId: '12',
            uid: '123',
            title: '',
            description: 'I am here for experimental purpose',
            comments: [
              
            ]
          }
        ]
      }
    ]
  }
]

export default boards