import React,{ useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { ACCESS_TOKEN_NAME, API_BASE_URL } from '../../constants/apiConstants';
import axios from 'axios'
function Home(props) {
    useEffect(() => {
      var token_base64= localStorage.getItem(ACCESS_TOKEN_NAME);
      var token = atob(token_base64);
      let header = {
        //"content-type": "application/json",
        //"accept": "application/json",
        'Authorization': `Bearer ${token}`,
        //"Access-Control-Allow-Origin" : "*", 
        //"Access-Control-Allow-Credentials" : true
      };
        axios.get(API_BASE_URL+'api/auth/user-profile', { headers: header})
        .then(function (response) {
            if(response.status !== 200){
              redirectToLogin()
            }
        })
        .catch(function (error) {
          redirectToLogin()
        });
      })
    function redirectToLogin() {
    props.history.push('/login');
    }
    return(
        <div className="mt-2">
            Home page content
        </div>
    )
}

export default withRouter(Home);