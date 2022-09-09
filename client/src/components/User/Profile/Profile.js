import React,{useState} from 'react'
import {useQuery} from '@apollo/client'
import { GET_USER } from '../../../gql/user'
import {Grid,Image} from 'semantic-ui-react'
import ImageNoFound from '../../../assets/png/avatar.png'
import UserNotFound from '../../UserNotFound'
import ModalBasic from '../../Modal/ModalBasic'
import userAuth from '../../../hooks/useAuth'
import SettingsForm from '../SettingsForm'
import HeaderProfile from './HeaderProfile'
import AvatarForm from '../AvatarForm/AvatarForm'
import Followers from './Followers/Followers'
import './Profile.scss'

export default function Profile({username,totalPublications}) {

    const[showModal,setShowModal] = useState(false)
    const[titleModal,setTitleModal] = useState("")
    const[childrenModal,setChildrenModal] = useState(null)
    const{auth} = userAuth()
    const {data, loading, error,refetch} = useQuery(GET_USER,{
        variables:{username}
    })
    if(loading) return null
    if(error) return <UserNotFound/>
    const {getUser} = data
    console.log(auth.username)
    console.log(username)

    function handlerModal(type){
        switch (type) {
            case "avatar":
                setTitleModal('Cambiar foto de perfil');
                setChildrenModal(<AvatarForm setShowModal={setShowModal} auth={auth} />);
                setShowModal(true)
                break;     
            case 'settings':
                setTitleModal("")
                setChildrenModal(
                    <div>
                        <SettingsForm setShowModal={setShowModal} 
                        setTitleModal={setTitleModal} 
                        setChildrenModal={setChildrenModal}  
                        getUser={getUser} 
                        refetch={refetch}                  
                        />
                    </div>
                );
                setShowModal(true)
                break
            default:
                break;
        }
    }
  return (
    <>
        <Grid className='profile' >
            <Grid.Column width={5} className='profile__left'>
                <Image src={getUser.avatar ? getUser.avatar : ImageNoFound} avatar onClick={()=> username === auth.username && handlerModal("avatar")} />
            </Grid.Column>
            <Grid.Column width={11} className='profile__right'>
                <HeaderProfile getUser={getUser} auth={auth} handlerModal={handlerModal} /> 
                <Followers username={username} totalPublications={totalPublications} />
                <div className='other'>
                    <p className='name'>{getUser.name}</p>
                    {getUser.siteWeb &&(
                        <a href={getUser.siteWeb} className='siteWeb' target='_blank'>
                            {getUser.siteWeb}
                        </a>
                    )}
                    {getUser.description && (
                        <p className='description'>{getUser.description}</p>
                    )}
                </div>
            </Grid.Column>
        </Grid>
        <ModalBasic show={showModal} setShow={setShowModal} title={titleModal}>
            {childrenModal}
        </ModalBasic>
    </>
  )
}
