"use client"; // Necessary for using client-side functionality in Next.js 13+

import { useState } from "react";
import style from "./style.module.css"
import { POST } from "../api/users/route";

const Page = () => {
  // State to hold the form values
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    username: "",
  });

  // State to manage form errors
  const [errors, setErrors] = useState({});

  // Handle input changes and update state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  // Validate form inputs
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.email) newErrors.email = "Email is required.";
    if (!formData.phone) newErrors.phone = "Phone is required.";
    if (!formData.username) newErrors.username = "Username is required.";

    setErrors(newErrors);

    // Return true if no errors
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate the form before submission
    if (validateForm()) {
        let response = await fetch("http://localhost:3000/api/users",{
            method:"POST",
            body:JSON.stringify(formData)
        })
        response = response.json()
        console.log(response)
        alert("User has been created successfully")
      // Perform the submit action
      console.log("Submitted Data:", formData);
    } else {
      console.log("Validation errors:", errors);
    }
  };

  return (
    <div className={style['form-container']}>
      <h1 className={style.pageHeader}>User Details Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label className={style.fieldLabel} htmlFor="name">Name:</label>
          <input
          className={style.fieldInput}
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <span className={style.error}>{errors.name}</span>}
        </div>

        <div>
          <label className={style.fieldLabel} htmlFor="email">Email:</label>
          <input
          className={style.fieldInput}
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span className={style.error}>{errors.email}</span>}
        </div>

        <div>
          <label className={style.fieldLabel} htmlFor="phone">Phone:</label>
          <input
          className={style.fieldInput}
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && <span className={style.error}>{errors.phone}</span>}
        </div>

        <div>
          <label className={style.fieldLabel} htmlFor="username">Username:</label>
          <input
          className={style.fieldInput}
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          {errors.username && <span className={style.error}>{errors.username}</span>}
        </div>

        <button type="submit" className={style["submit-button"]}>Submit</button>
      </form>
    </div>
  );
};

export default Page;
