import { Modal } from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import classNames from "classnames";

const ANIMATION_TIME = 300;

export const NavBar = () => {
  const [open, setOpen] = useState(false);
  const [isModalFadingOut, setIsModalFadingOut] = useState(false);

  const navigate = useNavigate();

  const location = useLocation();

  console.log(location.pathname)

  const isHome = location.pathname === "/"
  const isOnAbout = location.pathname.toLowerCase() === "/about"


  const closeModalAndGoToPage = (page) => {
    handleClose();
    navigate(page);
  };

  const handleOpen = () => {
    setOpen(true);

  };
  const handleClose = () => {
    setIsModalFadingOut(true);
    setTimeout(() => {
      setOpen(false);
      setIsModalFadingOut(false);

    }, ANIMATION_TIME);

  };

  return (
    <div className="nav-bar">
      <img className="nav-logo" src={"/katie_logo.png"} />

      <div>
        <button className="hamburger-button" onClick={handleOpen}>
          <div className="hamburger">
            <div className="hamburger-block"></div>
            <div className="hamburger-block"></div>
            <div className="hamburger-block"></div>
          </div>
        </button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
          className={classNames(
            "fade-in",
            isModalFadingOut ? "fade-out" : ""
          )}
        >
          <div className="modal-nav">
            <button onClick={handleClose} className={classNames("x-button","undo-button-styles")}>
              <div className="x-symbol"></div>
            </button>
            <button className={classNames("nav-link", isHome ? "nav-link-active": "")} onClick={() => closeModalAndGoToPage("/")}> Home </button>
            <button className={classNames("nav-link", isOnAbout ? "nav-link-active": "")} onClick={() => closeModalAndGoToPage("/")} onClick={() => closeModalAndGoToPage("/about")}>
              {" "}
              About
            </button>

            {/* <Link to="/">Home</Link>
            <Link to="/about">About</Link> */}
          </div>
        </Modal>
      </div>
    </div>
  );
};
