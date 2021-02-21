import React from 'react'
import { Link } from 'react-router-dom'
import './Register.css'
import { Logo } from '../logo/Logo'
import './Register.css'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'


const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required!'),
    lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required!'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(6, 'Must be at least 6 characters long').required('Required!'),
    confirm_password: Yup.string().oneOf([Yup.ref('password'), null], 'Password must be the same').required('Required!'),
});

const Register = () => {
    return (
        <div className='form__container'>
            <Formik
                initialValues = {{
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: '',
                    confirm_password: '',
                }}
                validationSchema = {RegisterSchema}
                onSubmit = {values => {
                    console.log(values);
                }}
                >

                    {({ errors, touched }) => (
                        <Form className='form-ctn'>
                            <ul>
                                <div className='lg__reg'>
                                    <Link to = '/'>
                                        <Logo/>
                                    </Link>
                                </div>
                            
                                <div className='reg__phr'>
                                    <h3 className='head-reg__phr'>REGISTER</h3>
                                </div>

                                <div>
                                    <div className = 'cls__sect'>
                                        <div>
                                            <li>
                                                <Field name='firstName'>
                                                    {({ field }) => 
                                                
                                                    <input {...field} type='text' placeholder='First Name' className='first__nm'/>
                                                }                  
                                                </Field>
                                                {errors.firstName && touched.firstName ? (
                                                        <div style = {{color: 'red'}}>{errors.firstName}</div>
                                                    ) : null}
                                            </li>
                                        </div>
                                        
                                        <div>
                                            <li>
                                                <Field name = 'lastName'>
                                                    {({field}) => 
                                                    <input {...field} type='text' placeholder='Last Name' className='last__nm'/>
                                                }
                                                </Field>
                                                {errors.lastName && touched.lastName ? (
                                                    <div style = {{color: 'red', marginLeft: '6px'}}>{errors.lastName}</div>
                                                ) : null}
                                            </li>
                                        </div>
                                    </div>
                                    
                                    

                                    <div>
                                    <li>
                                    <Field name = 'email'>
                                        {({field}) => 
                                        <input {...field} type='email' placeholder='Email Address' className='input__area'/>
                                    }
                                    </Field>
                                    {errors.email && touched.email ? (
                                        <div style = {{color: 'red'}}>{errors.email}</div>
                                    ) : null}
                                    </li>
                                    
                                    <li>
                                    <Field name = 'password'>
                                        {({field}) => 
                                        <input {...field} type='password' placeholder='Password' className='input__area'/>
                                    }
                                    </Field>
                                    {errors.password && touched.password ? (
                                        <div style = {{color: 'red'}}>{errors.password}</div>
                                    ) : null}
                                    </li>

                                    <li>
                                    <Field name = 'confirm_password'>
                                        {({field}) =>
                                        <input {...field} type='password' placeholder='Confirm Password' className='input__area'/>
                                    }
                                    </Field>
                                    {errors.confirm_password && touched.confirm_password ? (
                                        <div style = {{color: 'red'}}>{errors.confirm_password}</div>
                                    ) : null}
                                    </li>
                                    </div>

                                    <div className='btn__s'>
                                        <Link to = '/QuizLandnPg'>
                                        <button type='submit'
                                        className='create__acc'>Create Account</button>
                                        </Link>

                                        <a href = 'https://web.facebook.com'>
                                            <button className='reg__fb'>Register with Facebook</button>
                                        </a>
                                        
                                    </div>

                                    <div>
                                        <small>
                                        Already have an account? <Link to = '/login'>Sign in</Link>
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

export default Register
