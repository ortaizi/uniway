import React, { useState, FormEvent, ChangeEvent } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import Lottie from 'react-lottie';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import animationData from '@/assets/Animation-loading-login.json';
import successAnimation from '@/assets/Animation-successfullogin.json';
import loginMainAnimation from '@/assets/ani-main-login.json';
import { LoginFormData, LoginResponse, ValidationError } from '@/types/auth';
import useAuthStore from '@/hooks/useAuthStore';

const Login: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [studentId, setStudentId] = useState<string>('');
    const [institution, setInstitution] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [loginSuccess, setLoginSuccess] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showSuccess, setShowSuccess] = useState<boolean>(false);
    const navigate = useNavigate();
    const setAuth = useAuthStore(state => state.setAuth);

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const API_URL = import.meta.env.VITE_API_URL;
            const remember = (document.querySelector('input[type="checkbox"]') as HTMLInputElement).checked;

            // Validate inputs before sending
            if (username.trim().length < 3) {
                setMessage('❌ שם המשתמש חייב להכיל לפחות 3 תווים');
                setLoading(false);
                return;
            }

            if (password.trim().length < 4) {
                setMessage('❌ הסיסמה חייבת להכיל לפחות 4 תווים');
                setLoading(false);
                return;
            }

            if (studentId.trim().length < 4) {
                setMessage('❌ מספר תעודת זהות חייב להכיל לפחות 4 תווים');
                setLoading(false);
                return;
            }

            const payload: LoginFormData = {
                username: username.trim(),
                password: password.trim(),
                studentId: studentId.trim(),
                institution: institution.trim()
            };

            const response = await fetch(`${API_URL}/api/v1/auth/login?remember=${remember}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(payload),
                credentials: 'include'
            });

            const data: LoginResponse = await response.json();

            if (response.ok) {
                // Update auth store with new data
                setAuth({
                    username: payload.username,
                    studentId: payload.studentId,
                    institution: payload.institution,
                    accessToken: data.access_token,
                    encryptedPassword: data.encrypted_password,
                    rememberMe: remember
                });

                setTimeout(() => {
                    setLoading(false);
                    setShowSuccess(true);
                    setTimeout(() => {
                        navigate("/work");
                    }, 2000);
                }, 1000);

            } else {
                setLoading(false);
                if (response.status === 401) {
                    setMessage('❌ אופס, אחד הפרטים שגוי. נסה שוב.');
                } else if (response.status === 422) {
                    const errorDetails = data.detail as ValidationError[];
                    if (Array.isArray(errorDetails)) {
                        const errorMessages = errorDetails.map(err => {
                            // Map common validation errors to Hebrew
                            const fieldMap: Record<string, string> = {
                                'username': 'שם משתמש',
                                'password': 'סיסמה',
                                'studentId': 'מספר תעודת זהות',
                                'institution': 'מוסד לימודי'
                            };
                            const field = err.loc[1];
                            const hebrewField = fieldMap[field] || field;
                            return `${hebrewField}: ${err.msg}`;
                        }).join('\n');
                        setMessage(`❌ שגיאות אימות:\n${errorMessages}`);
                    } else {
                        setMessage(`❌ שגיאת אימות: ${data.detail}`);
                    }
                } else {
                    setMessage(`❌ שגיאה: ${data.detail || 'משהו השתבש. נסה שוב מאוחר יותר.'}`);
                }
            }

        } catch (error) {
            setLoading(false);
            setMessage('❌ שגיאה בחיבור לשרת. בדוק את החיבור שלך ונסה שוב.');
            console.error('Login error:', error);
        }
    };

    return (
        <div className="login-container" dir="rtl">
            {(loading || showSuccess) && (
                <div className="overlay-loading">
                    <div className="loading-box">
                        <Lottie
                            options={{
                                animationData: loading ? animationData : successAnimation,
                                loop: loading,
                                autoplay: true,
                                rendererSettings: {
                                    preserveAspectRatio: "xMidYMid slice",
                                },
                            }}
                            height={200}
                            width={200}
                        />
                        <div className="loading-text">
                            {loading ? "רגע, מתחברים..." : "התחברת בהצלחה 🎉"}
                        </div>
                    </div>
                </div>
            )}

            <div className={`form-section ${loading || showSuccess ? "blurred" : ""}`}>
                <div className="form-inner">
                    <h2>אנחנו מתחברים – אתה מתפנה ללמוד.</h2>
                    <p>
                        תן לנו רגע לזהות אותך – ונחבר אותך בקליק לכל מערכות הלימוד שלך,
                        <br /> ומכאן? אנחנו כבר על זה.
                    </p>

                    <form onSubmit={handleLogin}>
                        <label htmlFor="studentId">מספר תעודת זהות</label>
                        <input
                            type="text"
                            id="studentId"
                            placeholder="הכנס ת״ז"
                            value={studentId}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setStudentId(e.target.value)}
                            required
                            minLength={4}
                        />

                        <label htmlFor="username">שם משתמש</label>
                        <input
                            type="text"
                            id="username"
                            placeholder="הכנס שם משתמש"
                            value={username}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                            required
                        />

                        <label htmlFor="password">סיסמה</label>
                        <div className="password-wrapper">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                placeholder="הכנס סיסמה"
                                value={password}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                                required
                                minLength={4}
                            />
                            <span
                                className="password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                                aria-label="הצג/הסתר סיסמה"
                            >
                                {showPassword ? <FiEye /> : <FiEyeOff />}
                            </span>
                        </div>

                        <label htmlFor="institution">בחר מוסד לימודי</label>
                        <select
                            id="institution"
                            value={institution}
                            onChange={(e: ChangeEvent<HTMLSelectElement>) => setInstitution(e.target.value)}
                            required
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

                        <div className="form-options">
                            <label className="remember">
                                <input type="checkbox" defaultChecked />
                                <span>זכור אותי</span>
                            </label>
                            <a href="#" className="forgot">שכחת סיסמה?</a>
                        </div>

                        <button type="submit" disabled={loading || showSuccess}>התחברות</button>
                    </form>

                    {message && <p className="login-message">{message}</p>}
                </div>
            </div>

            <div className="image-section">
                <Lottie
                    options={{
                        animationData: loginMainAnimation,
                        loop: true,
                        autoplay: true,
                        rendererSettings: {
                            preserveAspectRatio: "xMidYMid slice",
                        },
                    }}
                    height={600}
                    width={600}
                />
            </div>
        </div>
    );
};

export default Login; 