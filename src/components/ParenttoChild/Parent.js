import React from 'react';
import { withRouter } from "react-router-dom";

class Parent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data: 'Data from parent'
        }
    }

    render(){
        const data = this.state.data;
        return(
            <div>
                <Child dataParentToChild = {data}/>
            </div>
        )
    }
}

class Child extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data: this.props.dataParentToChild
        }
    }
    
    render(){
        const {data} = this.state;
        return(
            <div>
                {data}
            </div>
        )    
    }
}
export default withRouter(Parent);