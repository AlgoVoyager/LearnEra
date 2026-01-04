import { useEffect, useState } from "react";
import axios from "axios";
const useProfile = () => {
    const [profile, setProfile] = useState({});
    useEffect(() => {
        const fetchProfile = async () => {
            const response = await axios.get("/profile");
            const data = await response.json();
            setProfile(data);
        };
        fetchProfile();
    }, []);
    return profile;
}
export default useProfile;