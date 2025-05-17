import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "@/hooks/useAuthStore";

const Home: React.FC = () => {
    const navigate = useNavigate();
    const { username, studentId, institution } = useAuthStore();

    useEffect(() => {
        if (!username || !studentId || !institution) {
            navigate("/", { replace: true });
        }
    }, [username, studentId, institution, navigate]);

    return (
        <div className="home">
            <h1>ברוך הבא, {username}!</h1>
            <p>תעודת זהות: {studentId}</p>
            <p>מוסד לימודי: {institution}</p>
        </div>
    );
};

export default Home; 