import React from 'react'
import { useParams } from 'react-router-dom'
import Profile from '../components/User/Profile'
import { GET_PUBLICATIONS } from '../gql/publication'
import {size} from 'lodash'
import { useQuery } from '@apollo/client'

export default function User() {
  const {username} = useParams()

  const {data,loading} = useQuery(GET_PUBLICATIONS,{
    variables:{username}
  })

  if(loading) return null

  const {getPublications} = data


  return (
    <>
      <Profile username={username} totalPublications={size(getPublications)} />
    </>
  )
}
