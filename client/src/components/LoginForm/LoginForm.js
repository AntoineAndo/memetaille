import React, { useState, useReducer } from 'react'
import { useNavigate } from 'react-router-dom';
import { formContainer } from  './LoginForm.module.scss';

import { useAuth } from '../../providers/ProvideAuth';

const formReducer = (state, event) => {
    return {
        ...state,
        [event.target.name]: event.target.value
    }
}


function LoginForm() {

    //Context and hooks
    const auth = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useReducer(formReducer, {});
    const [formError, setFormError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        auth.login(formData.email, formData.password, (err, user)=>{
            if(err) setFormError(err.message);
            else if(err == null && user) {
                setFormError('');
                navigate('/');
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
