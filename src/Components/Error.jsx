import classNames from "classnames";
export const Error = ({ handleClose }) => {
  return (
    <div className="error-container">
      <button onClick={handleClose} className="back-button"> Back </button>
      <div className="error-text">
      Oops! There was a problem.

      </div>
    </div>
  );
};
