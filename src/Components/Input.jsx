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
}) => {
  console.log("images", images);
  return (
    <div className="input-element-container">
      <label className="input-label">{label}</label>
      <div className="input-and-images">
        <input
          type={type}
          name={name}
          className={classNames(
            "input-element",
            error && "input-element-error"
          )}
          value={value}
          onChange={handleChange}
          required={required}
        />
        <div className="card-images-container">
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
