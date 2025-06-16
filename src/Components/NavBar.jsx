import { Modal } from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Banner } from "./Banner";
import classNames from "classnames";

const ANIMATION_TIME = 300;

export const NavBar = () => {
  const [open, setOpen] = useState(false);
  const [isModalFadingOut, setIsModalFadingOut] = useState(false);

  const navigate = useNavigate();

  const location = useLocation();

  let baseUrl = `${window.location.protocol}//${window.location.host}`;
  if (baseUrl[baseUrl.length - 1] !== "/") {
    baseUrl += "/";
  }

  const isHome = location.pathname === "/";
  const isOnAbout = location.pathname.toLowerCase() === "/platform";
  const isOnVolunteer = location.pathname.toLowerCase() === "/volunteer";
  const isOnDonate = location.pathname.toLowerCase() === "/donate";

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
      <Banner />

      <div className="nav-bar-inner">
        <button className="hamburger-button" onClick={handleOpen}>
          <div className="hamburger">
            <div className="hamburger-block"></div>
            <div className="hamburger-block"></div>
            <div className="hamburger-block"></div>
          </div>
        </button>
        {/* <div className="nav-logo-container">
          <img
            className="nav-logo"
            src={process.env.PUBLIC_URL + "/" + "blue-logo.png"}
          />
        </div> */}

        <div className="nav-link-container">
          <Link
            className={classNames("nav-link", isHome ? "nav-link-active" : "")}
            to="/"
          >
            About
          </Link>
          <Link
            className={classNames(
              "nav-link",
              isOnAbout ? "nav-link-active" : ""
            )}
            to="/platform"
          >
            Platform
          </Link>
          <Link
            className={classNames(
              "nav-link",
              isOnVolunteer ? "nav-link-active" : ""
            )}
            to="/volunteer"
          >
            Volunteer
          </Link>
          <Link
            className={classNames(
              "nav-link",
              isOnDonate ? "nav-link-active" : ""
            )}
            to="/donate"
          >
            Donate
          </Link>
        </div>

        <div>
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
              <div className="modal-nav-inner">
                <button
                  onClick={handleClose}
                  className={classNames("x-button", "undo-button-styles")}
                >
                  <div className="x-symbol"></div>
                </button>
                <button
                  className={classNames(
                    "side-menu-nav-link",
                    isHome ? "side-menu-nav-link-active" : ""
                  )}
                  onClick={() => closeModalAndGoToPage("/")}
                >
                  {" "}
                  About{" "}
                </button>
                <button
                  className={classNames(
                    "side-menu-nav-link",
                    isOnAbout ? "side-menu-nav-link-active" : ""
                  )}
                  onClick={() => closeModalAndGoToPage("/platform")}
                >
                  {" "}
                  Platform
                </button>
                <button
                  className={classNames(
                    "side-menu-nav-link",
                    isOnAbout ? "side-menu-nav-link-active" : ""
                  )}
                  onClick={() => closeModalAndGoToPage("/volunteer")}
                >
                  {" "}
                  Volunteer
                </button>
                <button
                  className={classNames(
                    "side-menu-nav-link",
                    isOnAbout ? "side-menu-nav-link-active" : ""
                  )}
                  onClick={() => closeModalAndGoToPage("/donate")}
                >
                  {" "}
                  Donate
                </button>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};
