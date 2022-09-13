import React, {useState, useEffect} from 'react'
import {useQuery} from '@apollo/client'
import Actions from '../../Modal/ModalPublication/Actions'
import ComentForm from '../../Modal/ModalPublication/CommentForm'
import ModalPublication from '../../Modal/ModalPublication'
import {map} from 'lodash'
import { Image } from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import {GET_PUBLICATIONS_FOLLOWEDS} from '../../../gql/publication'
import ImageNoFound from '../../../assets/png/avatar.png'
import './Feed.scss'

export default function Feed() {

    const {data,loading, startPolling,stopPolling} = useQuery(GET_PUBLICATIONS_FOLLOWEDS)
    const [showModal,setShowModal] = useState(false)
    const [publicationSelect, setPublicationSelect] = useState(null)

    useEffect(()=>{
      startPolling(1000)
      return ()=>{
        stopPolling()
      }
    },[startPolling,stopPolling])

    if(loading) return null

    const {getPublicationsFollowers} = data

    function openPublication(publication){
      setPublicationSelect(publication)
      setShowModal(true)
    }

  return (
    <>
      <div className='feed'>
        {map(getPublicationsFollowers,(publication,index) =>(
          <div key={index} className='feed__box' >
              <Link to={`/${publication.idUser.username}`}>
                <div className='feed__box-user'>
                  <Image src={publication.idUser.avatar || ImageNoFound} avatar />
                  <span> {publication.idUser.name} </span>
                </div>
              </Link>
              <div
                className='feed__box-photo'
                style={{backgroundImage:`url("${publication.file}")`}}
                onClick={()=> openPublication(publication)}
              />
              <div className='feed__box-actions'>
                <Actions publication={publication}/>
              </div>
              <div className='feed__box-form'>
                <ComentForm publication={publication} />
              </div>
          </div>
        ))}
      </div>
      {showModal && (
        <ModalPublication show={showModal} setShow={setShowModal} publication={publicationSelect} />
      )}
    </>
  )
}
