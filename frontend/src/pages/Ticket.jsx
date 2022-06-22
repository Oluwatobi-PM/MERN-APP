import {useSelector, useDispatch} from 'react-redux'
import {getTicket, reset} from '../features/tickets/ticketSlice'
import { BackButton } from '../components/BackButton'
import Spinner from '../components/Spinner'
import {useParams} from 'react-router-dom'
import { useEffect, useState } from 'react'
import {toast} from 'react-toastify'
import {getNotes, createNote, reset as notesReset} from '../features/notes/noteSlice'
import NoteItem from '../components/NoteItem'
import Modal from 'react-modal'
import {FaPlus} from 'react-icons/fa'

Modal.setAppElement('#root')

function Ticket() {
    const [modalIsopen, setModalIsOpen] = useState(false)
    const [noteText, setNoteText] = useState('')
    const {ticket, isLoading, isSuccess, isError, message} = useSelector((state) => state.tickets)


    const {notes, isLoading: notesIsLoading} = useSelector((state) => state.notes)

    const params = useParams()
    const dispatch = useDispatch()
    const {ticketId} = useParams()

    useEffect(() => {
        if(isError) {
            toast.error(message)
        }
        dispatch(getTicket(ticketId))
        dispatch(getNotes(ticketId))
    }, [isError, message, ticketId])

    //Open/Close modal
    const openModal = () => setModalIsOpen(true)
    const closeModal = () => setModalIsOpen(false)

    if(isLoading || notesIsLoading) {
      return <Spinner />
    }

    //Createnote submit
    const onNoteSubmit = (e) => {
      e.preventDefault()
      dispatch(createNote({noteText, ticketId}))
      closeModal()
    }

    if(ticket.status !== 'closed') {
    return (
      <>
        <button onClick={openModal} className='btn'> <FaPlus /> Add Note </button>
        <Modal isOpen={modalIsopen} onRequestClose={closeModal} contentLabel='Add Note' >
          <h2> Add Note </h2>
          <button className='btn-close' onClick={closeModal}> X </button>
          <form onSubmit={onNoteSubmit}>
            <div className='form-group'>
              <textarea
                name='noteText'
                id='noteText'
                className='form-control'
                placeholder='Note text'
                value={noteText}
                onChange = {(e) => setNoteText(e.taegt.value)}
              />
              <div className="form-group">
                <button className='btn' type='submit'>
                  Submit
                </button>
              </div>
            </div>
          </form>

        </Modal>
      </>
      )
    }
}

export default Ticket