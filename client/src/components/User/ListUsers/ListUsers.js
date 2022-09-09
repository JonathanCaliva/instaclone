import React from 'react'
import { size , map} from 'lodash'
import { Image } from 'semantic-ui-react'
import ImageNoFound from '../../../assets/png/avatar.png'
import {Link} from 'react-router-dom'
import './ListUsers.scss' 

export default function ListUsers({users,setShowModal}) {

    console.log(users)

  return (
    <div className='list-users'>
        {size(users) === 0 ?(
            <p className='list-users__not-users'>No se encontraron usuarios</p>
        ):(
            map(users, (user,index) => (
                <Link to={`/${user.username}`} onClick={() => setShowModal(false)}>
                <div key={index} className='list-users__user'>
                    <Image src={user.avatar? user.avatar : ImageNoFound} avatar />
                    <div>
                        <p>{user.name}</p>
                        <p>{user.username}</p>
                    </div>
                </div>
                </Link>
            ))
        )}
    </div>
  )
}
