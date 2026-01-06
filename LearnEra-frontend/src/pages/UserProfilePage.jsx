import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'
import { CourseCard } from '../manifest';
import { UserContext } from '../context/userContext';
import { CourseContext } from '../context/coursesContext'
import { useContext } from 'react';
import useCourse from '../utils/useCourse';


const ProfilePage = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  if(!token) navigate('/auth')

  const {user, loadingUser} = useContext(UserContext);
  const { purchasedCourses} = useCourse();
  
  return (
    <div className='container w-4/5  mx-auto space-y-10 py-5 '>
      <div className="user-details flex flex-col gap-5">
        <h1 className='mx-auto'>User Profile</h1>
        {!loadingUser&&(<>
          <h1>Name: {user.firstName} {user.lastName}</h1>
          <p>Email: {user.email}</p>
        </>
        )}
      </div>

      <div className="purchasedCourses w-full flex flex-col gap-5">
        <h2 className='text-2xl text-center'>Your Enrolled Courses</h2>
        <div className="purchasedCourse-container">
            {purchasedCourses?.length!=0?purchasedCourses?.map(course=>(
              <CourseCard key={course._id} course={course} />
            )):"No Courses Purchased yet!"}
        </div>
      </div>
      
    </div>
  )
}

export default ProfilePage