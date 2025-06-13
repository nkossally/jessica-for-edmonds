import { SignupForm } from "../Components/SignupForm";
export const Volunteer = () => {
  return (
    <div className="volunteer-container">
      <h1 className="volunteer-title">Join Zohran for NYC</h1>
      <div className="volunteer-text">
        This campaign is about talking to thousands of New Yorkers across the
        city about how we make this city work better for the many and not the
        few. And to do this, we need you! Sign up below, or check out events
        near you.
      </div>
        <SignupForm />
    </div> 
  );
};
