import React from 'react'
import { Modal, Grid } from 'semantic-ui-react'
import CommentForm from './CommentForm/CommentForm'
import Comments from './Comments/Comments'
import Actions from './Actions/Actions'
import './ModalPublication.scss'

export default function ModalPublication({show, setShow, publication}) {

    function onClose(){
        setShow(false)
    }

  return (
    <Modal open={show} onClose={onClose} className='modal-publications' >
        <Grid>
            <Grid.Column className='modal-publications__left' width={10} style={{backgroundImage:`url('${publication.file}')`}} />
            <Grid.Column className='modal-publications__right' width={6} >
                <Comments publication={publication} />
                <Actions publication={publication} />
                <CommentForm publication={publication} />
            </Grid.Column>
        </Grid>
    </Modal>
  )
}
