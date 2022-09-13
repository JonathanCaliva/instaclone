import React,{useState} from 'react'
import { Icon } from 'semantic-ui-react'
import { useMutation, useQuery } from '@apollo/client'
import { ADD_LIKE,IS_LIKE, DELETE_LIKE,COUNT_LIKES } from '../../../../gql/like'
import './Actions.scss'

export default function Actions({publication}) {

    const [addLike] = useMutation(ADD_LIKE)
    const [deleteLike] = useMutation(DELETE_LIKE)
    const [loadingAction, setLoadingAction] = useState(false)

    
    const {data,loading,refetch} = useQuery(IS_LIKE,{
        variables:{
            idPublication: publication.id
        }
    })

    const {data: dataCount,loading:loadingCount, refetch : refetchCount} = useQuery(COUNT_LIKES,{
        variables:{
            idPublication: publication.id
        }
    })


    async function onAddLike(){
        setLoadingAction(true)
        try {
            await addLike({
                variables:{
                    idPublication: publication.id
                }
            })
            refetch()
            refetchCount()
        } catch (error) {
            console.log(error)
        }
        setLoadingAction(false)
    }

    if(loading || loadingCount) return null
    const {isLike} = data

    const {countLikes} = dataCount

    async function onDeleteLike(){
        setLoadingAction(true)
        try {
            await deleteLike({
                variables:{
                    idPublication: publication.id
                }
            })
            refetch()
            refetchCount()
        } catch (error) {
            console.log(error)
        }
        setLoadingAction(false)
    }

    function onAction(){
        if(!loadingAction){
            if(isLike){
                onDeleteLike()
            }else{
                onAddLike()
            }
        }
    }

  return (
    <div className='action'>
      <Icon 
        className={isLike ? 'like active' : 'like'}
        name={isLike ? 'heart' : 'heart outline'}
        onClick={() => onAction()}
       />
       {countLikes} {countLikes === 1 ? 'Like' : 'Likes'}
    </div>
  )
}
