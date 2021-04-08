import React, {useState} from 'react';
import { withRouter } from "react-router-dom"; 
import Footer from '../Footer'; 
import AddTodo from '../../containers/AddTodo';  
import VisibleTodoList from '../../containers/VisibleTodoList';  



function ReduxReact(props) {
    return(<div className="card col-12 col-lg-4 login-card mt-2 hv-center" id="root">
        <AddTodo />   
       <VisibleTodoList />  
       <Footer />  
    </div>
    )
}
export default withRouter(ReduxReact);