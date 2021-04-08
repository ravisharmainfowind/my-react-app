import React, { Component } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../constants/apiConstants';
import { withRouter, Switch, Route, Link } from "react-router-dom";
import { Service } from '../../services/Service';

class MultipleImageUpload extends Component {

    fileObj = [];
    fileArray = [];
    fileArrayUrl = [];

    constructor(props) {
        super(props)
        this.state = {
            file: [null],
            files: [],
            successMessage: '',
            input: {},
            formData: {},
            errors: {}
        }
        this.uploadMultipleFiles = this.uploadMultipleFiles.bind(this)
        this.uploadFiles = this.uploadFiles.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        //this.handleSubmitChange = this.handleSubmitChange.bind(this)
    }

    imageValidate() {
        let input = this.state.input;
        let errors = {};
        let isValid = true;
        //debugger
        if (!input["fileName"]) {
          isValid = false;
          errors["fileName"] = "Please select image.";
        }
    
        if (typeof input["fileName"] !== "undefined") {
          //debugger
          let imageSize = input["fileName"].size;
          if (!input["fileName"].name.match(/\.(jpg|jpeg|png|gif)$/)) {
            isValid = false;
            errors["fileName"] = "Please select valid image(like jpg|jpeg|png|gif).";
          } else if (imageSize > 1048576) {
            isValid = false;
    
            errors["fileName"] = "Image size less than 1 MB.";
          }
        }
    
        this.setState({
          errors: errors
        });
    
        return isValid;
      }

    uploadMultipleFiles(e) {
        this.fileArray = [];
        this.fileArrayUrl = [];
        let input = this.state.input;
        let errors = this.state.errors;
        input['fileName'] = e.target.files[0];
        this.setState({
        input
        });
        this.fileObj.push(e.target.files)
        
        if (e.target.files.length != 0) {
            for (let i = 0; i < this.fileObj.length; i++) {
                this.fileArrayUrl.push(URL.createObjectURL(this.fileObj[i][0]))
                this.fileArray.push(this.fileObj[i][0])  
                
                for (let j = 0; j < this.fileObj[i].length; j++) {
                     //console.log(this.fileObj[i][j])
                     this.fileArray.push(this.fileObj[i][j])
                }
            }
            this.setState({ file: this.fileArray })        
        }
    }

    uploadFiles(e) {
        e.preventDefault()
        console.log(this.state.file)
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.imageValidate()) {
        let self = this;
        document.getElementById('file').value = null;
        let image_value = document.getElementById('file').value;
        
        let data = this.state.file;
        // Create an object of formData
        const formData = new FormData();
        for (let i = 0; i < data.length; i++) {
            //Update the formData object
            formData.append("fileName[]", data[i]);
        }

        let header = {
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Origin": "*",
        };
        
        //  Service.post({
        //     url: 'api/multiple-image-upload',
        //     body: formData,
        //     header : header
        //   })
        //   .then(response => {
        //       console.log(response)
        //     let data = response;
        //       if(data) {
        //         self.setState({ successMessage: 'Images successful Add...' });
        //         console.log(self.state.successMessage)
        //       }  
        //   })
        //   .catch(err => {
        //      //console.log(err)
        //   });

        axios.post(API_BASE_URL + 'api/multiple-image-upload', formData)
            .then(function (response) {
                console.log(response)
                if (response.status === 200) {
                    self.setState({ 'successMessage': 'Images successful Add...' });
                    //self.handleClickEmp();
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
  }

    render() {
        return (<>
             {(this.state.successMessage)?<div className="alert alert-success" role="alert">{this.state.successMessage}</div>:''}
            <form onSubmit={this.handleSubmit} encType="multipart/form-data">
                <div className="form-group multi-preview">
                    {(this.fileArrayUrl || []).map(url => (
                        <img key={url} src={url} alt="..." style={{ height: 70, width: 70 }} />
                    ))}
                </div>

                <div className="form-group">
                    <input type="file" id="file" className="form-control" name="fileName[]" onClick={(event) => { event.target.files = null }} onChange={this.uploadMultipleFiles} multiple />
                </div>
                <div className="text-danger">{this.state.errors.fileName}
              </div>
                <button type="submit" className="btn btn-danger btn-block" >Upload</button>
            </form >
        </>
        )
    }
}
export default withRouter(MultipleImageUpload);