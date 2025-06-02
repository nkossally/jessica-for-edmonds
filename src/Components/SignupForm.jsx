import { useState, useEffect } from "react";
import classNames from "classnames";
import { Input } from "./Input";
import { fabClasses } from "@mui/material";
import { signUp } from "../requests";

export const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    email: "",
    address: "",
    subscribeOption: false,
  });
  const [isFormValid, setIsFormValid] = useState(false)

  useEffect(()=>{
    setIsFormValid(validateForm())

  }, [formData])

  const [errors, setErrors] = useState({});

  const handleChange = (validationCallback) => (e) => {
    const { name, value } = e.target;
    let newFormData = { ...formData, [name]: value };
    if (name === "number") {
      const numbersOnly = value.replace(/\D/g, "");
      const formatted = formatPhoneNumber(numbersOnly);
      newFormData = { ...formData, number: formatted };
    }
    if(name === "subscribeOption"){
      const checked = e.target.checked
      if(formData.subscribeOption){
         newFormData = { ...formData, subscribeOption: false };
      } else {
           newFormData = { ...formData, subscribeOption: true };      
      }
    }

    setFormData(newFormData);
    if (validationCallback) {
      validationCallback(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    const resp  = await signUp(formData)
  };

  const validateForm = () => {
    validateName(formData.name)
    validateEmail(formData.email)
    validateNumber(formData.number)
    return validateName(formData.name) && validateEmail(formData.email) && validateNumber(formData.number)
  };

  const validateName = (nameInput) => {
    if (!nameInput) {
      setErrors((prev) => ({ ...prev, name: "Please enter your full name." }));
      return false
    } else {
      setErrors((prev) => ({ ...prev, name: "" }));
      return true;
    }
  };

  const validateNumber = (numberInput) => {
    const numbersOnly = numberInput.replace(/\D/g, "").slice(0, 11);

    if (!numbersOnly) {
      setErrors((prev) => ({
        ...prev,
        number: "Please enter a valid phone number.",
      }));
      return fabClasses;
    }
    if (numbersOnly.length !== 10 && numbersOnly.length !== 11) {
      setErrors((prev) => ({
        ...prev,
        number: "Please enter a valid phone number.",
      }));
      return false;
    }
    if (numbersOnly.length === 11 && numbersOnly[0] !== "1") {
      setErrors((prev) => ({
        ...prev,
        number: "Please enter a valid phone number.",
      }));
      return false;
    }
    setErrors((prev) => ({
      ...prev,
      number: "",
    }));
    return true;
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
    if (!emailInput || !emailInput.includes("@") || !emailInput.includes(".")) {
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
      <label className="subscribe-option-input">
        <input
          name="subscribeOption"
          type="checkbox"
          checked={formData.subscribeOption}        
          onChange={handleChange()}
        />
        I agree to receive emails from this campaign.
      </label>

      <button type="submit" onClick={handleSubmit} disabled={!isFormValid} className={(isFormValid ? "submit-volunteer-valid" : "submit-volunteer")}>
        Submit
      </button>
    </form>
  );
};
