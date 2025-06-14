import { DonateForm } from "../Components/DonateForm";
import { NavBar } from "../Components/NavBar";
export const DonatePage = () => {
  return (
    <div className="donate-container">
      <div className="donate-title">
        Donate to Jessica For Edmonds
      </div>
  
      <DonateForm />
    </div>
  );
};
