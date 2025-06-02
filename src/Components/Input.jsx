import { useEffect } from "react";
import classNames from "classnames";
export const Input = ({
  label,
  error,
  type,
  name,
  value,
  handleChange,
  required,
  images,
  maxLength,
}) => {
  const imagesClass = images?.length > 1 ? "card-images-container" : "card-images-container-small" 
  let trimmedValue = value
  if(maxLength){
    trimmedValue=trimmedValue.slice(0, maxLength);
  }
  const labelAndStar = label + (required ? " *" : "")
  return (
    <div className="input-element-container">
      <label className="input-label">{label}</label>
      <div className="input-and-images">
        <input
          type={type}
          name={name}
          maxLength={maxLength}
          placeholder={labelAndStar}
          className={classNames(
            "input-element",
            error && "input-element-error"
          )}
          value={trimmedValue}
          onChange={handleChange}
          required={required}
        />
        <div className={imagesClass}>
          {images &&
            images.map((imageSrc) => {
              return <img src={imageSrc} className={classNames("card-logo")} />;
            })}
        </div>
      </div>

      <div className="form-error">{error}</div>
    </div>
  );
};
