import React, { useState } from 'react';
// import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function SignUp() {
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: ''
    });

    let nav= useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/signin', {formData});

            if (response.data.mess=="okk") {
                nav('/login')
               
            } else {
                // Handle registration errors
                console.error('Registration failed');
            }
        } catch (error) {
            console.error('Error during registration:', error);
        }
    };

    return (
        <>
            <h2 className="m-auto">SignUp At Medix App</h2>
            <div className="Log mb-5 mt-5">
                <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                    <div className="row">
                        <div className="m-auto pb-4 col-md-8 col-sm-7 col-6">
                            <label htmlFor="mail" className="form-label">Email</label>
                            <input type="email" name="email" className="form-control" id="mail" placeholder="Enter E-mail" value={formData.email} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="row">
                        <div className="m-auto pb-4 col-md-8 col-sm-7 col-6">
                            <label htmlFor="username" className="form-label">UserName</label>
                            <input type="text" name="username" className="form-control" id="username" placeholder="Enter username" value={formData.username} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="row">
                        <div className=" m-auto pb-4 col-md-8 col-sm-7 col-6">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" name="password" className="form-control" id="password" placeholder="Enter password" value={formData.password} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="row">
                        <button type="submit" className="btn btn-success m-auto col-2">Submit</button>
                    </div>
                </form>
            </div>
        </>
    );
}
