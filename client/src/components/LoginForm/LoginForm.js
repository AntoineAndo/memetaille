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

function LoginForm() {

    const [formData, setFormData] = useReducer(formReducer, {});
    const [formError, setFormError] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        Auth.login(formData.email, formData.password, (err, user)=>{
            if(err) setFormError(err.message);
            else if(err == null && user) {
                setFormError('');
            }

        });
    }

    return (
        <>
            <h2>Login</h2>
            <div className={formContainer}>
                <form onSubmit={handleSubmit}>
                    <p>{formError}</p>
                    <fieldset>
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" onChange={setFormData}/>
                    </fieldset>
                    <fieldset>
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" onChange={setFormData}/>
                    </fieldset>
                    <button type="submit" className="submit">Login</button>
                </form>
            </div>
        </>
    )
}

export default LoginForm
