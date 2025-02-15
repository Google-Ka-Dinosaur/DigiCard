import React, { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";

const Faculty = () => {
    const { user } = useContext(UserContext);
    const [request, setRequest] = useState({
        requestType: "out",
        timings: "",
        purpose: ""
    });

    const handleChange = (e) => {
        setRequest({ ...request, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const userRequests = JSON.parse(localStorage.getItem("requests")) || [];
        userRequests.push({ username: user.username, role: "faculty", ...request });
        localStorage.setItem("requests", JSON.stringify(userRequests));
        alert("Request submitted!");
    };

    return (
        <div>
            <h2>Welcome, {user.username} (Faculty)</h2>
            <form onSubmit={handleSubmit}>
                <label>Purpose: <input type="text" name="purpose" onChange={handleChange} required /></label>
                <label>Type: 
                    <select name="requestType" onChange={handleChange}>
                        <option value="out">Out</option>
                        <option value="in">In</option>
                    </select>
                </label>
                <label>Timings: <input type="datetime-local" name="timings" onChange={handleChange} required /></label>
                <button type="submit">Submit Request</button>
            </form>
        </div>
    );
};

export default Faculty;
