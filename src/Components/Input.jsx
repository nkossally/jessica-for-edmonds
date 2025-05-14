import classNames from "classnames";
export const Input = ({
  label,
  error,
  type,
  name,
  value,
  handleChange,
  required,
}) => {
  return (
    <div className="input-element-container">
      <label className="input-label">{label}</label>
      <input
        type={type}
        name={name}
        className={classNames("input-element", error &&  "input-element-error")}
        value={value}
        onChange={handleChange}
        required={required}
      />
      <div className="form-error">{error}</div>
    </div>
  );
};
