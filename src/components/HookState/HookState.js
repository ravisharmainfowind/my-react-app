import React, {useState} from 'react';
import { withRouter } from "react-router-dom";  
  
function HookState() {  
  // Declare a new state variable, which we'll call "count"  
  const [count, setCount] = useState(0);  
  
  return (  
    <div>  
      <p>You clicked {count} times</p>  
      <button onClick={() => setCount(count + 1)}>  
        Click me  
      </button>  
    </div>  
  );  
}  
//export default HookState;  
export default withRouter(HookState);