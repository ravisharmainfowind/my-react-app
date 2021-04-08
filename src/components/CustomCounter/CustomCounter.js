import React, { useState, useEffect } from 'react';  
import { withRouter } from "react-router-dom";
import Child from '../ChildtoParent/Child';
  
const useDocumentTitle = title => {  
  useEffect(() => {  
    document.title = title;  
  }, [title])  
}  
  
function CustomCounter() {  
  const [count, setCount] = useState(0);  
  const incrementCount = () => setCount(count + 1);  
  useDocumentTitle(`You clicked ${count} times`);  
  // useEffect(() => {  
  //   document.title = `You clicked ${count} times`  
  // });  
  
  return (  
    <div>  
        <Child/>
      <p>You clicked {count} times</p>  
      <button onClick={incrementCount}>Click me</button>  
    </div>  
  )  
}  
export default withRouter(CustomCounter);  