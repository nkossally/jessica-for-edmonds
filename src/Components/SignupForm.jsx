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
      <Input name={"number"} error={errors.number} label={"Phone Number"} type={"text"} value={formData.number} handleChange={handleChange} required={true}/>
      <Input name={"email"} error={errors.email} label={"Email"} type={"text"} value={formData.email} handleChange={handleChange} required={true}/>
      <Input name={"address"} error={errors.address} label={"Your Address"} type={"text"} value={formData.address} handleChange={handleChange} required={true}/>

      <button type="submit" className="">
        Submit
      </button>
    </form>
  );
};
