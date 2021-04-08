import React, {useState} from 'react';
import axios from 'axios';
import './LoginForm.css';
import {API_BASE_URL, ACCESS_TOKEN_NAME} from '../../constants/apiConstants';
import { withRouter } from "react-router-dom";
import { Service } from '../../services/Service';


function LoginForm(props) {
    const [state , setState] = useState({
        email : "",
        password : "",
        successMessage: null
    })
    
    const handleChange = (e) => {
        const {id , value} = e.target   
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }

    const handleSubmitClick = (e) => {
        e.preventDefault();
        if(state.email.length && state.password.length) {
        const payload={
            "email":state.email,
            "password":state.password,
        }
        Service.post({
            url: 'api/auth/login',
            body: JSON.stringify({              
              "email": state.email,
              "password": state.password            
            })
          })
          .then(response => {
            let data = response;
              if(response.status === 200) {
                  setState({ successMessage: data.message });
                  var token = response.access_token;
                  var token_base64 = btoa(token);
                  localStorage.setItem(ACCESS_TOKEN_NAME,token_base64);
                  redirectToHome();
                  props.showError(null)
                }
                  else if(response.status === 401){
                  props.showError("Username and password do not match");
                  }
                  else{
                  props.showError("Username does not exists");
                  } 
          })
          .catch(err => {
          //console.log(err)
          });
        
        // axios.post(API_BASE_URL+'api/auth/login', payload)
        //     .then(function (response) {
        //         console.log(response)
        //         if(response.status === 200){
        //             setState(prevState => ({
        //                 ...prevState,
        //                 'successMessage' : 'Login successful. Redirecting to home page..'
        //             }))
        //             var token = response.data.access_token;
        //             var token_base64 = btoa(token);
        //             // console.log(token_base64);
        //             // console.log(atob(token_base64));
        //             localStorage.setItem(ACCESS_TOKEN_NAME,token_base64);
        //             redirectToHome();
        //             props.showError(null)
        //         }
        //         else if(response.code === 204){
        //             props.showError("Username and password do not match");
        //         }
        //         else{
        //             props.showError("Username does not exists");
        //         }
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     });
         }else {
            props.showError('Please enter valid username and password')    
        }  
    }
    const redirectToHome = () => {
        props.updateTitle('Home')
        props.history.push('/home');
        window.location.reload();
    }
    const redirectToRegister = () => {
        props.history.push('/register'); 
        props.updateTitle('Register');
    }
    return(
        <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
            
            <form>
                <div className="form-group text-left">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="email" 
                       className="form-control" 
                       id="email" 
                       aria-describedby="emailHelp" 
                       placeholder="Enter email" 
                       value={state.email}
                       onChange={handleChange}
                />
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group text-left">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input type="password" 
                       className="form-control" 
                       id="password" 
                       placeholder="Password"
                       value={state.password}
                       onChange={handleChange} 
                />
                </div>
                <div className="form-check">
                </div>
                <button 
                    type="submit" 
                    className="btn btn-primary"
                    onClick={handleSubmitClick}
                >Submit</button>
            </form>
            <div className="alert alert-success mt-2" style={{display: state.successMessage ? 'block' : 'none' }} role="alert">
                {state.successMessage}
            </div>
            <div className="registerMessage">
                <span>Dont have an account? </span>
                <span className="loginText" onClick={() => redirectToRegister()}>Register</span> 
            </div>
        </div>
    )
}

export default withRouter(LoginForm);
