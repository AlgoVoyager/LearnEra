import axios from 'axios'
import {useState,useEffect, createContext} from 'react'

const CourseContext = createContext();

const CourseContextProvider = ({children}) => {
    const [allCourses, setallCourses] = useState([])
    const [purchasedCourses, setpurchasedCourses] = useState([])
    const [loadingCourses, setloadingCourses] = useState(false)
    const [errorCourseFetch, seterrorCourseFetch] = useState(null)

    const token = localStorage.getItem('token')

    useEffect(()=>{
        async function fetchAllCourses() {
            try {
                const res = await axios.get('/v1/course/courses')
                setallCourses(res.data.courses)
            } catch (error) {
                console.error(error)
            }
        }
        fetchAllCourses()
    },[])
  return (
    <CourseContext.Provider value={{allCourses,purchasedCourses,loadingCourses,errorCourseFetch}}>
        {children}
    </CourseContext.Provider>
  )
}

export { CourseContext, CourseContextProvider}