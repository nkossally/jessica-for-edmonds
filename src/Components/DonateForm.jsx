import { useState, useEffect } from "react";
import classNames from "classnames";
import { Input } from "./Input";
import { donate } from "../requests";
import { Error } from "./Error";
import { SuccessDonate } from "./SuccessDonate";
import { Loader } from "./Loader";

const CARD_TYPES = {
  VISA: "VISA",
  MASTERCARD: "MASTERCARD",
  AMEX: "AMEX",
  DISCOVER: "DISCOVER",
};

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
  const [showCustomAmountInput, setShowCustomAmountInput] = useState(false);
  const [settledCardType, setSettledCardType] = useState("");
  const [formattedCardnumber, setFormattedCardnumber] = useState("");
  const [selectedAmountButton, setSelectedAmountButton] = useState("");
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [hasSubmissionError, setHasSubmissionError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsFormValid(validateForm());
  }, [formData]);

  useEffect(() => {}, [errors]);

  const handleChange = (validationCallback) => (e) => {
    const { name, value } = e.target;
    let newValue = value;
    if (e.target.maxLength !== -1 && newValue) {
      newValue = newValue.slice(0, e.target.maxLength);
    }
    let newFormData = { ...formData, [name]: newValue };

    setFormData(newFormData);
    if (validationCallback) {
      validationCallback(value);
    }

    validateForm();
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      const resp = await donate(formData);
      setIsLoading(false);
      if (!resp) {
        setHasSubmissionError(true);
      } else {
        setShowSuccess(true);
      }
      console.log("resp", resp);
    } catch {
      setHasSubmissionError(true);
    }
  };

  const validateForm = () => {
    validateName(formData.name);
    validateEmail(formData.email);
    validateAddress(formData.address);
    validateCardNumber(formData.cardNumber);
    validateAmount(formData.amount);
    validateExpiration();
    validateCvc(formData.cvccvv);
    validateZipCode();

    return (
      validateName(formData.name) &&
      validateEmail(formData.email) &&
      validateAddress(formData.address) &&
      validateCardNumber(formData.cardNumber) &&
      validateAmount(formData.amount) &&
      validateExpiration() &&
      validateCvc(formData.cvccvv) &&
      validateZipCode()
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

  const validateAddress = (addressInput) => {
    if (!addressInput) {
      setErrors((prev) => ({ ...prev, address: "Please enter your address." }));
      return false;
    } else {
      setErrors((prev) => ({ ...prev, address: "" }));
      return true;
    }
  };

  const validateCvc = (cvccvvInput) => {
    console.log(cvccvvInput, cvccvvInput.length === 3);
    if (cvccvvInput && cvccvvInput.length === 3) {
      console.log("seeting no errors");
      setErrors((prev) => ({ ...prev, cvccvv: "" }));
      return true;
    } else {
      console.log("setting errors");
      setErrors((prev) => ({
        ...prev,
        cvccvv: "Please enter a valid CVC/CVV number.",
      }));
      return false;
    }
  };

  const validateExpiration = () => {
    if (formData.expiration && formData.expiration.length === 7) {
      setErrors((prev) => ({ ...prev, expiration: "" }));
      return true;
    } else {
      setErrors((prev) => ({
        ...prev,
        ...prev,
        expiration: "Please enter the expiration date for your card.",
      }));
      return false;
    }
  };

  const validateZipCode = () => {
    if (formData.zip && formData.zip.length === 5) {
      setErrors({ ...errors, zip: "" });
      return true;
    } else {
      setErrors({ ...errors, zip: "Please enter a valid zip code." });
      return false;
    }
  };

  const handleAmountButton = (customAmount) => () => {
    setShowCustomAmountInput(false);
    setFormData({ ...formData, amount: customAmount });
    setSelectedAmountButton(customAmount);
  };

  const handleShowCustomAmount = () => {
    setFormData({ ...formData, amount: 0 });
    setSelectedAmountButton(undefined);
    setShowCustomAmountInput(true);
  };

  function validateCardNumber(cardNumber) {
    let onlyDigits = cardNumber.replace(/\D/g, "");
    onlyDigits = onlyDigits.slice(0, 16);

    const cardTypes = [
      { type: CARD_TYPES.VISA, regex: /^4\d{12}(\d{3})?$/, length: [13, 16] },
      {
        type: CARD_TYPES.MASTERCARD,
        regex: /^5[1-5]\d{14}|^2[2-7]\d{14}$/,
        length: [16],
      },
      { type: CARD_TYPES.AMEX, regex: /^3[47]\d{13}$/, length: [15] },
      {
        type: CARD_TYPES.DISCOVER,
        regex: /^6(?:011|5\d{2})\d{12}$/,
        length: [16],
      },
    ];

    const type = cardTypes.find((t) => t.regex.test(onlyDigits));
    const isValidLength = type
      ? type.length.includes(onlyDigits.length)
      : false;
    const isValid = !!type && isValidLength;
    const cardType = type?.type;
    setSettledCardType(cardType);
    setFormattedCardnumber(onlyDigits);

    if (
      cardType === CARD_TYPES.VISA ||
      cardType === CARD_TYPES.MASTERCARD ||
      cardType === CARD_TYPES.DISCOVER
    ) {
      if (onlyDigits?.length > 12) {
        setFormattedCardnumber(
          onlyDigits.slice(0, 4) +
            "-" +
            onlyDigits.slice(4, 8) +
            "-" +
            onlyDigits.slice(8, 12) +
            "-" +
            onlyDigits.slice(12)
        );
      } else if (onlyDigits?.length > 8) {
        setFormattedCardnumber(
          onlyDigits.slice(0, 4) +
            "-" +
            onlyDigits.slice(4, 8) +
            "-" +
            onlyDigits.slice(8)
        );
      } else if (onlyDigits?.length > 4) {
        setFormattedCardnumber(
          onlyDigits.slice(0, 4) + "-" + onlyDigits.slice(4)
        );
      }
    } else if (cardType === CARD_TYPES.AMEX) {
      if (onlyDigits?.length > 10) {
        setFormattedCardnumber(
          onlyDigits.slice(0, 5) +
            "-" +
            onlyDigits.slice(5, 10) +
            "-" +
            onlyDigits.slice(10)
        );
      } else if (onlyDigits?.length > 8) {
        setFormattedCardnumber(
          onlyDigits.slice(0, 5) + "-" + onlyDigits.slice(5)
        );
      }
    }

    if (!isValid) {
      setErrors((prev) => ({
        ...prev,
        cardNumber: "Please enter a valid card number.",
      }));
    } else {
      setErrors((prev) => ({ ...prev, cardNumber: "" }));
    }

    return isValid;
  }

  const validateAmount = (amount) => {
    if (!amount) {
      setErrors((prev) => ({
        ...prev,
        amount: "Please select an amount to donate, or enter a custom amount.",
      }));
      return false;
    } else {
      setErrors((prev) => ({ ...prev, amount: "" }));
      return true;
    }
  };

  const validateExpirationDate = (expirationInput) => {
    if (!expirationInput || expirationInput.length < 4) {
      setErrors((prev) => ({
        ...prev,
        expiration: "Please enter a valid expiration date.",
      }));
    } else {
      setErrors((prev) => ({ ...prev, expiration: "" }));
    }
    if (!expirationInput) {
      return;
    }
    const numbersOnly = expirationInput.replace(/\D/g, "");
    let trimmed = numbersOnly.slice(0, 4);
    if (trimmed.length > 2) {
      trimmed = trimmed.slice(0, 2) + " / " + trimmed.slice(2);
    }
    setFormData({ ...formData, expiration: trimmed });
  };

  let images = [
    process.env.PUBLIC_URL + "/" + "american-express.svg",
    process.env.PUBLIC_URL + "/" + "discover.svg",
    process.env.PUBLIC_URL + "/" + "visa.svg",
    process.env.PUBLIC_URL + "/" + "mastercard.svg",
  ];

  if (settledCardType === CARD_TYPES.VISA) {
    images = [process.env.PUBLIC_URL + "/" + "visa.svg"];
  } else if (settledCardType === CARD_TYPES.MASTERCARD) {
    images = [process.env.PUBLIC_URL + "/" + "mastercard.svg"];
  } else if (settledCardType === CARD_TYPES.AMEX) {
    images = [process.env.PUBLIC_URL + "/" + "american-express.svg"];
  } else if (settledCardType === CARD_TYPES.DISCOVER) {
    images = [process.env.PUBLIC_URL + "/" + "discover.svg"];
  }

  if (hasSubmissionError) {
    return <Error handleClose={() => setHasSubmissionError(false)}></Error>;
  }

  if (showSuccess) {
    return (
      <SuccessDonate handleClose={() => setShowSuccess(false)}></SuccessDonate>
    );
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <form className="donate-form-container" onSubmit={handleSubmit}>
      <div className="custom-amounts-and-error">
        <div className="amount-buttons-container">
          <button
            className={classNames(
              "amount-button",
              selectedAmountButton === 10 ? "amount-button-selected" : ""
            )}
            key="ammount-10"
            onClick={handleAmountButton(10)}
          >
            {" "}
            10
          </button>
          <button
            className={classNames(
              "amount-button",
              selectedAmountButton === 20 ? "amount-button-selected" : ""
            )}
            key="ammount-20"
            onClick={handleAmountButton(20)}
          >
            {" "}
            20
          </button>
          <button
            className={classNames(
              "amount-button",
              selectedAmountButton === 100 ? "amount-button-selected" : ""
            )}
            key="ammount-100"
            onClick={handleAmountButton(100)}
          >
            {" "}
            100
          </button>
        </div>
        <div>{!showCustomAmountInput && errors.amount}</div>
      </div>

      {!showCustomAmountInput && (
        <div className="custom-amount-button-container">
          <button
            className="custom-amount-button"
            onClick={handleShowCustomAmount}
          >
            {" "}
            Enter Custom Amount
          </button>
        </div>
      )}

      {showCustomAmountInput && (
        <Input
          name={"amount"}
          error={errors.amount}
          label={"Amount"}
          type={"number"}
          value={formData.amount}
          handleChange={handleChange(validateAmount)}
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
        handleChange={handleChange(validateAddress)}
        required={false}
      />
      <Input
        name="cardNumber"
        type="text"
        error={errors.cardNumber}
        label={"Card Number"}
        value={formattedCardnumber}
        handleChange={handleChange(validateCardNumber)}
        required={true}
        images={images}
      />

      <Input
        name="expiration"
        type="text"
        error={errors.expiration}
        label={"Expiration Date"}
        value={formData.expiration}
        handleChange={handleChange(validateExpirationDate)}
        required={true}
      />
      <Input
        name="cvccvv"
        type="number"
        error={errors.cvccvv}
        label={"CVC/CVV"}
        value={formData.cvccvv}
        handleChange={handleChange()}
        maxLength={3}
        required={true}
      />
      <Input
        name="zip"
        type="number"
        error={errors.zip}
        label={"Zip Code"}
        value={formData.zip}
        handleChange={handleChange()}
        maxLength={5}
        required={true}
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
