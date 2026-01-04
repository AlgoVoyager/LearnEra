import React from 'react'
import useCourse from '../utils/useCourse'
import { Link } from 'react-router-dom'
const Homepage = () => {
  return (
    <div>
        <h1>Homepage</h1>
        <div>Search courses</div>
        <Link to='/courses'>Courses</Link>
        
    </div>
  )
}

export default Homepage