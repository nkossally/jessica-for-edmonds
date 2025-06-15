import classNames from "classnames";
export const SuccessVolunteer = ({ handleClose }) => {
  return (
    <div className="success-container">
      <button className="back-button" onClick={handleClose}> Back </button>
      Thanks for joining the campaign!
    </div>
  );
};
