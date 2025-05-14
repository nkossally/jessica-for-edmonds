import { useState } from "react";
import classNames from "classnames";
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
    let newFormData = { ...formData, [name]: value };
    if (name === "number") {
      const numbersOnly = value.replace(/\D/g, "");
      const formatted = formatPhoneNumber(numbersOnly);
      newFormData = { ...formData, number: formatted };
    }

    setFormData(newFormData);
    if (validationCallback) {
      validationCallback(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData({ name: "", number: "" });
  };

  const validateForm = () => {
    return validateName(formData.name) && validateEmail(formData.email) && validateNumber(formData.number)
  };

  const validateName = (nameInput) => {
    if (!nameInput) {
      setErrors((prev) => ({ ...prev, name: "Please enter your full name." }));
    } else {
      setErrors((prev) => ({ ...prev, name: "" }));
    }
  };

  const validateNumber = (numberInput) => {
    const numbersOnly = numberInput.replace(/\D/g, "");

    if (!numbersOnly) {
      setErrors((prev) => ({
        ...prev,
        number: "Please enter a valid phone number.",
      }));
      return;
    }
    if (numbersOnly.length !== 10 && numbersOnly.length !== 11) {
      setErrors((prev) => ({
        ...prev,
        number: "Please enter a valid phone number.",
      }));
      return;
    }
    if (numbersOnly.length === 11 && numbersOnly[0] !== "1") {
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
    numberInput = numberInput.slice(0, 11);
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
    if (numberInput.length === 11 && numberInput[0] === "1") {
      formatted = `1 (${numberInput.slice(1, 4)}) ${numberInput.slice(
        4,
        7
      )}-${numberInput.slice(7, 11)}`;
    }

    return formatted;
  };

  const validateEmail = (emailInput) => {
    console.log("emailInput", emailInput)
    if (!emailInput || !emailInput.includes("@") || !emailInput.includes(".")) {
      console.log(!emailInput , !emailInput.includes("@") , !emailInput.includes(".")) 
      setErrors((prev) => ({ ...prev, email: "Please enter a valid email." }));
      return false;
    }
    setErrors((prev) => ({ ...prev, email: "" }));
    return true;
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
        type={"text"}
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
        handleChange={handleChange(validateEmail)}
        required={true}
      />
      <Input
        name={"address"}
        error={errors.address}
        label={"Your Address"}
        type={"text"}
        value={formData.address}
        handleChange={handleChange()}
        required={false}
      />

      <button type="submit" disabled={true} className={classNames("submit-volunteer")}>
        Submit
      </button>
    </form>
  );
};
