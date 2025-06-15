import classNames from "classnames";
export const SuccessDonate = ({ handleClose }) => {
  return (
    <div className="success-container">
      <button className="back-button" onClick={handleClose}> Back </button>
      Thanks for supporting the campaign!
    </div>
  );
};
