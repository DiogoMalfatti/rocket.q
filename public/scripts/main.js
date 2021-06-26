import Modal from './modal.js'
const modal = Modal()

const modalTitle = document.querySelector('.modal h2')
const modalDescription = document.querySelector('.modal p')
const modalButton = document.querySelector('.modal button')

// ==>  LÓGICA HANDLE CLICK
function handleClick(event, check = true) {
  event.preventDefault()

  const roomId = document.querySelector('#room-id').dataset.id
  const form = document.querySelector('.modal form')
  const questionId = event.target.dataset.id
  const slug = check ? 'check' : 'delete'
  form.setAttribute('action', `/question/${roomId}/${questionId}/${slug}`)

  const text = check ? 'Marcar como lida' : 'Excluir'
  modalTitle.innerHTML = `${text} esta pergunta`
  modalDescription.innerHTML = `Tem certeza que você deseja ${text.toLowerCase()} esta pergunta ?`
  modalButton.innerHTML = `Sim, ${text.toLowerCase()}`
  check ? modalButton.classList.remove('red') : modalButton.classList.add('red')
  modal.open()
}
// *** LÓGICA HANDLE CLICK

// ==> MODAL MARCAR COMO LIDA
const checkButtons = document.querySelectorAll('.actions a.check')

checkButtons.forEach(button => {
  button.addEventListener('click', handleClick)
})
// *** MODAL MARCAR COMO LIDA

// ==> MODAL DELETAR
const deleteButton = document.querySelectorAll('.actions a.delete')

deleteButton.forEach(button => {
  button.addEventListener('click', event => handleClick(event, false))
})
// *** MODAL DELETAR

// ==> MODAL CANCELAR
const cancelButton = document.querySelectorAll('.button.cancel')

cancelButton.forEach(button => {
  button.addEventListener('click', event => {
    modal.close()
  })
})
// *** MODAL CANCELAR
