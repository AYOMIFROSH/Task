import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';


const Signup = () => {
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    
    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!name || !email || !password) {
            alert("Fill Data");
            return;
        }
        if (password.length < 8) {
            alert("Password must be at least 8 characters long");
            return;
        }
        axios.post("http://localhost:3001/register", { name, email, password })
        .then(res => {
            navigate("/login")
        }).catch(err => {
            if (err.response && err.response.status === 400) {
                alert('Email already exists please proceed Login to account');
            } else {
                console.log(err);
            }
        });
    };
    
    
    

    return(
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100" id="conntainer" >
            <div className="bg-white p-3 rounded w-27">
                <h3>Create Account</h3>
                <form onSubmit={handleSubmit} className="wrapper">
                    <div className="mb-3">
                        <label htmlFor="Email">
                            <strong>Name</strong>
                        </label>
                        <input id='put-style-2' type="text" placeholder="Enter Name" autoComplete="off" name="name" className="form-control rounded-0" onChange={(event) => setName(event.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>Email</strong>
                        </label>
                        <input id='put-style-2' type="email" placeholder="Enter Email" autoComplete="off" name="email" className="form-control rounded-0" onChange={(event) => setEmail(event.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>Password</strong>
                        </label>
                        <input id='put-style-2' type="password" placeholder="Enter Password" name="password" className="form-control rounded-0" onChange={(event) => setPassword(event.target.value)}/>
                    </div>
                    <button id='Submit' type="submit" className="btn btn-success w-100 rounded-0">Register</button>
                </form>
                <strong><p>Already Have an Account?</p></strong>
                <Link to="/login" className="btn btn-default border w-100 bg-light rounded-0" id="nav"><b>Login To account</b></Link>
            </div>
        </div>
    )
};

export default Signup;