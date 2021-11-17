import React from 'react'

import { useState, useReducer } from 'react'
import { formContainer } from  './LoginForm.module.scss';

import Auth from '../../_services/authentication.service';

const formReducer = (state, event) => {
    return {
        ...state,
        [event.target.name]: event.target.value
    }
}

function RegisterForm() {

    const [formData, setFormData] = useReducer(formReducer, {});
    const handleSubmit = (e)=>{
        e.preventDefault();
        console.log('submit');
    }

    return (
        <>
            <h2>Register</h2>
            <div className={formContainer}>
                <form onSubmit={handleSubmit}>
                    <fieldset>
                        <label htmlFor="email">Email address</label>
                        <input type="email" name="email" onChange={setFormData}/>
                    </fieldset>
                    <fieldset>
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" onChange={setFormData}/>
                    </fieldset>
                    <fieldset>
                        <label htmlFor="password-verification">Password verification</label>
                        <input type="password" name="password-verification" onChange={setFormData}/>
                    </fieldset>
                    <button type="submit" className="submit">Register</button>
                </form>
            </div>
        </>
    )
}

export default RegisterForm
