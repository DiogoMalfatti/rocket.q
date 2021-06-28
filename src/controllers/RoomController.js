const Database = require('../db/config')

module.exports = {
  //  ==> CRIAR SALA
  async create(req, res) {
    const db = await Database()
    const pass = req.body.password
    let roomId = ''
    let isRoom = true
    while (isRoom) {
      //  ==> GERAR NUMERO DA SALA
      for (var i = 0; i < 6; i++) {
        roomId += Math.floor(Math.random() * 10).toString()
      }
      //  *** GERAR NUMERO DA SALA
      //  ==> VERIFICAR SE O NUMERO DA SALA JA EXISTE
      const roomsExistIds = await db.all(`SELECT id FROM rooms`)
      isRoom = roomsExistIds.some(roomExistId => roomExistId === roomId)
      if (!isRoom) {
        //  ==> INSERIR SALA NO DB
        await db.run(`INSERT INTO rooms (
        id,
        pass
      )VALUES (
        ${parseInt(roomId)},
        ${pass}
      )`)
        //  *** INSERIR SALA NO DB
      }
    }
    //  *** VERIFICAR SE O NUMERO DA SALA JA EXISTE
    await db.close()
    res.redirect(`/room/${roomId}`)
    //  *** CRIAR SALA
  },
  //  ==> ABRIR SALA
  async open(req, res) {
    const db = await Database()
    const roomId = req.params.room
    const questions = await db.all(
      `SELECT * FROM questions WHERE room = ${roomId} and read = 0`,
    )
    const questionsRead = await db.all(
      `SELECT * FROM questions WHERE room = ${roomId} and read = 1`,
    )
    let isNoQuestions
    if (questions.length == 0) {
      if (questionsRead.length == 0) {
        isNoQuestions = true
      }
    }
    res.render('room', {
      roomId: roomId,
      questions: questions,
      questionsRead: questionsRead,
      isNoQuestions: isNoQuestions,
    })
    //  *** ABRIR SALA
  },
  //  ==> ENTRAR NA SALA
  enter(req, res) {
    const roomId = req.body.roomId

    res.redirect(`/room/${roomId}`)
  },
  //  *** ENTRAR NA SALA
}
