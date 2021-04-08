import React, {useState} from 'react';
import axios from 'axios';
import { useForm } from "react-hook-form";
import './RegistrationForm.css';
import {API_BASE_URL, ACCESS_TOKEN_NAME} from '../../constants/apiConstants';
import { withRouter } from "react-router-dom";
import { Service } from '../../services/Service';

function RegistrationForm(props) {
    const [state , setState] = useState({
        email : "",
        name : "",
        password : "",
        confirmPassword: "",
        successMessage: null
    })
    const { register, handleSubmit, errors } = useForm(); 
    const onSubmit = (data) => {
         //alert(JSON.stringify(data));
         //console.log(data)
         handleSubmitClick()
    };
    const handleChange = (e) => {
        const {id , value} = e.target   
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }
    const sendDetailsToServer = () => {
        if(state.email.length && state.password.length) {
            props.showError(null);
            const payload={
                "name":state.name,
                "email":state.email,
                "password":state.password,
                "password_confirmation":state.confirmPassword,
            }

            Service.post({
              url: 'api/auth/register',
              body: JSON.stringify({
                "name": state.name,
                "email": state.email,
                "password": state.password,
                "password_confirmation":state.confirmPassword
              })
            })
            .then(response => {
              let data = response;
                if(response.status === 201) {
                    setState({ successMessage: data.message });
                    var token = data.access_token;
                    var token_base64 = btoa(token);
                    localStorage.setItem(ACCESS_TOKEN_NAME,token_base64);
                    redirectToHome();
                    props.showError(null)
                }else{
                    props.showError("Some error ocurred");
                }  
            })
            .catch(err => {
            //console.log(err)
            });

            // axios.post(API_BASE_URL+'api/auth/register', payload)
            //     .then(function (response) {
            //         console.log(response)
            //         if(response.status === 201){
            //             setState(prevState => ({
            //                 ...prevState,
            //                 'successMessage' : 'Registration successful. Redirecting to home page..'
            //             }))
            //             var token = response.data.access_token;
            //             var token_base64 = btoa(token);
            //             localStorage.setItem(ACCESS_TOKEN_NAME,token_base64);
            //             redirectToHome();
            //             props.showError(null)
            //         } else{
            //             props.showError("Some error ocurred");
            //         }
            //     })
            //     .catch(function (error) {
            //         console.log(error);
            //     });    
        } else {
            props.showError('Please enter valid username and password')    
        }
        
    }
    const redirectToHome = () => {
        //debugger
        props.updateTitle('Home')
        props.history.push('/home');
    }
    const redirectToLogin = () => {
        props.updateTitle('Login')
        props.history.push('/login'); 
    }
    const handleSubmitClick = (e) => {
        //e.preventDefault();
        if(state.password === state.confirmPassword) {
            sendDetailsToServer()    
        } else {
            props.showError('Passwords do not match');
        }
    }
    return(
        <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
            <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group text-left">
                <label htmlFor="exampleInputName1">Name</label>
                <input ref={register({required:true,minLength:2})}
                       type="text" 
                       className="form-control" 
                       id="name" 
                       name="name"
                       aria-describedby="emailHelp" 
                       placeholder="Enter Name" 
                       value={state.name}
                       onChange={handleChange}
                />
                {errors.name && errors.name.type === "required" && (<p className="error">This is required</p>)}
                {errors.name && errors.name.type === "minLength" && (<p className="error">This is field required min length of 2</p>)}
                </div>
                <div className="form-group text-left">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input
                       type="email" 
                       name="email"
                       className="form-control" 
                       id="email" 
                       aria-describedby="emailHelp" 
                       placeholder="Enter email" 
                       value={state.email}
                       onChange={handleChange}
                       ref={register({
                        required: "required"
                        //,
                        // pattern: {
                        //   value: /S+@S+.S+/,
                        //   message: "Entered value does not match email format"
                        // }
                      })}
                />
                {errors.email && (<p className="error">This is required</p>)}
                </div>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input ref={register({required:true})}
                        type="password" 
                        className="form-control" 
                        id="password" 
                        name="password"
                        placeholder="Password"
                        value={state.password}
                        onChange={handleChange} 
                    />
                    {errors.password  && (<p className="error">This is required</p>)}
                </div>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputPassword1">Confirm Password</label>
                    <input ref={register({required:true})}
                        type="password" 
                        className="form-control" 
                        id="confirmPassword"
                        name="confirmPassword" 
                        placeholder="Confirm Password"
                        value={state.confirmPassword}
                        onChange={handleChange} 
                    />
                    {errors.confirmPassword  && (<p className="error">This is required</p>)}
                </div>
                {/* <button 
                    type="submit" 
                    className="btn btn-primary"
                    onClick={handleSubmitClick}
                >
                    Register
                </button> */}
                <button 
                    type="submit" 
                    className="btn btn-primary"
                >
                    Register
                </button> 
            </form>
            <div className="alert alert-success mt-2" style={{display: state.successMessage ? 'block' : 'none' }} role="alert">
                {state.successMessage}
            </div>
            <div className="mt-2">
                <span>Already have an account? </span>
                <span className="loginText" onClick={() => redirectToLogin()}>Login here</span> 
            </div>
            
        </div>
    )
}

export default withRouter(RegistrationForm);