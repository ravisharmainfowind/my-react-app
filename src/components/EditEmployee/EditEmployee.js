import React , { Component } from 'react';
import axios from 'axios';
import {API_BASE_URL } from '../../constants/apiConstants';
import { withRouter,Switch, Route, Link } from "react-router-dom";
import { Form, Input, Result, Button, Popover, Row, Col, Image, notification } from 'antd';
//import {Route, IndexRoute,browserHistory} from 'react-router';
import { Router,browserHistory } from 'react-router';
import { Service } from '../../services/Service';

class EditEmployee extends Component {

    constructor(props) {
        super(props);
        this.state = {
            input: {
              employee_name:'',
              employee_salary:'',
              employee_age:'',
              mobile_number:'',
              profile_image:'',
              gender:'',
              email:'',
              date:'',
              address:'',
            },
            errors: {},
            employees: [],
            employeeId:'',
            loading:false,
            successMessage:''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

    componentDidMount(){
        let urlElements = window.location.pathname.split('/');
        let employeeIds = urlElements[3];
        this.state.employeeId = urlElements[3];
        console.log(this.state.employeeId);
        this.getEmployeeDetails();
    } 
    
    getEmployeeDetails= () => {
        let self =this;
        Service.get({
            url: 'api/employees/'+self.state.employeeId
        })
        .then(response => {
            let data = response;
            if(data) {
             self.setState({ employees: data })
             let input = {};
             input["employee_name"] = self.state.employees[0].employee_name;
             input["employee_salary"] = self.state.employees[0].employee_salary;
             input["employee_age"] = self.state.employees[0].employee_age;
             input["email"] = self.state.employees[0].email;
             input["mobile_number"] = self.state.employees[0].mobile_number;
             input["address"] = self.state.employees[0].address;
             self.setState({input:input});
            }
        })
        .catch(err => {
        });       
    }

    handleChange(event) {
        let input = this.state.input;
        let errors = this.state.errors;
        input[event.target.name] = event.target.value;
        errors[event.target.name] = '';
        this.setState({
          input
        });
        //this.validate();
    }

    handleSubmit(event) {
        event.preventDefault();
        let self = this;
        if(this.validate()){
            //console.log(this.state);
            let input = {};
            input["employee_name"] = "";
            input["employee_salary"] = "";
            input["employee_age"] = "";
            input["email"] = "";
            input["mobile_number"] = "";
            input["address"] = "";
            this.setState({input:input});
            let employeeData = this.state.input;
            self.setState({loading:true});
            Service.put({
              url: 'api/employees/'+self.state.employeeId,
              body: employeeData
            })
            .then(response => {
              self.setState({loading:false});
              if(response.status === 'error') {
                self.openNotification('error', 'Oops!', response.message);
                return;
              }
                self.openNotification('success', 'Success!', 'You have been data updated successfully');
                self.handleClickEmp();
            })
            .catch(err => {
               self.setState({loading:false});
               self.openNotification('error', 'Oops!', 'Something went wrong');
            });   
        }
    }

     openNotification(type, message, description){
      notification[type]({
        message: message,
        description: description
      });
    };

    handleClickEmp(){
        const { history } = this.props;
        this.props.history.push('/employee');
    }
      
      validate(){
        let input = this.state.input;
        let errors = {};
        let isValid = true;
    
        if (!input["employee_name"]) {
          isValid = false;
          errors["employee_name"] = "Please enter your employee name.";
        }

        if (!input["employee_salary"]) {
            isValid = false;
            errors["employee_salary"] = "Please enter your employee salary.";
        }

        if (typeof input["employee_salary"] !== "undefined") {
            
            var pattern = new RegExp(/^[0-9\b]+$/);
            if (!pattern.test(input["employee_salary"])) {
              isValid = false;
              errors["employee_salary"] = "Please enter only number.";
            }      
        }

        if (!input["employee_age"]) {
            isValid = false;
            errors["employee_age"] = "Please enter your employee age.";
        }
        
        if (typeof input["employee_age"] !== "undefined") {
            
            var pattern = new RegExp(/^[0-9\b]+$/);
            if (!pattern.test(input["employee_age"])) {
              isValid = false;
              errors["employee_age"] = "Please enter only number.";
            }
        
        } 

        if (!input["email"]) {
          isValid = false;
          errors["email"] = "Please enter your email Address.";
        }
    
        if (typeof input["email"] !== "undefined") {
            
          var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
          if (!pattern.test(input["email"])) {
            isValid = false;
            errors["email"] = "Please enter valid email address.";
          }
        }
    
        if (!input["mobile_number"]) {
          isValid = false;
          errors["mobile_number"] = "Please enter your phone number.";
        }
    
        if (typeof input["mobile_number"] !== "undefined") {
            
          var pattern = new RegExp(/^[0-9\b]+$/);
          if (!pattern.test(input["mobile_number"])) {
            isValid = false;
            errors["mobile_number"] = "Please enter only number.";
          }else if(input["mobile_number"].length != 10){
            isValid = false;
            errors["mobile_number"] = "Please enter valid phone number.";
          }
        }
    
        if (!input["address"]) {
          isValid = false;
          errors["address"] = "Please enter your address.";
        }
    
        this.setState({
          errors: errors
        });
    
        return isValid;
    }

    render() { const {errors} = this.state;
    const { history } = this.props;   
return <div className="container">
          <div className="row">
                     <form onSubmit={this.handleSubmit} >
                        <div className="form-row">
                            <div className="form-group col-md-6">
                            <label htmlFor="inputEmail4">Employee Name</label>
                            <input type="text" name="employee_name" className="form-control" id="input4Email4" placeholder="Employee Name" value={this.state.input.employee_name}
                             onChange={this.handleChange}/>
                            <div className="text-danger">{this.state.errors.employee_name}</div>
                            </div>
                            <div className="form-group col-md-6">
                            <label htmlFor="inputPassword4">Employee Salary</label>
                            <input type="text" name="employee_salary" className="form-control" id="input4Password4" placeholder="Employee Salary" value={this.state.input.employee_salary}
                            onChange={this.handleChange} />
                            <div className="text-danger">{this.state.errors.employee_salary}</div>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                            <label htmlFor="inputEmail4">Employee Age</label>
                            <input type="text" name="employee_age" className="form-control" id="inputEmail44" placeholder="Employee Age" value={this.state.input.employee_age}
                             onChange={this.handleChange} />
                            <div className="text-danger">{this.state.errors.employee_age}</div>
                            </div>
                            <div className="form-group col-md-6">
                            <label htmlFor="inputPassword4">Employee Mobule No</label>
                            <input type="text" name="mobile_number" className="form-control" id="inputPasswo4rd4" placeholder="Employee Mobule No" value={this.state.input.mobile_number}
                             onChange={this.handleChange} />
                            <div className="text-danger">{this.state.errors.mobile_number}</div>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                            <label htmlFor="inputEmail4">Email</label>
                            <input type="email" name="email" readOnly className="form-control" id="ifnputEmail44" placeholder="Email" value={this.state.input.email}
                             onChange={this.handleChange} />
                            <div className="text-danger">{this.state.errors.email}</div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputAddress">Address</label>
                            <input type="text" name="address" className="form-control" id="inputAddress" placeholder="1234 Main St" value={this.state.input.address}
                             onChange={this.handleChange} />
                            <div className="text-danger">{this.state.errors.address}</div>
                        </div>
                        <div className="form-group">
                            <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="gridCheck"
                              />
                            <label className="form-check-label" htmlFor="gridCheck">
                                Check me out
                            </label>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary">Sign in</button>
                     </form>                     
                   </div>
          
     </div>;
}

}

export default withRouter(EditEmployee);