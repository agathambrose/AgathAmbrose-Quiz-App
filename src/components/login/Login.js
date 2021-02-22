import React from 'react'
import { Link } from 'react-router-dom'
import './Login.css'
import { Logo } from '../logo/Logo'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'


const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Required!'),
    password: Yup.string().min(6, 'Must be at least 6 characters long').required('Required!')
})

const Login = () => {
    return (
        <div className='form_container'>
            <Formik
                initialValues = {{
                    email: '',
                    password: '',
                }}
                validationSchema = { LoginSchema }
                onSubmit = {values => {
                    console.log(values);
                }}
            >
                {({ errors, touched }) => (
                    <Form className='form__ctn'>
                        <ul>
                            <div className='lg_reg'>
                                <Link to = '/'>
                                    <Logo/>
                                </Link>
                            </div>
                        
                            <div className='lg_phr'>
                                <h3 className='head-lg__phr'>LOGIN</h3>
                            </div>

                            <div>
                                <div>
                                    <li>
                                    <Field name = 'email'>
                                        {({field}) =>
                                        <input {...field} type='email' placeholder='Email Address' className='input_area'/>
                                    }
                                    </Field>
                                    {errors.email && touched.email ? (
                                        <div style = {{color: 'red', marginBottom: '10px'}}>{errors.email}</div>
                                    ) : null}
                                    </li>
                                    
                                    <li>
                                    <Field name = 'password'>
                                        {({field}) =>
                                        <input {...field} type='password' placeholder='Password' className='input_area'/>
                                    }
                                    </Field>
                                    {errors.password && touched.password ? (
                                        <div style = {{color: 'red'}}>{errors.password}</div>
                                    ) : null}
                                    </li>
                                </div>

                                <div className='btn_s'>
                                    <Link to = '/QuizLandnPg'>
                                        <button type='submit' className='lg_ac'>Login</button>
                                    </Link>
                                </div>

                                <div>
                                    <small>
                                        Already have an account? <Link to = '/register'>Sign up</Link>
                                    </small>
                                </div>
                            </div>
                        </ul>   
                    </Form>
                )}
                
            </Formik>
            
            
        </div>
    )
}

export default Login
