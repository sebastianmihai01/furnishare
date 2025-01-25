import { Fragment } from "react";
import ReactDOM from "react-dom";
import classes from "../../../src/css/Modal.module.css";

const Backdrop = (props) => {
  return <div className={classes.backdrop} />;
};

const ModalOverlay = (props) => {
  return (
    <div id="overlay" className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const Modal = (props) => {
  //const portalElement = document.getElementById("root");
  //if (document.getElementById("overlay")) {
  let portalElement = document.getElementById("root");
  portalElement = (props.clicked === true && document.getElementById("overlay")) ? document.getElementById("overlay") : document.getElementById("root");

  //

  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop onClose={props.onClose} />, portalElement)}
      {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
    </Fragment>
  );
};

export default Modal;
