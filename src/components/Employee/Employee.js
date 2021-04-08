import React , { Component } from 'react';
import axios from 'axios';
import {API_BASE_URL } from '../../constants/apiConstants';
import { withRouter,Switch, Route, Link,Redirect } from "react-router-dom";
//import {Route, IndexRoute,browserHistory} from 'react-router';
import { Router,browserHistory } from 'react-router';
import AddEmployee from '../AddEmployee/AddEmployee';
import { Service } from '../../services/Service';

class Employee extends Component {
    constructor(props) {
        super(props);
        this.state = {
          //error: null,
          isLoaded: false,
          employees: [],
          deleteMessage:''
        };
        this.getEmployees = this.getEmployees.bind(this);
        this.handleClickDelete = this.handleClickDelete.bind(this);
      }
 
      componentDidMount() {   
        this.getEmployees();
      } 

    getEmployees= () => {
        let self =this;
        Service.get({
            url: 'api/employees'
        })
        .then(response => {
            let data = response;
            if(data) {
             self.setState({ employees: data })
            }
        })
        .catch(err => {
        });   
    }

    handleClickDelete(id){
       console.log(id)
       let self =this;
        Service.delete({
            url: 'api/employees/'+id
          })
          .then(response => {
              let data = response;
            if(data) {
                self.setState({ deleteMessage: data.message }) 
                self.getEmployees();
            }
          })
          .catch(err => {
          });
    };

    handleClickEdit(id){
        //const { history } = this.props;
        //if(history) history.push('/employee/edit/'+id);
        const { history } = this.props;
        this.props.history.push('/employee/edit/'+id);
       }

    handleClickRd(){
        const { history } = this.props;
        this.props.history.push('/employee/add');
    }

    render() {   
        const { history } = this.props;
            const EmployeeData = this.state.employees.length > 0 && this.state.employees.map((employee,idx) => {  
                const self = this;  
            return  <>
            <tr key={employee!= undefined && employee.id}>
            <td scope="row" key={idx}>{idx+1}</td>
            <td>{employee!= undefined && employee.employee_name}</td>
            <td>{employee!= undefined && employee.employee_salary}</td>
            <td>{employee!= undefined && employee.employee_age}</td>
            <td> 
                
                {/* <Link to={'/employee/edit/'+employee.id} className="btn btn-primary"> Edit </Link>    */}
                <button className="btn btn-primary" onClick={() => self.handleClickEdit(employee.id)}>Edit</button>/
                <button className="btn btn-danger" key={idx+2} id={employee.id} value={employee.id} onClick={() => self.handleClickDelete(employee.id)}>Delete</button>
             </td>    
            </tr>
            </>;   
          });
        
    return <div className="container">
       <button onClick={() => this.handleClickRd()} className="btn btn-success btn-lg float-right"> Add Employee </button>
         {/* <Link to={'/employee/add/'} className="btn btn-success btn-lg float-right"> Add Employee </Link> */}
         <Switch>
              <Route exact path='/employee/add/' component={AddEmployee} />
          </Switch>
       
                <table className="table">
                   
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Employee Name</th>
                    <th scope="col">Salary</th>
                    <th scope="col">Age</th>
                    <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>        
                     {EmployeeData}
                     
                </tbody>
                </table>
         </div>;
  }
}

export default withRouter(Employee);