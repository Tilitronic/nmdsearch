import "./modalStyles.css";
import { useEffect } from "react";
import ReactPortal from "../ReactPortal.js";

import {Checkbox, Box, FormGroup, FormControlLabel, Paper, Button, Typography} from '@mui/material';

function Modal({ children, isOpen, handleClose }) {
    useEffect(() => {
      const closeOnEscapeKey = e => e.key === "Escape" ? handleClose() : null;
      document.body.addEventListener("keydown", closeOnEscapeKey);
      return () => {
        document.body.removeEventListener("keydown", closeOnEscapeKey);
      };
    }, [handleClose]);
  
    if (!isOpen) return null;
  
    return (
        <ReactPortal wrapperId="react-portal-modal-container">
            <div className="modal">
                <Button variant="contained" onClick={handleClose} className="close-btn">
                    Close
                </Button>
                <div className="modal-content">{children}</div>
            </div>
        </ReactPortal>
    );
  };

export default Modal;