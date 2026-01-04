import React from 'react'
import useCourse from '../utils/useCourse'
import CourseCard from '../components/CourseCard'
const CoursesPage = () => {
    const { courses,loadingCourses } = useCourse();
    return (
        <div>
            <h1 className='text-center'>CoursesPage</h1>
            <div className="courses-container flex flex-wrap w-full justify-center gap-5">
                {loadingCourses
                ?(<div>Loading...</div>)
                :courses.length!=0&&courses?.map((course) => (
                    <CourseCard key={course._id} course={course}/>
                ))}
            </div>
        </div>
    )
}

export default CoursesPage
