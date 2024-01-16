import React, { useState } from "react";
import axios from "axios";

const EditAccountInfo = () => {
    const [formData, setFormData] = useState({
        //Fields - Will add more as project expands
        email: "",
        username: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleEditAccount = async () => {
        try {
            const response = await axios.put("api/users", formData);
            
    } catch (error) {
        console.error("ERROR - Could Not Update User Account Information", error);
    }
    };
    
    return (
        <>
            <h1> Edit Account Information</h1>
            < br/>
            <form>
                <label>
                    Username
                    < br/>
                    <input 
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                </label>
                < br/>
                < br/>
                <label>
                    Password
                    < br/>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </label>
                < br/>
                <button type="button" onClick={handleEditAccount}>
                    Save changes
                </button>
            </form>
        </>
    );
};

export default EditAccountInfo;