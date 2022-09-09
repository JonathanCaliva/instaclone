import React from 'react'
import { Button, Form } from 'semantic-ui-react'
import { useFormik } from 'formik'
import { useMutation } from '@apollo/client'
import { UPDATE_USER } from '../../../gql/user'
import *as Yup from 'yup'
import './SitioWebForm.scss'
import { toast } from 'react-toastify'

export default function SitioWebForm({setShowModal,currentSitioWeb,refetch}) {

    const [updateUser] = useMutation(UPDATE_USER)

    const formik = useFormik({
        initialValues:{
            siteWeb:currentSitioWeb || ''
        },
        validationSchema:Yup.object({
            siteWeb:Yup.string().required()
        }),
        onSubmit:async(formValue)=>{
            try {
              await updateUser({
                variables:{
                    input:formValue
                }
              })
              refetch()
              setShowModal(false)
            } catch (error) {
                toast.error('Error al ingresar nuevo sitio web')
            }
        }
    })

  return (
    <Form className='sitioWeb-form' onSubmit={formik.handleSubmit}>
        <Form.Input
            placeholder='URL web'
            name='siteWeb'
            value={formik.values.siteWeb}
            onChange={formik.handleChange}
            error={formik.errors.siteWeb && true}
        />
        <Button type='submit' className='btn-submit' >Actualizar</Button>
        <Button type='button' className='btn-cancelar' onClick={()=>setShowModal(false)} >Cancelar</Button>
    </Form>
  )
}
