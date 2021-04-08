import React, {useState,useEffect} from 'react';
import axios from 'axios';
import { BrowserRouter as Router,Switch,Route,useParams,withRouter } from "react-router-dom";
import { API_BASE_URL,ACCESS_TOKEN_NAME } from '../../constants/apiConstants';
import { Navbar,Nav,NavDropdown,Form,FormControl,Button } from 'react-bootstrap';
import { Service } from '../../services/Service';

function Header(props) {
    const [state , setState] = useState({
        successMessage: null,
        tokenSet:''
    })
    const capitalize = (s) => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
    }
    let title = capitalize(props.location.pathname.substring(1,props.location.pathname.length))
    if(props.location.pathname === '/') {
        title = 'Welcome'
    }

    const redirectToLogin = () => {
        //debugger
        //props.updateTitle('Login')
        props.history.push('/login'); 
    }


    const getLocalTodo = () => {
         //debugger
         console.log(state.tokenSet)
        if (localStorage.getItem(ACCESS_TOKEN_NAME) === null) {
          localStorage.setItem(ACCESS_TOKEN_NAME, JSON.stringify(null));
        } else {
          let todoLocal = localStorage.getItem(ACCESS_TOKEN_NAME);
          setState(prevState => ({
            ...prevState,
            'tokenSet' : todoLocal
            }))
        }
      };
      useEffect(() => {
        getLocalTodo();
      }, []);

    function handleLogout() {

        Service.post({
            url: 'api/auth/logout',
            body:{}

          })
          .then(response => {
              console.log(response)
              let data = response;
            if(data.status==200) { 
                 window.location.reload();
                        setState(prevState => ({
                        ...prevState,
                        'successMessage' : response.message
                    }))
                    localStorage.removeItem(ACCESS_TOKEN_NAME)
                    props.history.push('/login')
                    window.location.reload();
                }
                if(response.status !== 200){
                    props.history.push('/home')
                }
            })
              .catch(function (error) {
                props.history.push('/home')
            });
       
            // var token_base64= localStorage.getItem(ACCESS_TOKEN_NAME);
        // var token = atob(token_base64);
        // let header = {
        //     'Authorization': `Bearer ${token}`,
        //   };
        //     axios.post(API_BASE_URL+'api/auth/logout',{}, { headers: header})
        //     .then(function (response) {
        //         if(response.status==200){
        //             setState(prevState => ({
        //                 ...prevState,
        //                 'successMessage' : response.data.message
        //             }))
        //             localStorage.removeItem(ACCESS_TOKEN_NAME)
        //             props.history.push('/login')
        //             window.location.reload();
        //         }
        //         if(response.status !== 200){
        //             props.history.push('/home')
        //         }
        //     })
        //     .catch(function (error) {
        //         props.history.push('/home')
        //     });    
    }
    return(
        <Router>
            <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
                <Navbar.Brand href="#home">React Bootstrap Navbar</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/hookstate">Hook State</Nav.Link>
                    <Nav.Link href="/custume">Custume</Nav.Link>
                    <Nav.Link href="/employee">Employee</Nav.Link>
                    <Nav.Link href="/data-grid">Data Grid</Nav.Link>
                    <Nav.Link href="/multi-image">Multi-Image</Nav.Link>
                    <Nav.Link href="/react-redux">React-Redux</Nav.Link>
                    {(state.tokenSet.length > 5 && state.tokenSet!=null && state.tokenSet!=undefined) ? <div className="ml-auto"><button className="btn btn-danger" onClick={() => handleLogout()}>Logout</button></div> : <div className="ml-auto"><button className="btn btn-success" onClick={() => redirectToLogin()}>Login</button></div>}
                    
                    {/* <div className="row col-12 d-flex justify-content-center text-white"> */}
                    {/* {(state.tokenSet.length > 5 && state.tokenSet!=null && state.tokenSet!=undefined) ? <div className="ml-auto"><button className="btn btn-danger" onClick={() => handleLogout()}>Logout</button></div> : <div className="ml-auto"><button className="btn btn-success" onClick={() => redirectToLogin()}>Login</button></div>}    */}
                    {/* {renderLogout()} */}
                    {/* </div> */}
                    </Nav>
                    
                </Navbar.Collapse>
            </Navbar>
            <br />
        </Router>
       
    )
}
export default withRouter(Header);