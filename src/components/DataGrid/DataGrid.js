import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useForm } from "react-hook-form";
import { Service } from '../../services/Service';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import {API_BASE_URL } from '../../constants/apiConstants';
import { Form,Modal,Button,ButtonGroup,Input,Image} from "react-bootstrap";

const DataGrid = () => {
    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);
    const [rowData, setRowData] = useState([]);
    const [employees, setEmployees] = useState(null);
    const [startDate, setStartDate] = useState(new Date());
    const [successMessage, setSuccessMessage] = useState(null);
    const [state , setState] = useState({
      email : "",
      employee_name : "",
      employee_salary : "",
      employee_age : "",
      mobile_number : "",
      date: "",
      gender: "",
      address:"",
      profile_image:"",
      image_path:"",
      id:""
  })
    const [showModal, setShow] = useState(false);
    
    const handleClose = () => setShow(false);

    const handleShow = e => {
       setShow(true)
       let self =this;
        const selectedNodes = gridApi.getSelectedNodes()
        const selectedData = selectedNodes.map( node => node.data )
        const selectedDataStringPresentation = selectedData.map((employeeData)=>{
          //console.log(employeeData.id)
          state.id              = employeeData.id;
          state.employee_name   = employeeData.employee_name;
          state.employee_salary = employeeData.employee_salary;
          state.employee_age    = employeeData.employee_age;
          state.email           = employeeData.email;
          state.mobile_number   = employeeData.mobile_number;
          state.address         = employeeData.address;
          state.gender          = employeeData.gender;
          state.date            = employeeData.date;
          state.profile_image   = employeeData.profile_image;
          state.image_path      = employeeData.profile_image;        
        })     
    };
    
    

  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    //event.preventDefault();
    let self = this; 
      let data1 = new FormData();
       data1.append("_method", 'PUT');
       data1.append("profile_image", state.profile_image);
       data1.append("employee_name", state.employee_name);
       data1.append("employee_salary", state.employee_salary);
       data1.append("employee_age", state.employee_age);
       data1.append("mobile_number", state.mobile_number);
       data1.append("gender", state.gender);
       data1.append("address", state.address);
       data1.append("email", state.email);
       data1.append("date", state.date);
    // append another data ....
      let header = {
        "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Origin": "*",
      };

      Service.put({
        url: 'api/employees/'+state.id,
        body: data1
        //header:header
      })
      .then(response => {
        let data = response;
          if(data) {
            //window.location.reload();
            setSuccessMessage(response.message);
            console.log(successMessage)
            setTimeout(
              () => window.location.reload(),
              3000
            );

          }  
      })
      .catch(err => {
         console.log(err)
      });  

    //   axios({
    //     method : "POST",
    //     //baseURL: API_BASE_URL+'api/employees/'+state.id,
    //     url    : API_BASE_URL+'api/employees/'+state.id,
    //     //params : params,
    //     data   : data1,
    //     headers: headers,
    //   }).then(response => {
    //       if(response.status === 200){
    //           window.location.reload();
    //           self.setState({'successMessage' : 'Employee successful Edit...'});                 
    //       }
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    // });
  };
   
    const onGridReady = (params) => {
        setGridApi(params.api);
        setGridColumnApi(params.columnApi);
        const updateData = (data) => {
          setRowData(data);
        };  
        Service.get({
            url: 'api/employees'
        })
        .then(response => {
             updateData(response);
        })  
        //  fetch(API_BASE_URL+'api/employees')
        // .then((resp) => resp.json())
        // .then((data) => updateData(data));
    };    

    const onButtonClick = e => {
        const selectedNodes = gridApi.getSelectedNodes()
        const selectedData = selectedNodes.map( node => node.data )
        const selectedDataStringPresentation = selectedData.map( node => `${node.employee_name} ${node.employee_age}`).join(', ')
        alert(`Selected nodes: ${selectedDataStringPresentation}`)
    }

    const onDeleteClick = e => {
        let self =this;
        const selectedNodes = gridApi.getSelectedNodes()
        const selectedData = selectedNodes.map( node => node.data )
        const selectedDataStringPresentation = selectedData.map((employeeData)=>{
            console.log(employeeData.id)
            let id = employeeData.id;
            Service.delete({
                url: 'api/employees/'+id
              })
              .then(response => {
                  console.log(response)
                  let data = response;
                if(data) { 
                    window.location.reload();
                }
              })
              .catch(err => {
                console.log(err)
              });
        });
    } 

    const handleChange = (e) => {
      const {name , value} = e.target
      if (e.target.name === "profile_image") { 
        setState(prevState => ({
          ...prevState,
          profile_image : e.target.files[0]
      }))
        //console.log(state.profile_image)
      } else { 
      setState(prevState => ({
          ...prevState,
          [name] : value
      }))
      }
    }

    return (<>
        <div className="ag-theme-alpine" style={{ height: 600, width: 1040 }}>
            <button className="btn btn-primary" onClick={onButtonClick}>Get selected rows</button>
            <button className="btn btn-danger" onClick={onDeleteClick}>Delete Rows</button>
            <button className="btn btn-warning" onClick={handleShow}>Edit Row</button>
            <AgGridReact
            rowSelection="multiple"
            defaultColDef={{
              width: 150,
              editable: true,
              filter: 'agTextColumnFilter',
              floatingFilter: true,
              resizable: true,
            }}
            defaultColGroupDef={{ marryChildren: true }}
            columnTypes={{
              numberColumn: {
                width: 130,
                filter: 'agNumberColumnFilter',
              },
              medalColumn: {
                width: 100,
                columnGroupShow: 'open',
                filter: false,
              },
              nonEditableColumn: { editable: false },
              dateColumn: {
                filter: 'agDateColumnFilter',
                filterParams: {
                  comparator: function (filterLocalDateAtMidnight, cellValue) {
                    var dateParts = cellValue.split('/');
                    var day = Number(dateParts[0]);
                    var month = Number(dateParts[1]) - 1;
                    var year = Number(dateParts[2]);
                    var cellDate = new Date(year, month, day);
                    if (cellDate < filterLocalDateAtMidnight) {
                      return -1;
                    } else if (cellDate > filterLocalDateAtMidnight) {
                      return 1;
                    } else {
                      return 0;
                    }
                  },
                },
              },
            }}
            rowData={rowData}
            onGridReady={onGridReady}
          >
            <AgGridColumn headerName="Employee Name" field="employee_name" checkboxSelection={ true }/>
            <AgGridColumn headerName="Mobile No." field="mobile_number" type="numberColumn"/>
            <AgGridColumn headerName="Employee Age" field="employee_age" type="numberColumn" />
            <AgGridColumn headerName="Email" field="email" />
            <AgGridColumn
              headerName="Date"
              field="date"
              type={['dateColumn', 'nonEditableColumn']}
              width={220}
            />
          </AgGridReact>
        </div>

       <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Employee Data</Modal.Title>
          </Modal.Header>
          <Modal.Body>
           <Form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
           <Form.Group>
              <Form.Label>Employee Name: </Form.Label>
              <Form.Control type="text" onChange={handleChange} value={state.employee_name} name="employee_name" placeholder="Employee Name" ref={register({required:true,minLength:2})}/> 
              {errors.employee_name && errors.employee_name.type === "required" && (<p className="error">This is required</p>)}
                {errors.employee_name && errors.employee_name.type === "minLength" && (<p className="error">This is field required min length of 2</p>)}          
          </Form.Group>
          <Form.Group>
              <Form.Label>Employee Salary: </Form.Label>
              <Form.Control type="text" onChange={handleChange} value={state.employee_salary} name="employee_salary" placeholder="Employee Salary" ref={register({required:true,pattern: /\d+/})}/> 
              {errors.employee_salary && errors.employee_salary.type === "required" && (<p className="error">This is required</p>)} 
              {errors.employee_salary && errors.employee_salary.type === "pattern" && (<p className="error">Please enter digits for Salary.</p>)}            
          </Form.Group>
         
          <Form.Group>
              <Form.Label>Employee Age: </Form.Label>
              <Form.Control type="text" onChange={handleChange} value={state.employee_age} name="employee_age" placeholder="Employee Age"  ref={register({ required:true,pattern: /\d+/ })}/> 
              {errors.employee_age && errors.employee_age.type === "required" && (<p className="error">This is required</p>)}
              {errors.employee_age && errors.employee_age.type === "pattern" && (<p className="error">Please enter number for age.</p>)}            
          </Form.Group>

          <Form.Group>
              <Form.Label>Employee Email: </Form.Label>
              <Form.Control type="text" onChange={handleChange} value={state.email} name="email" placeholder="Employee Age"  ref={register({ required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,maxLength: 50 })}/> 
              {errors.email && errors.email.type === "required" && (<p className="error">This is required</p>)}
              {errors.email && errors.email.type === "pattern" && (<p className="error">Please enter valid email.</p>)}
              {errors.email && errors.email.type === "maxLength" && (<p className="error">This is field required max length of 50</p>)}            
          </Form.Group>
          
          <Form.Group onChange={handleChange} ref={register({ required:true })}>
          <ButtonGroup>
          <Form.Label>Gender: </Form.Label>
          <Form.Label >Male
            <Form.Control type="radio" name="gender" value='male' checked={state.gender === 'male'} ref={register}/>
          </Form.Label>
          <Form.Label>Female
            <Form.Control type="radio" name="gender" checked={state.gender === 'female'} value='female' ref={register}/>
          </Form.Label>
        </ButtonGroup>
        {errors.gender && errors.gender.type === "required" && (<p className="error">This is required</p>)}
        </Form.Group>

         <Form.Group>
              <Form.Label>Mobile No.: </Form.Label>
              <Form.Control type="text" maxLength="13" onChange={handleChange} value={state.mobile_number} name="mobile_number" placeholder="mobile number"  ref={register({ required: true, pattern: /\d+/,maxLength: 13,minLength:7 })}/> 
              {errors.mobile_number && errors.mobile_number.type === "required" && (<p className="error">This is required</p>)}
              {errors.mobile_number && errors.mobile_number.type === "pattern" && (<p className="error">Please enter valid mobile number(only digits).</p>)}
              {errors.mobile_number && errors.mobile_number.type === "maxLength" && (<p className="error">This is field required max length of 13</p>)}
              {errors.mobile_number && errors.mobile_number.type === "minLength" && (<p className="error">This is field required min length of 7</p>)}            
          </Form.Group>
          <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
          <Form.Group>
              <Form.Label>Date of Birth: </Form.Label>
              <Form.Control type="date" onChange={handleChange} value={state.date} selected={state.date} name="date" placeholder="Date of Birth"  ref={register({ required: true, pattern: /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/ })}/> 
              {errors.date && errors.date.type === "required" && (<p className="error">This is required</p>)}
              {errors.date && errors.date.type === "pattern" && (<p className="error">Please enter valid Date of Birth.</p>)}                
          </Form.Group>

          <Form.Group>
              <Form.Label>Address: </Form.Label>
              <Form.Control type="text" onChange={handleChange} value={state.address} name="address" placeholder="Address"  ref={register({ required: true })}/> 
              {errors.address && errors.address.type === "required" && (<p className="error">This is required</p>)}               
          </Form.Group>

          <Form.Group>
            <Form.Label htmlFor="title">Profile Image:</Form.Label>
            <Form.Control
              type="file"
              autoComplete="off"
              name="profile_image"
              id="profile_image"
              onChange={handleChange}
              //ref={register({ required: true })}
            />
            {errors.profile_image && errors.profile_image.type === "required" && (<p className="error">This is required</p>)} 
          </Form.Group>

          <div className="col-md-4">
            {(state.image_path!=null)?<Image src={`http://localhost/laravel-jwt-auth/public/profile_image/${state.profile_image}`} style={{ height:"75px",width:"75px"}}/>:''}
          </div><br/>
         
          <Button variant="primary" type="submit">
              Submit
          </Button>
          </Form> 
          {(successMessage)?<div className="alert alert-success" role="alert">{successMessage}</div>:''}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            
          </Modal.Footer>
        </Modal>
        </>
    );
};

export default DataGrid;