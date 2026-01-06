import React, { useState } from 'react'
import useCourse from '../utils/useCourse'
import CourseCard from '../components/CourseCard'
import { useEffect } from 'react';
const CoursesPage = () => {
    const { courses, loadingCourses } = useCourse();
    const [filteredCourse, setFilteredCourse] = useState([]);
    const [searchCourse, setSearchCourse] = useState("");

    useEffect(() => {
        if (courses) {
            setFilteredCourse(courses);
        }
    }, [courses]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (courses) {
                const filtered = courses.filter((course) =>
                    course.title.toLowerCase().includes(searchCourse.toLowerCase()) ||
                    course.price.toString().includes(searchCourse)
                );
                setFilteredCourse(filtered);
            }
        }, 500); // 500ms debounce

        return () => clearTimeout(timer);
    }, [searchCourse, courses]);

    const handleSearch = (e) => {
        setSearchCourse(e.target.value);
    };

    return (
        <div className='space-y-10'>
            <h1 className='text-center my-2'>CoursesPage</h1>
            <div className="searchBox flex justify-center items-center">
                <input type="text" name='searchCourse' id='searchCourse'
                placeholder='Search Courses'
                className='px-3 py-2 rounded-lg'
                value={searchCourse}
                onChange={handleSearch} />
            </div>
            <div className="courses-container flex flex-wrap w-full justify-center gap-5">
                {loadingCourses
                ?(<div>Loading.....</div>)
                :filteredCourse.length!=0&&filteredCourse?.map((course) => (
                    <CourseCard key={course._id} course={course}/>
                ))}
            </div>
        </div>
    )
}

export default CoursesPage
