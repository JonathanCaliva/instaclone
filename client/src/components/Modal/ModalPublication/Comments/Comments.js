import React,{useEffect} from 'react'
import { useQuery } from '@apollo/client'
import { GET_COMMENTS } from '../../../../gql/comment'
import { Image } from 'semantic-ui-react'
import { map } from 'lodash'
import ImageNoFound from '../../../../assets/png/avatar.png'
import {Link} from 'react-router-dom'
import './Comments.scss'

export default function Comments({publication}) {

  const {data,loading,startPolling,stopPolling} = useQuery(GET_COMMENTS,{
    variables:{
      idPublication:publication.id
    }
  })

  useEffect(()=>{
    startPolling(1000)

    return ()=>{
      stopPolling()
    }
  },[startPolling,stopPolling])

  if(loading) return null
 
  const {getComment} = data


  return (
    <div className='comments'>
      {map(getComment,(comment,index)=>(
        <Link to={`/${comment.idUser.username}`} key={index} className='comment' >
          <Image src={comment.idUser.avatar || ImageNoFound} avatar />
          <div>
            <p> {comment.idUser.username} </p>
            <p> {comment.comment} </p>
          </div>
        </Link>
      ))}
    </div>
  )
}
