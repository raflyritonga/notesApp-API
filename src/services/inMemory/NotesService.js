const { nanoid } = require("nanoid")

class NotesService{
     constructor(){
          this._notes = []
     }

     addNote({title, body, tags}){
          const id = nanoid(16)
          const createAt = new Date().toISOString();
          const updateAt = createAt
     }

     newNote = {
          title, tags, body, id, createAt, updateAt
     }
}