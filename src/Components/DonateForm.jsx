import { useState, useEffect } from "react";
import classNames from "classnames";
import { Input } from "./Input";
import { fabClasses } from "@mui/material";
import { signUp } from "../requests";

export const DonateForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    cardNumber: "",
    expiration: "",
    cvccvv: "",
    zip: "",
    amount: "",
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [showCustomAmountInput, setShowCustomAmountInput] = useState(false);

  useEffect(() => {
    setIsFormValid(validateForm());
  }, [formData]);

  const [errors, setErrors] = useState({});

  const handleChange = (validationCallback) => (e) => {
    const { name, value } = e.target;
    let newFormData = { ...formData, [name]: value };

    setFormData(newFormData);
    if (validationCallback) {
      validationCallback(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resp = await signUp(formData);
    console.log("resp", resp);
  };

  const validateForm = () => {
    return (
      validateName(formData.name) &&
      validateEmail(formData.email)
    );
  };

  const validateName = (nameInput) => {
    if (!nameInput) {
      setErrors((prev) => ({ ...prev, name: "Please enter your full name." }));
      return false;
    } else {
      setErrors((prev) => ({ ...prev, name: "" }));
      return true;
    }
  };

  const validateEmail = (emailInput) => {
    if (!emailInput || !emailInput.includes("@") || !emailInput.includes(".")) {
      setErrors((prev) => ({ ...prev, email: "Please enter a valid email." }));
      return false;
    }
    setErrors((prev) => ({ ...prev, email: "" }));
    return true;
  };

  const handleAmountButton = (customAmount) => () =>{
    setShowCustomAmountInput(false)
    setFormData({...formData, amount: customAmount });
  }

  const handleShowCustomAmount = () =>{
    setFormData({...formData, amount: 0 });
    setShowCustomAmountInput(true)
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="amount-buttons">
        <button onClick={handleAmountButton(10)}> 10</button>
        <button  onClick={handleAmountButton(20)}> 20</button>
        <button  onClick={handleAmountButton(100)}> 100</button>
      </div>

      {!showCustomAmountInput && <button onClick={handleShowCustomAmount}> custom</button>}

      {showCustomAmountInput && (
        <Input
          name={"amount"}
          error={errors.amount}
          label={"Amount"}
          type={"number"}
          value={formData.amount}
          handleChange={handleChange()}
          required={false}
        />
      )}

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
      <Input
        name="cardNumber"
        type="text"
        error={errors.cardNumber}
        label={"Card Number"}
        value={formData.cardNumber}
        handleChange={handleChange()}
        required={true}
        images={[
          process.env.PUBLIC_URL + "/" + "american-express.svg",
          process.env.PUBLIC_URL + "/" + "discover.svg",
          process.env.PUBLIC_URL + "/" + "visa.svg",
          process.env.PUBLIC_URL + "/" + "mastercard.svg",
        ]}
      />

      <Input
        name="expiration"
        type="text"
        error={errors.expiration}
        label={"Expiration Date"}
        value={formData.expiration}
        handleChange={handleChange()}
        required={true}
      />
      <Input
        name="cardNumber"
        type="text"
        error={errors.cvccvv}
        label={"CVC/CVV"}
        value={formData.cvccvv}
        handleChange={handleChange()}
        required={false}
      />
      <Input
        name="zip"
        type="text"
        error={errors.zip}
        label={"Zip Code"}
        value={formData.zip}
        handleChange={handleChange()}
        required={false}
      />
      <button
        type="submit"
        onClick={handleSubmit}
        disabled={!isFormValid}
        className={isFormValid ? "submit-volunteer-valid" : "submit-volunteer"}
      >
        Submit
      </button>
    </form>
  );
};
