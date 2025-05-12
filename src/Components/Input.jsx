export const Input = ({ label, error, type, name, value, handleChange , required}) => {
  return (
    <div className="input-element-container">
      <label className="input-label">{label}</label>
      <input
        type={type}
        name={name}
        className="input-element"
        value={value}
        onChange={handleChange}
        required={required}
      />
    </div>
  );
};
