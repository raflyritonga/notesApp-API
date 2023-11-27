// file ini bertanggung jawab untuk mengelola resoutce notes yang disimpan pada memory (array)
const {nanoid} =  require('nanoid')
const InvariantError = require('../../exception/InvariantError')
const NotFoundError = require('../../exception/NotFoundError')

class NotesService{
     constructor(){
          this._notes = []
     }

     // Add note logic
     addNote({title, body, tags}){
          const id = nanoid(16)
          const createAt = new Date().toISOString()
          const updateAt = createAt
     
          const newNote = {
               title, tags, body, id, createAt, updateAt
          }
          this._notes.push(newNote)
          const isSuccess = this._notes.filter((note) => note.id === id).length > 0
          if (!isSuccess) {
               throw new InvariantError('Catatan gagal ditambah')
          }
          return id
     }

     // Get all notes logic
     getNotes(){
          return this._notes
     }

     // Get a note by id logic
     getNoteById(id) {
          const note = this._notes.filter((n) => n.id === id)[0]
          if (!note){
               throw new NotFoundError('Catatan tidak ditemukan')
          }
          return note
     }

     // Edit a note by id logic
     editNoteById(id, {title, body, tags}){
          // looking for the index
          const index = this._notes.findIndex((note) => note.id === id)
          
          // checking wheter index is found or not
          if (index === -1){
               throw new NotFoundError ('Gagal memperbarui catatan. Id tidak ditemukan')
          }

          // if index is found do some logic to edit the note
          const updateAt = new Date().toISOString
          this._notes[index] = {
               ...this._notes[index],
               title,
               tags,
               body,
               updateAt,
          }
     }

     // Delete a note by Id logic
     deleteNoteById(id) {
          const index = this._notes.findIndex((note) => note.id === id);
          if (index === -1) {
            throw new NotFoundError ('Catatan gagal dihapus. Id tidak ditemukan');
          }
          this._notes.splice(index, 1);
        }
}

module.exports = NotesService