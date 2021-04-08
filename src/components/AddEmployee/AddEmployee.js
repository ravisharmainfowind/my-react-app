import React, { Component } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../constants/apiConstants';
import { withRouter, Switch, Route, Link } from "react-router-dom";
import { Service } from '../../services/Service';
//import {Route, IndexRoute,browserHistory} from 'react-router';
import { Router, browserHistory } from 'react-router';
import './AddEmployee.css';

class AddEmployee extends Component {

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
      formData: {},
      errors: {},
      successMessage: '',
      // Initially, no file is selected
      selectedFile: null,
      checked: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    let input = this.state.input;
    let errors = this.state.errors;
    if (event.target.name === "profile_image") {
      console.log(event.target.files[0])
      input[event.target.name] = event.target.files[0];
      this.setState({
        input
      });
      console.log(this.state.input)
    } else {
      if (event.target.name === "checkbox") {
        if (event.target.checked) {
          this.state.checked = true;
        } else {
          this.state.checked = false;
        }
      }
      //let input = this.state.input;
      //let errors = this.state.errors;
      input[event.target.name] = event.target.value;
      errors[event.target.name] = '';
      this.setState({
        input
      });
      console.log(this.state.input)

    }
  }

  handleSubmit(event) {
    event.preventDefault();
    let self = this;
    if (this.validate()) {
      //debugger 
      let input = {};
      input["employee_name"] = "";
      input["employee_salary"] = "";
      input["employee_age"] = "";
      input["email"] = "";
      input["mobile_number"] = "";
      input["profile_image"] = "";
      input["image_name"] = "";
      input["gender"] = "";
      input["address"] = "";
      input["date"] = "";
      this.setState({ input: input });

      // Create an object of formData
      const formData = new FormData();
      //debugger
      //Update the formData object
      formData.append("profile_image", this.state.input.profile_image);
      formData.append("employee_name", this.state.input.employee_name);
      formData.append("employee_salary", this.state.input.employee_salary);
      formData.append("employee_age", this.state.input.employee_age);
      formData.append("mobile_number", this.state.input.mobile_number);
      formData.append("gender", this.state.input.gender);
      formData.append("address", this.state.input.address);
      formData.append("email", this.state.input.email);
      formData.append("date", this.state.input.date);

      console.log('@@@@@@@@@@@@@@@@@@@@@@@@', formData.values())
       let header = {
         "Content-Type": "multipart/form-data",
         "Access-Control-Allow-Origin": "*",
       };

      Service.post({
        url: 'api/employees',
        body: formData,
        header:header
      })
      .then(response => {
        let data = response;
          if(data) {
            self.setState({ successMessage: 'Employee successful Add...' });
            console.log(self.state.successMessage)
          }  
      })
      .catch(err => {
         //console.log(err)
      });

      // axios.post(API_BASE_URL + 'api/employees', formData)
      //   .then(function (response) {
      //     console.log(response)
      //     if (response.status === 201) {
      //       self.setState({ 'successMessage': 'Employee successful Add...' });
      //       self.handleClickEmp();
      //     }
      //   })
      //   .catch(function (error) {
      //     console.log(error);
      //   });
    }
  }

  handleClickEmp() {
    const { history } = this.props;
    this.props.history.push('/employee');
  }

  validate() {

    let input = this.state.input;
    let errors = {};
    let isValid = true;
    //console.log(input["profile_image"].size);
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
      //var pattern = new RegExp(/^\+(?:[0-9] ?){6,14}[0-9]$/);
      if (!pattern.test(input["mobile_number"])) {
        isValid = false;
        errors["mobile_number"] = "Please enter only number.";
      } else if (input["mobile_number"].length < 7) {
        isValid = false;
        errors["mobile_number"] = "Please enter valid phone number.";
      }
    }

    if (!input["address"]) {
      isValid = false;
      errors["address"] = "Please enter your address.";
    }

    if (!input["date"]) {
      isValid = false;
      errors["date"] = "Please select date.";
    }

    if (!input["gender"]) {
      isValid = false;
      errors["gender"] = "Please select gender.";
    }

    if (!this.state.checked) {
      if (!input["checkbox"]) {
        isValid = false;
        errors["checkbox"] = "Please Select Terms & Conditions.";
      }
    }

    if (!input["profile_image"]) {
      isValid = false;
      errors["profile_image"] = "Please select image.";
    }

    if (typeof input["profile_image"] !== "undefined" && input["profile_image"]===null && input["profile_image"]===undefined) {
       debugger
      let imageSize = input["profile_image"].size;
      if (!input["profile_image"].name.match(/\.(jpg|jpeg|png|gif)$/)) {
        isValid = false;
        errors["profile_image"] = "Please select valid image(like jpg|jpeg|png|gif).";
      } else if (imageSize > 1048576) {
        isValid = false;

        errors["profile_image"] = "Image size less than 1 MB.";
      }
    }

    this.setState({
      errors: errors
    });

    return isValid;
  }

  imageValidate() {
    let input = this.state.input;
    let errors = {};
    let isValid = true;
    //debugger
    if (!input["profile_image"]) {
      isValid = false;
      errors["profile_image"] = "Please select image.";
    }

    if (typeof input["profile_image"] !== "undefined") {
      //debugger
      let imageSize = input["profile_image"].size;
      if (!input["profile_image"].name.match(/\.(jpg|jpeg|png|gif)$/)) {
        isValid = false;
        errors["profile_image"] = "Please select valid image(like jpg|jpeg|png|gif).";
      } else if (imageSize > 1048576) {
        isValid = false;

        errors["profile_image"] = "Image size less than 1 MB.";
      }
    }

    this.setState({
      errors: errors
    });

    return isValid;
  }

  // On file select (from the pop up)
  onFileChange = event => {
    let input = this.state.input;
    let errors = this.state.errors;
    input[event.target.name] = event.target.files[0];
    this.setState({
      input
    });
    // Update the state
    this.setState({ selectedFile: event.target.files[0] });

  };

  // On file upload (click the upload button)
  onFileUpload = () => {
    let self = this;
    if (this.imageValidate()) {
      // Create an object of formData
      const formData = new FormData();
      //debugger
      // Update the formData object
      formData.append(
        "myFile",
        this.state.selectedFile
        //this.state.selectedFile.name
      );

      // Details of the uploaded file
      console.log(this.state.selectedFile);

      // Request made to the backend api
      // Send formData object
      axios.post(API_BASE_URL + 'api/uploadfile', formData)
        .then(function (response) {
          console.log(response)
          let input = self.state.input;
          input['image_name'] = response.data.image_name;
          if (response.status === 201) {
            self.setState({
              input
            })
          }
          //debugger
          console.log(self.state.input)
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  maxLengthCheck = (object) => {
    if (object.target.value.length > object.target.maxLength) {
     object.target.value = object.target.value.slice(0, object.target.maxLength)
      }
    }


  render() {
    const { errors } = this.state;
    const { history } = this.props;
    return <div className="container">
      <div className="row">
        <form onSubmit={this.handleSubmit} encType="multipart/form-data">
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="inputEmail4">Employee Name</label>
              <input type="text" name="employee_name" className="form-control" id="input4Email4" placeholder="Employee Name" value={this.state.input.employee_name}
                onChange={this.handleChange} />
              <div className="text-danger">{this.state.errors.employee_name}</div>
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="inputPassword4">Employee Salary</label>
              <input type="number" maxLength = "6" minLength = "1" min="0" name="employee_salary" className="form-control" id="input4Password4" placeholder="Employee Salary" value={this.state.input.employee_salary}
                onChange={this.handleChange} onInput={this.maxLengthCheck} />
              <div className="text-danger">{this.state.errors.employee_salary}</div>
            </div>
          </div>
          <input type="hidden" name="image_name" value={this.state.input.image_name} />
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="inputEmail4">Employee Age</label>
              <input type="number" name="employee_age" maxLength = "2" min="0" className="form-control" id="inputEmail44" placeholder="Employee Age" value={this.state.input.employee_age}
                onChange={this.handleChange} onInput={this.maxLengthCheck}/>
              <div className="text-danger">{this.state.errors.employee_age}</div>
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="inputPassword4">Employee Mobile No</label>
              <input type="number" name="mobile_number" maxLength = "13" min="0" className="form-control" id="inputPasswo4rd4" placeholder="Employee Mobile No" value={this.state.input.mobile_number}
                onChange={this.handleChange} onInput={this.maxLengthCheck}/>
              <div className="text-danger">{this.state.errors.mobile_number}</div>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="inputEmail4">Email</label>
              <input type="email" name="email" className="form-control" id="ifnputEmail44" placeholder="Email" value={this.state.input.email}
                onChange={this.handleChange} />
              <div className="text-danger">{this.state.errors.email}</div>
            </div>
            <div className="form-group col-md-6" onChange={this.handleChange}>
              <label htmlFor="inputEmail4">Gender</label>
              <div className="custom-control custom-radio">
                <input type="radio" id="customRadio1" name="gender" value="male" className="custom-control-input" />
                <label className="custom-control-label" htmlFor="customRadio1">Male</label>
              </div>

              <div className="custom-control custom-radio">
                <input type="radio" id="customRadio2" name="gender" value="female" className="custom-control-input" />
                <label className="custom-control-label" htmlFor="customRadio2">Female</label>
              </div>
              <div className="text-danger">{this.state.errors.gender}</div>
            </div>
          </div>

          <div className="form-row">
            <label htmlFor="inputAddress">Image</label>
            <div className="custom-file">
              <input type="file" name="profile_image" className="custom-file-input" id="inputGroupFile01"
                onChange={this.handleChange} />
              <label className="custom-file-label" htmlFor="inputGroupFile01">Choose file</label>
              <div className="text-danger">{this.state.errors.profile_image}</div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-12">
              <label htmlFor="inputEmail4">Date</label>
              <input type="date" name="date" className="form-control" id="ifnputEmail44" placeholder="Date" value={this.state.input.date}
                onChange={this.handleChange} />
              <div className="text-danger">{this.state.errors.date}</div>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="inputAddress">Address</label>
            <input type="text" name="address" className="form-control" id="inputAddress" placeholder="Address" value={this.state.input.address}
              onChange={this.handleChange} />
            <div className="text-danger">{this.state.errors.address}</div>
          </div>
          <div className="form-group">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" name="checkbox" onChange={this.handleChange} id="gridCheck"
              />

              <label className="form-check-label" htmlFor="gridCheck">
                Check me out
                            </label>
              <div className="text-danger">{this.state.errors.checkbox}</div>
            </div>
          </div>
          {(this.state.checked === true) ? <button type="submit" className="btn btn-primary">Sign in</button> : <button type="button" disabled className="btn btn-primary">Sign in</button>}
          {/* <button type="submit" className="btn btn-primary">Sign in</button> */}
        </form>

        {/* <form>
          <div className="form-row pad_class">
            <div className="form-group col-md-6">
              <label htmlFor="inputAddress">Image</label>
              <div className="custom-file"></div>
              <input type="file" name="profile_image" onChange={this.onFileChange} />
              <div className="text-danger">{this.state.errors.profile_image}
              </div><br />
              <button type="button" onClick={this.onFileUpload} className="btn btn-primary">
                Upload!
               </button>
              <br />
            </div>
          </div>
        </form> */}
      </div>
    </div>;
  }
}
export default withRouter(AddEmployee);