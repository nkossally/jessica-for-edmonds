import { Modal, Box, Typography, Button } from "@mui/material";
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import { useState } from "react";

const style = {
  position: "absolute",
  display: "flex",
  "flex-direction": "column",
  top: "0%",
  right: "0%",
//   transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

export const NavBar = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
        >
          <div className="modal-nav">
                   <Link to="/">Home</Link>
                  <Link to="/about">About</Link> 
            
        
          </div>
        </Modal>
      </div>
    </div>
  );
};
