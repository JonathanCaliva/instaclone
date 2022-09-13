import React from 'react'
import { Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import {GET_NOT_FOLLOWEDS} from '../../../gql/follow'
import ImageNoFound from '../../../assets/png/avatar.png'
import { map } from 'lodash'
import './UsersNotFolloweds.scss'

export default function UsersNotFolloweds() {

    const {data,loading} = useQuery(GET_NOT_FOLLOWEDS)

    if(loading) return null

    const {getNotFolloweds} = data

  return (
    <div className='users-not-followeds'>
      <h3>Usuarios no seguidos</h3>
      {map(getNotFolloweds,(user,index)=>(
        <Link to={`/${user.username}`} className='users-not-followeds__user' key={index} >
            <Image src={user.avatar || ImageNoFound} avatar />
            <span> {user.name} </span>
        </Link>
      ))}
    </div>
  )
}
