import React, { useState } from "react";

import {Input} from "./Input"

export const SignupForm = () => {
  const [formData, setFormData] = useState({ name: "", number: "", email: "", address: "" });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData)
    validateForm(newFormData)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData({ name: "", number: "" });
  };

  const validateForm = (newFormData) =>{
    validateName(newFormData)
  }

  const validateName = (newFormData) =>{
    if(!newFormData.name){
      setErrors((prev) => ({...prev, name: "Please enter your full name"}))
    } else {
      setErrors((prev) => ({...prev, name: ""}))

    }
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <Input name={"name"} error={errors.name} label={"Full Name"} type={"text"} value={formData.name} handleChange={handleChange} required={true}/>
      <div className="input-element-container">
        <label className="input-label">Full Name</label>
        <input
          type="text"
          name="name"
          className="input-element"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      {errors.name && <div classname="form-error">{errors.name}</div>}
      <div className="">
        <label className="">Phone Number</label>
        <input
          type="text"
          name="number"
          value={formData.number}
          onChange={handleChange}
          required
        />
      </div>
      <div className="">
        <label className="">Email</label>
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="">
        <label className="">Your Address</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="">
        Submit
      </button>
    </form>
  );
};
