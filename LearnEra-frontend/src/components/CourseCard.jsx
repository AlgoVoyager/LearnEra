import React from 'react'

const CourseCard = ({course}) => {
  return (
    <div className='course-card flex flex-col gap-3 w-1/3 items-start justify-between bg-gray-800 p-5'>
        <div className="upper-card">
          <img className='w-full max-h-2/5 object-cover' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9efgAKI3liOyMT5wCFpiupBReM6dTiNXUQw&s" alt="" />
          <h1>{course.title}</h1>
        </div>
        <div className="lower-card space-y-2">
          <p>{course.description}</p>
          <p>${course.price}</p>
          <p>Created by {course.creatorId}</p>
          <div className="buttons space-x-2">
            <button className=''>
              View
            </button>
           {!course.userId&& <button className=''>
              buy
            </button>}
          </div>
        </div>
    </div>
  )
}

export default CourseCard