import React from 'react'
import {Button} from 'semantic-ui-react'
import { IS_FOLLOW,FOLLOW,UNFOLLOW} from '../../../../gql/follow'
import { useQuery,useMutation } from '@apollo/client'
import './HeaderProfile.scss'

export default function HeaderProfile({getUser,auth,handlerModal}) {
  
  const [follow] = useMutation(FOLLOW)
  const [unfollow] = useMutation(UNFOLLOW)

  const {data,loading,refetch} = useQuery(IS_FOLLOW,{
    variables:{
      username:getUser.username
    }
  })

  function buttonFollow(){
    if(data.isFollow){
      return(
        <Button className='btn-danger' onClick={()=> unFollow()} >Dejar de seguir</Button>
      )
    }else{
      return(
        <Button className='btn-action' onClick={()=> onFollow()} >Seguir</Button>
      )
    }
  }

  async function onFollow(){
    try {
      await follow({
        variables:{
          username:getUser.username
        }
      })
      refetch()
    } catch (error) {
      console.log(error)
    }
  }

  async function unFollow(){
    try {
      await unfollow({
        variables:{
          username:getUser.username
        }
      })
      refetch()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='header-profile'>
      <h2>{getUser.username}</h2>
      {getUser.username === auth.username?(

      <Button onClick={()=> handlerModal("settings")} >Ajustes</Button>
      ):(
        !loading && buttonFollow()
      )
      }
    </div>
  )
}
