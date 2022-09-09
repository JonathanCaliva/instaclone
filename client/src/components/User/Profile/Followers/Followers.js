import React,{useEffect, useState} from 'react'
import {useQuery} from '@apollo/client'
import ModalBasic from '../../../Modal/ModalBasic'
import {GET_FOLLOWERS, GET_FOLLOWEDS} from '../../../../gql/follow'
import ListUsers from '../../ListUsers'
import {size} from 'lodash'
import './Followers.scss'

export default function Followers({username,totalPublications}) {

  const [showModal,setShowModal] = useState(false) 
  const [titleModal, setTitleModal] = useState("")
  const [childrenModal,setChildrenModal] = useState(null)

  const {
    data : dataFolloweds,
    loading : loadingFolloweds,
    startPolling : startPollingFolloweds,
    stopPolling : stopPollingFolloweds 
  } = useQuery(GET_FOLLOWEDS,{
    variables:{
      username:username
    }
  })

  const {
    data : dataFollowers,
    loading : loadingFollowers,
     startPolling : startPollingFollowers ,
     stopPolling: stopPollingFollowers} = useQuery(GET_FOLLOWERS,{
    variables:{
      username: username
    }
  })

  useEffect(()=>{
    startPollingFollowers(1000);
    return ()=>{
      stopPollingFollowers()
    }
  },[startPollingFollowers,stopPollingFollowers])

  useEffect(()=>{
    startPollingFolloweds(1000);
    return ()=>{
      stopPollingFolloweds()
    }
  },[startPollingFolloweds,stopPollingFolloweds])

  function openFollowers(){
    setTitleModal('Seguidores');
    setChildrenModal(<ListUsers users={getFollowers} setShowModal={setShowModal} />);
    setShowModal(true)
  }

  function openFolloweds(){
    setTitleModal('Seguidos');
    setChildrenModal(<ListUsers users={getFolloweds} setShowModal={setShowModal} />);
    setShowModal(true)
  }

  if(loadingFollowers || loadingFolloweds) return null

  const {getFollowers} = dataFollowers
  const {getFolloweds} = dataFolloweds

  return (
    <>
    <div className='followers' >
        <p>
            <span>{totalPublications}</span> Publicaciones
        </p>
        <p className='link'  onClick={()=>openFollowers()}>
            <span> {size(getFollowers)} </span> Seguidores
        </p>
        <p className='link' onClick={()=> openFolloweds()}>
            <span> {size(getFolloweds)} </span> Seguidos
        </p>
    </div>
    <ModalBasic show={showModal} setShow={setShowModal} title={titleModal}>
      {childrenModal}
    </ModalBasic>
    </>
  )
}
