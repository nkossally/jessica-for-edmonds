import classNames from "classnames";
export const Error = ({ handleClose }) => {
  return (
    <div className="">
      <button onClick={handleClose}> Back </button>
      Oops! There was a problem submitting your information.
    </div>
  );
};
