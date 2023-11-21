// const { nanoid } = require ('nanoid');
const notes = require('./notes');


const getWelcomHandler = (request, h) => {
  const response = h.response({
    status: 'success',
    message: 'Selamat datang di Notes App API',
  });
  response.code(200);
  return response;
}

// tambah data
const addNoteHandler = (request, h) => {
  const { title, tags, body } = request.payload;
  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;
  const newNote = {
    title, tags, body, id, createdAt, updatedAt,
  };
  notes.push(newNote);
  const isSuccess = notes.filter((note) => note.id === id).length > 0;
  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil ditambahkan',
      data: {
        noteId: id,
      },
    });
    response.code(201);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal ditambahkan',
  });
  response.code(500);
  return response;
};

// menampilkan semua data
const getAllNotesHandler = () => ({
  status: 'success',
  data: {
    notes,
  },
});

// menampilkan data spesifik
const getNoteByIdHandler = (request, h) => {
  // mengambil id dari data yang diklik
  const { id } = request.params;
  // mendapatkan data sesuai dengan id yang diambil
  const note = notes.filter((n) => n.id === id)[0];
  // cek apakah datanya ada atau tidak
  if (note !== undefined) {
    return {
      status: 'success',
      data: {
        note,
      },
    };
  }
  const response = h.response({
    status: 'fail',
    message: 'Catatan tidak ditemukan',
  });
  response.code(404);
  return response;
};

// mengubah data
const editNoteByIdHandler = (request, h) => {
  const { id } = request.params;
  const { title, tags, body } = request.payload;
  const updatedAt = new Date().toISOString();
  // mendapatkan index catatan yang ingin di edit, jika ditemukan kembalian nilainya adalah index catatan, jika tidak kembaliannya adalah -1
  const index = notes.findIndex((note) => note.id === id);
  if (index !== -1) {
    notes[index] = {
      // Spread operator di bawah ini untuk mempertahankan nilai notes[index] yang tidak perlu diubah
      ...notes[index],
      title,
      tags,
      body,
      updatedAt,
    };
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil diperbarui',
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui catatan. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

// menghapus catatan
const deleteNoteByIdHandler = (request, h) => {
  const { id } = request.params;
  const index = notes.findIndex((note) => note.id === id);
  // mengecek bahwa catatan yang ingin di hapus itu ada
  if (index !== -1) {
    notes.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil dihapus',
    });
    response.code(200);
    return response;
  }
  // bila catatan tidak ada maka kembalikan dengen ini
  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

module.exports = {
  getWelcomHandler,
  addNoteHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  editNoteByIdHandler,
  deleteNoteByIdHandler,
};
