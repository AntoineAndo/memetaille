import { useState, useReducer } from 'react'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { formContainer } from './ProfilePopup.module.scss'

import UseUserService from '../../_services/user.service';

const formReducer = (state, event) => {
    return {
        ...state,
        [event.target.name]: event.target.value
    }
}

function ProfilePopup({auth, user, open, edit, closeModal}) {

    const [formData, setFormData] = useReducer(formReducer, {
        "username": user.username,
        "status": user.status,
    });
    const [formError, setFormError] = useState("");
    const userService = UseUserService();

    const handleSubmit = (e) => {
        e.preventDefault();
        userService.updateUser(user._id, formData, (data)=>{
            if(data.ok == true){
                user.username = formData.username;
                user.status = formData.status;
                auth.updateLoggedUser(user);
                closeModal();

            }
        })
    }

    if(edit == "true") {
        return (
            <Popup open={open} closeOnDocumentClick onClose={closeModal}>
                <div className="modal">
                    <a className="close" onClick={closeModal}>&times;</a>
                    <div className={formContainer}>
                        <form onSubmit={handleSubmit}>
                            <p>{formError}</p>
                            <fieldset>
                                <label htmlFor="username">Username</label>
                                <input type="text" name="username" value={formData.username} onChange={setFormData}/>
                            </fieldset>
                            <fieldset>
                                <label htmlFor="status">Status</label>
                                <input type="text" name="status" value={formData.status} onChange={setFormData}/>
                            </fieldset>
                            <button type="submit" className="submit">Save changes</button>
                        </form>
                    </div>
                </div>
            </Popup>
        )
    }else{
        return (
            <Popup open={open} closeOnDocumentClick onClose={closeModal}>
                <div className="modal">
                    <a className="close" onClick={closeModal}>&times;</a>
                    <p>Username: {user.username}</p>
                    <p>Height: {user.height}</p>
                    <p>Status: {user.status}</p>
                </div>
            </Popup>
        )
    }
}

export default ProfilePopup
