import React from 'react'
import {Button} from 'semantic-ui-react'
import {useHistory} from 'react-router-dom'
import {useApolloClient} from '@apollo/client'
import PasswordForm from '../PasswordForm'
import EmailForm from '../EmailForm/EmailForm'
import useAuth from '../../../hooks/useAuth'
import DescriptionForm from '../DescriptionForm'
import SitioWebForm from '../SitioWebForm/SitioWebForm'
import './SettingsForm.scss'

export default function SettingsForm({setShowModal,setTitleModal,setChildrenModal,getUser,refetch}) {

  const {logout} = useAuth()
  const history = useHistory()
  const client = useApolloClient()

  function onLogout(){
    client.clearStore();
    logout();
    history.push('/')   
  }

  function onChangePassword(){
    setTitleModal('Cambiar tu contraseña');
    setChildrenModal(<PasswordForm onLogout={onLogout} setShowModal={setShowModal} />)
  }

  function onChangeEmail(){
    setTitleModal('Cambiar tu email')
    setChildrenModal(<EmailForm  setShowModal={setShowModal} currentEmail={getUser.email} refetch={refetch} />)
  }

  function onChangeDescription(){
    setTitleModal('Actualizar tu biografia')
    setChildrenModal(<DescriptionForm setShowModal={setShowModal} currentDescription={getUser.description} refetch={refetch} />)
  }

  function onChangeSiteWeb(){
    setTitleModal('Actualizar tu sitio web')
    setChildrenModal(<SitioWebForm setShowModal={setShowModal} currentSitioWeb={getUser.siteWeb} refetch={refetch} />)
  }
  return (
    <div className='settings-form'>
      <Button onClick={() => onChangePassword()} >Cambiar contraseña</Button>
      <Button onClick={()=> onChangeEmail()} >Cambiar email</Button>
      <Button onClick={() => onChangeDescription()} >Descripcion</Button>
      <Button onClick={()=> onChangeSiteWeb()} >Sitio web</Button>
      <Button onClick={() => onLogout()} >Cerrar sesion</Button>
      <Button onClick={()=> setShowModal(false)} >Cancelar</Button>
    </div>
  )
}
