 import React from 'react';
 import { withRouter } from "react-router-dom";

class Child extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data: null
        }
    }

    handleCallback = (childData) =>{
        this.setState({data: childData})
    }

    render(){
        const {data} = this.state;
        return(
            <div>
                <h1> test </h1>
                <ChildTwo parentCallback = {this.handleCallback}/>
                {data}
            </div>
        )
    }
}

class ChildTwo extends React.Component{
  
    onTrigger = (event) => {
        this.props.parentCallback("Data from child");
        event.preventDefault();
    }

    render(){
        return(
        <div>
            <form onSubmit = {this.onTrigger}>
                <input type = "submit" value = "Submit"/>
            </form>
        </div>
        )
    }
}

 export default withRouter(Child);