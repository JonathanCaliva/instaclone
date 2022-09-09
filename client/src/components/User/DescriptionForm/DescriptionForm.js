import React from 'react'
import { Form, TextArea,Button } from 'semantic-ui-react'
import { useFormik } from 'formik'
import *as Yup from 'yup'
import { useMutation } from '@apollo/client'
import { UPDATE_USER } from '../../../gql/user'
import { toast } from 'react-toastify'
import './DescriptionForm.scss'

export default function DescriptionForm({setShowModal,currentDescription,refetch}) {

    const [updateUser] = useMutation(UPDATE_USER)

    const formik = useFormik({
        initialValues:{
            description:currentDescription || ""
        },
        validationSchema:Yup.object({
            description:Yup.string().required()
        }),
        onSubmit:async(formValue) =>{
            try {
                await updateUser({
                    variables:{
                        input: formValue
                    }
                })
                refetch()
                setShowModal(false)
            } catch (error) {
                toast.error('Error al actualizar descripcion, intente nuevamente')
            }
        }
    })

  return (
    <Form className='description-form' onSubmit={formik.handleSubmit} >
        <TextArea
            name='description'
            onChange={formik.handleChange}
            value={formik.values.description}
            className={formik.errors.description && 'error'}
        />
        <Button type='submit' className='btn-submit' >Actualizar</Button>
        <Button type='button' className='btn-cancelar' onClick={()=>setShowModal(false)} >Cancelar</Button>
    </Form>
  )
}
