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
  maxlength,
}) => {
  const imagesClass = images?.length > 1 ? "card-images-container" : "card-images-container-small" 
  let trimmedValue = value
  if(maxlength){
    trimmedValue=trimmedValue.slice(0, maxlength);
  }
  return (
    <div className="input-element-container">
      <label className="input-label">{label}</label>
      <div className="input-and-images">
        <input
          type={type}
          name={name}
          maxlength={maxlength}
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
