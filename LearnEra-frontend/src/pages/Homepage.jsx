import React, { useState } from 'react'
import { Link } from 'react-router-dom'
const getValue = () =>{
  const [value, setvalue] = useState(0)
  return {value,setvalue};
}
const ShowCount = () => {
  const {value,setvalue} = getValue();
  return (
    <div onClick={()=>setvalue(v=>v+1)}>{value}</div>

  )
}
const Homepage = () => {
  return (
    <div>
        <h1>Homepage</h1>
        <div >Search courses</div>
        <ShowCount />
        <Link to='/courses'>Courses</Link>
        
    </div>
  )
}

export default Homepage