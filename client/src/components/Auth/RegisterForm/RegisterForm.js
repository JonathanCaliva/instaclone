import React from 'react'
import {Form, Button} from 'semantic-ui-react'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import {toast} from 'react-toastify'
import { useMutation } from "@apollo/client";
import { REGISTER } from "../../../gql/user";
import './RegisterForm.scss'

export default function RegisterForm({setShowLogin}) {

    

    const [register] = useMutation(REGISTER);

    const formik = useFormik({
        initialValues:initialValues(),
        validationSchema:Yup.object({
            name: Yup.string()
                     .required('Tu nombre es obligatorio'),
            username: Yup.string()
                    .matches(/^[a-zA-Z0-9-]*$/, "El nombre del usuario no puede tener espacios")
                    .required("El nombre del usuario es obligatorio"),
            email: Yup.string()
                    .email("El email no es valido")
                    .required("El email es obligatorio"),
            password:Yup.string().required("La contraseña es obligatoria").oneOf([Yup.ref('repeatpassword')], 'Las contraseñas no son iguales'),
            repeatpassword: Yup.string().required("La contraseña es obligatoria").oneOf([Yup.ref('password')], 'Las contraseñas no son iguales'),
        }),

        onSubmit: async (formData) => {
            try {
              const newUser = formData;
              delete newUser.repeatpassword;
      
              await register({
                variables: {
                  input: newUser,
                },
              });

              toast.success('Usuario registrado correctamente');
              setShowLogin(false);
            } catch (error) {
              toast.error(error.message);
              console.log(error);
            }
          },
        });


  return (
    <>
      <h2 className='register-form-title'>Registrate para ver fotos y videos de tus amigos</h2>
      <Form className='register-form' onSubmit={formik.handleSubmit}>
        <Form.Input 
            type='text' 
            placeholder='Nombre y apellidos' 
            name='name' value={formik.values.name} 
            onChange={formik.handleChange} 
            error={formik.errors.name && true}             
        />
        <Form.Input 
            type='text' 
            placeholder='Nombre de usuario' 
            name='username' value={formik.values.username} 
            onChange={formik.handleChange} 
            error={formik.errors.username && true}
        />
        <Form.Input 
            type='text' 
            placeholder='Correo Electronico' 
            name='email' 
            value={formik.values.email} 
            onChange={formik.handleChange} 
            error={formik.errors.email && true}
        />
        <Form.Input 
            type='password' 
            placeholder='Contraseña' 
            name='password' 
            value={formik.values.password} 
            onChange={formik.handleChange} 
            error={formik.errors.password && true}
        />
        <Form.Input 
            type='password' 
            placeholder='Repetir contraseña' 
            name='repeatpassword' 
            value={formik.values.repeatpassword} 
            onChange={formik.handleChange} 
            error={formik.errors.repeatpassword && true}
        />
        <Button type='submit' className='btn-submit'>Registarse</Button>
        {/* <Button onClick={formik.handleReset} type='button'>Reset</Button> */} 
      </Form>
    </>
  )
}

function initialValues(){
    return{
        name:"",
            username:"",
            email:"",
            password:"",
            repeatpassword:"",
    }
}
