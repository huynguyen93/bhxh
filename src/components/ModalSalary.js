import React from "react";
import Modal from "react-bootstrap/Modal";

function ModalSalary({ show, setShow}) {
  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      dialogClassName="modal-90w"
      aria-labelledby="salary-explanation"
    >
      <Modal.Header closeButton>
        <Modal.Title id="salary-explanation">
          Giải thích các mức lương
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>1. Mức lương đóng BHXH</h4>
        <p>AB CD</p>
        <h4>2. Mức lương chính thức</h4>
        <p>Lorem ipsum</p>
      </Modal.Body>
    </Modal>
  );
}

export default ModalSalary;
