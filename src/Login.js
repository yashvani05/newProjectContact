import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { Link } from "react-router-dom";

function Login() {

    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies(['userinfo']);
    const Initial = {
        username: "",
        password: "",
    }

    const currentUser = localStorage.getItem("token");

    useEffect(() => {
        if (currentUser) {

            navigate("/home");
        }
    }, [currentUser, navigate]);

    const [InitilaizedValues, SetTheValues] = useState(Initial);
    const [InitilaizedErrors, SetTheErrors] = useState({});
    const [isSubmit, SetTheSubmit] = useState(false);
    const [message, SetMessage] = useState("")

    const ChangingTheValues = (e) => {
        const { name, value } = e.target;
        SetTheValues({
            ...InitilaizedValues, [name]: value
        });
    }

    const HandleSubmitForm = (e) => {
        e.preventDefault();
        SetTheErrors(Validate(InitilaizedValues));
        console.log(JSON.stringify({
            "username": InitilaizedValues.username,
            "password": InitilaizedValues.password,
        }));
        if (isSubmit) {
            let myObje = {
                username: InitilaizedValues.username,
                password: InitilaizedValues.password
            }

            try {
                axios.post("http://139.59.21.147:8080/api/users/login", myObje).then(response => {
                    // console.log(response);
                    // console.log(response.data.statuscode)
                    if (response.status == 200) {
                        SetMessage(response.data.message);
                        localStorage.setItem('token', response.data.token);
                        setCookie("userinfo", response.data.token, "/")
                        navigate("/home")
                    } else {
                        SetMessage(response.data.message);
                    }
                }).catch(error => {
                    console.log('error');
                });

            } catch (err) {
                console.log(err);
            }
        
        }

    }

    useEffect(() => {
        console.log(InitilaizedErrors);
        if (Object.keys(InitilaizedErrors).length === 0 && isSubmit) {

        }
    }, [InitilaizedErrors, isSubmit]);



    const Validate = (values) => {
        const errors = {}
        const regecusername = /[a-zA-Z]+$/;
        const regexpassword = /[0-9a-z]/
        let error = 0;
        if (!regecusername.test(values.username)) {
            errors.username = "*UserName is required*";
            error = 1;
        }

        if (!values.password) {
            errors.password = "*password is required*";
            error = 1;
        }
        else if (!regexpassword.test(values.password)) {
            errors.password = "*InValid password *";
            error = 1;
        }
        // debugger;
        if (error == 0) {
            SetTheSubmit(true);
        }

        return errors;
    }
    return (
        <>
            <div className="container">
                <div className="LoginForm">
                    <div className="body">
                    <form onSubmit={HandleSubmitForm}>
                        <div className='container text-light'>{message ? <p>{message}</p> : null}</div>
                        {Object.keys(InitilaizedErrors).length === 0 && isSubmit && (
                            <span className="text-light">Signed in successfully</span>
                        )}
                       
                        <div className="container">
                            <div className="main container">
                                <div className="signinpage mb-5 mt-5">
                                    <h1 className="mx-5 text-light mt-3">Login</h1>
                                    <div className="form-content input-icons">
                                        <div className="input-group mt-5 mb-3 w-75 mx-5">
                                            <span className="input-group-text fa fa-user" id="basic-addon1"></span>
                                            <input type="text" autoComplete="off" name="username" className="form-control" onChange={ChangingTheValues} placeholder="Enter username...." aria-label="Username" aria-describedby="basic-addon1" >
                                            </input>
                                        </div>
                                        <p className='mx-5 text-danger'>{InitilaizedErrors.username}</p>
                                        <div className="input-group mt-5 mb-3 w-75 mx-5">
                                            <span className="input-group-text fa fa-lock" id="basic-addon1"></span>
                                            <input type="password" autoComplete="off" name="password" className="form-control" onChange={ChangingTheValues} placeholder="Enter password...." aria-describedby="basic-addon1">
                                            </input>
                                        </div>
                                        <p className='mx-5 text-danger'>{InitilaizedErrors.password}</p>
                                        <div className="d-flex">
                                            <button onSubmit={HandleSubmitForm} className="btn btn-primary mx-5 mt-4" type='submit' >LOGIN</button>
                                            <Link className='mx-5 mt-4' to="/register">create account?I don't have account</Link>
                                        </div>
                                    </div>
                                </div>

                                {/* <pre className='text-light'>{JSON.stringify(InitilaizedValues,undefined,2)}</pre> */}
                            </div>
                        </div>
                    </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login