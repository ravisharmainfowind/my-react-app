import React, { useState, useEffect } from 'react';  
import { withRouter } from "react-router-dom";
import Parent from '../ParenttoChild/Parent';
  
function CounterExample() {  
  const [count, setCount] = useState(0);  
  
  // Similar to componentDidMount and componentDidUpdate:  
  useEffect(() => {  
    // Update the document title using the browser API  
    document.title = `You clicked ${count} times`;  
  });  
  
  return (  
    <div>  
        <Parent/>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>  
        Click me  
      </button>  
    </div>  
  );  
}  
export default withRouter(CounterExample);