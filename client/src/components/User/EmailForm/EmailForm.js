import React from 'react'
import {Form,Button} from 'semantic-ui-react'
import {useFormik} from 'formik'
import *as Yup from 'yup'
import { useMutation } from '@apollo/client'
import { toast } from 'react-toastify'
import { UPDATE_USER } from '../../../gql/user'
import './EmailForm.scss'

export default function EmailForm({currentEmail,setShowModal,refetch}) {

    const [updateUser] = useMutation(UPDATE_USER)

    const formik = useFormik({
        initialValues:{
            email: currentEmail || "",
        },
        validationSchema:Yup.object({
            email:Yup.string().email().required(),
        }),
        onSubmit:async(formValue)=>{
            try {
                await updateUser({
                    variables:{
                       input:formValue
                    }
                });
                refetch()
                setShowModal(false)
            } catch (error) {
                toast.error('Error al ingresar el correo electronico')
            }
        }
    })

  return (
    <Form className='email-form' onSubmit={formik.handleSubmit} >
        <Form.Input
            placeholder='Correo electronico'
            name='email'
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.errors.email && true}
        />
        <Button type='submit' className='btn-submit' >Actualizar</Button>
        <Button type='button' className='btn-cancelar' onClick={()=>setShowModal(false)} >Cancelar</Button>
    </Form>
  )
}

