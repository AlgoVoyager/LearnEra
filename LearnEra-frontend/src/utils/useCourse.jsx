import {useEffect, useState} from "react";
import axios from "axios";
const useCourse = () => {
    const [courses, setCourses] = useState([]);
    const [purchasedCourses, setpurchasedCourses] = useState([])
    const [loadingCourses, setloadingCourses] = useState(false)
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchCourses = async () => {
            setloadingCourses(true)
            const response = await axios.get("v1/course/courses",{
                headers: {
                    token: token,
                },
            });
            setCourses(response.data.courses);
            setloadingCourses(false)
        };
        const fetchPurchasedCourses = async () => {
            setloadingCourses(true)
            const response = await axios.get("v1/course/purchases",{
                headers: {
                    token: token,
                },
            });
            setpurchasedCourses(response.data.purchases);
            setloadingCourses(false)
        };
        fetchCourses();
        fetchPurchasedCourses();
    }, []);
    return {
        courses,
        purchasedCourses,
        loadingCourses
    };
}
export default useCourse
