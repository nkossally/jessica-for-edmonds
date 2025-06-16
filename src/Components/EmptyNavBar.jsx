import { useLocation } from "react-router-dom";
import classNames from "classnames";

export const EmptyNavBar = () => {
  const location = useLocation();

  console.log(location);
  const isBlue = location.pathname == "/";
  return (
    <div
      className={classNames("nav-bar-empty", isBlue ? "blue-background" : "")}
    ></div>
  );
};
