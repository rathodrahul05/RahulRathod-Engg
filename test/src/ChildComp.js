import React, { useEffect } from 'react'

function ChildComp(props) {
    useEffect(()=>{
    },[])
    console.log('child render')
  return (
    <div>ChildComp {props.count}</div>
  )
}

export default ChildComp