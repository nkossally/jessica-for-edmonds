import React, { useState } from "react";

import { Input } from "./Input";

export const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    email: "",
    address: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (validationCallback) => (e) => {
    const { name, value } = e.target;
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);
    validationCallback(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData({ name: "", number: "" });
  };

  const validateForm = () => {
    validateName(formData);
  };

  const validateName = (nameInput) => {
    if (!nameInput) {
      setErrors((prev) => ({ ...prev, name: "Please enter your full name" }));
    } else {
      setErrors((prev) => ({ ...prev, name: "" }));
    }
  };

  const validateNumber = (numberInput) => {
    const formatted = formatPhoneNumber(numberInput);
    console.log(formatted);
    console.log("numberInput", numberInput);
    if (!numberInput) {
      setErrors((prev) => ({
        ...prev,
        number: "Please enter a valid phone number.",
      }));
      return;
    }
    if (numberInput.length !== 10 && numberInput.length !== 11) {
      setErrors((prev) => ({
        ...prev,
        number: "Please enter a valid phone number.",
      }));
      return;
    }
    if(numberInput.length === 11 && numberInput[0] !== "1"){
            setErrors((prev) => ({
        ...prev,
        number: "Please enter a valid phone number.",
      }));
      return;
    }
    setErrors((prev) => ({
      ...prev,
      number: "",
    }));
  };

  const formatPhoneNumber = (numberInput) => {

        let formatted = numberInput;

        if (numberInput.length > 0) {
            formatted = `(${numberInput.slice(0, 3)}`;
        }
        if (numberInput.length > 3) {
            formatted += `) ${numberInput.slice(3, 6)}`;
        }
        if (numberInput.length > 6) {
            formatted += `-${numberInput.slice(6)}`;
        }
        if (numberInput.length === 11 && numberInput[0] === "1"){
            formatted = `1 (${numberInput.slice(1, 4)}) ${numberInput.slice(4, 7)}-${numberInput.slice(7, 11)}`;
        }

        return formatted;
    };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <Input
        name={"name"}
        error={errors.name}
        label={"Full Name"}
        type={"text"}
        value={formData.name}
        handleChange={handleChange(validateName)}
        required={true}
      />
      <Input
        name={"number"}
        error={errors.number}
        label={"Phone Number"}
        type={"number"}
        value={formData.number}
        handleChange={handleChange(validateNumber)}
        required={true}
      />
      <Input
        name={"email"}
        error={errors.email}
        label={"Email"}
        type={"text"}
        value={formData.email}
        handleChange={handleChange}
        required={true}
      />
      <Input
        name={"address"}
        error={errors.address}
        label={"Your Address"}
        type={"text"}
        value={formData.address}
        handleChange={handleChange}
        required={false}
      />

      <button type="submit" className="">
        Submit
      </button>
    </form>
  );
};
