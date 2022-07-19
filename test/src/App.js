import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import ChildComp from './ChildComp';

function App() {
  const [count,setCount]=useState(0)
  console.log('parent render')
  useEffect(()=>{
  },[])
  const handleClick=()=>{
      setCount(count+1)
  }
  return (
    <div className="App">
      <button onClick={()=>handleClick()}>Click</button>
      <ChildComp count={count}/>
    </div>
  );
}

export default App;
