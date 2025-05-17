import React, { useState, useEffect } from "react";
import "./AssignmentsTable.css";
import Lottie from "react-lottie";
import animationData from "@/assets/Animation-loading-assignments.json";
import useAuthStore from "@/hooks/useAuthStore";

interface Assignment {
    id: string;
    title: string;
    course: string;
    dueDate: string;
    status: string;
    grade?: string;
}

const AssignmentsTable: React.FC = () => {
    const [assignments, setAssignments] = useState < Assignment[] > ([]);
    const [isLoading, setIsLoading] = useState < boolean > (true);
    const [error, setError] = useState < string > ("");
    const { username, studentId, institution } = useAuthStore();

    useEffect(() => {
        const fetchAssignments = async () => {
            try {
                const API_URL = import.meta.env.VITE_API_URL;
                const response = await fetch(`${API_URL}/assignments`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ username, studentId, institution }),
                });

                const data = await response.json();
                setIsLoading(false);

                if (response.status === 200) {
                    setAssignments(data.assignments);
                } else {
                    setError("שגיאה בטעינת המטלות. נסה שוב מאוחר יותר.");
                }
            } catch (error) {
                setIsLoading(false);
                setError("שגיאה בטעינת המטלות. נסה שוב מאוחר יותר.");
            }
        };

        fetchAssignments();
    }, [username, studentId, institution]);

    if (isLoading) {
        return (
            <div className="assignments-loader">
                <Lottie
                    options={{
                        animationData,
                        loop: true,
                        autoplay: true,
                        rendererSettings: {
                            preserveAspectRatio: "xMidYMid slice",
                        },
                    }}
                    height={200}
                    width={200}
                />
            </div>
        );
    }

    if (error) {
        return <div className="assignments-error">{error}</div>;
    }

    return (
        <div className="assignments-table">
            <table>
                <thead>
                    <tr>
                        <th>מטלה</th>
                        <th>קורס</th>
                        <th>תאריך הגשה</th>
                        <th>סטטוס</th>
                        <th>ציון</th>
                    </tr>
                </thead>
                <tbody>
                    {assignments.map((assignment) => (
                        <tr key={assignment.id}>
                            <td>{assignment.title}</td>
                            <td>{assignment.course}</td>
                            <td>{assignment.dueDate}</td>
                            <td>{assignment.status}</td>
                            <td>{assignment.grade || "-"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AssignmentsTable; 