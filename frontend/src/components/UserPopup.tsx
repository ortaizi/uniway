import React, { useState, useEffect } from "react";
import "./UserPopup.css";
import Lottie from "react-lottie";
import { FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import animationData from "@/assets/Animation-loading-userpopup.json";
import useAuthStore from "@/hooks/useAuthStore";

interface UserPopupProps {
    onClose: () => void;
}

const UserPopup: React.FC<UserPopupProps> = ({ onClose }) => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [studentId, setStudentId] = useState<string>("");
    const [institution, setInstitution] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");

    const navigate = useNavigate();
    const { username: storedUsername, studentId: storedStudentId, institution: storedInstitution, setAuth, clearAuth } = useAuthStore();

    useEffect(() => {
        setUsername(storedUsername);
        setStudentId(storedStudentId);
        setInstitution(storedInstitution);
    }, [storedUsername, storedStudentId, storedInstitution]);

    const handleSave = async () => {
        setIsLoading(true);
        setMessage("");

        try {
            const API_URL = import.meta.env.VITE_API_URL;

            const response = await fetch(`${API_URL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password, studentId, institution }),
            });

            const data = await response.json();
            setIsLoading(false);

            if (response.status === 200 && data.status === "success") {
                setAuth({
                    username,
                    studentId,
                    institution,
                    accessToken: data.access_token,
                    encryptedPassword: data.encrypted_password,
                    rememberMe: true
                });

                setMessage("✅ הפרטים עודכנו בהצלחה וההתחברות הצליחה.");
            } else {
                setMessage("❌ ההתחברות נכשלה. נא לבדוק את הפרטים.");
            }
        } catch (error) {
            setIsLoading(false);
            setMessage("❌ שגיאה בלתי צפויה. נסה שוב.");
        }
    };

    const handleLogout = () => {
        clearAuth();
        navigate("/", { replace: true });
    };

    return (
        <div className="user-popup">
            <div className="user-popup-inner">
                <button className="popup-close" onClick={onClose}>
                    <FiX />
                </button>

                <h2>הפרטים שלי</h2>

                <label>תעודת זהות</label>
                <input
                    type="text"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                />

                <label>שם משתמש</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <label>סיסמה</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <label>מוסד לימודי</label>
                <select
                    value={institution}
                    onChange={(e) => setInstitution(e.target.value)}
                >
                    <option value="">בחר מוסד</option>
                    <option value="אוניברסיטת בן-גוריון">אוניברסיטת בן-גוריון</option>
                    <option value="אוניברסיטת תל אביב">אוניברסיטת תל אביב</option>
                    <option value="אוניברסיטה עברית">האוניברסיטה העברית</option>
                    <option value="אוניברסיטת חיפה">אוניברסיטת חיפה</option>
                    <option value="הטכניון">הטכניון</option>
                    <option value="מכללת ספיר">מכללת ספיר</option>
                    <option value="אוניברסיטת רייכמן">אוניברסיטת רייכמן</option>
                </select>

                {isLoading ? (
                    <div className="popup-loader">
                        <Lottie
                            options={{
                                animationData,
                                loop: true,
                                autoplay: true,
                                rendererSettings: {
                                    preserveAspectRatio: "xMidYMid slice",
                                },
                            }}
                            height={100}
                            width={100}
                        />
                    </div>
                ) : (
                    <>
                        <button className="save-button" onClick={handleSave}>
                            שמירת שינויים
                        </button>
                        <button className="logout-button" onClick={handleLogout}>
                            התנתקות
                        </button>
                    </>
                )}

                {message && <p className="popup-message">{message}</p>}
            </div>
        </div>
    );
};

export default UserPopup; 