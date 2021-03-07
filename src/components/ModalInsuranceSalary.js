import React from 'react';
import Modal from "react-bootstrap/Modal";
import app1 from '../images/bhxh-app-1.jpg';
import app2 from '../images/bhxh-app-2.jpg';
import bhxhCover from '../images/bhxh-cover.jpg';
import bhxhNoteDetail from '../images/bhxh-explain.jpg';

function ModalInsuranceSalary({ show, setShow }) {
  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      dialogClassName="modal-90w"
      aria-labelledby="salary-help"
    >
      <Modal.Header closeButton>
        <Modal.Title id="salary-help">
          Kiểm tra mức lương đóng BHXH
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Bạn có thể thử 1 trong 2 cách sau đây:</p>
        <h4>1. Xem trong số BHXH</h4>
        <a href={bhxhCover} target="_blank">
          <img className="img-fluid" src={bhxhCover} alt="bìa sổ BHXH"/>
        </a>
        <a href={bhxhNoteDetail} target="_blank">
          <img className="img-fluid" src={bhxhNoteDetail} alt="chi tiết BHXH"/>
        </a>

        <hr/>

        <h4>2. Xem trong ứng dụng trên smartphone</h4>
        <p>Bạn cũng có thể tải App VssID để kiểm tra mức lương đóng BHXH</p>
        <ul>
          <li>
            <a href="https://play.google.com/store/apps/details?id=com.bhxhapp" target="_blank" rel="noreferrer">
              Link tải cho Android
            </a>
          </li>
          <li>
            <a href="https://apps.apple.com/vn/app/vssid/id1521647264?l=vi" target="_blank" rel="noreferrer">
              Link tải cho iPhone
            </a>
          </li>
          <li>
            <a href="https://luatvietnam.vn/bao-hiem/cach-su-dung-vssid-563-27843-article.html" target="_blank" rel="noreferrer">
              Hướng dẫn đăng kí & sử dụng app
            </a>
          </li>
        </ul>

        <p>Sau khi tải app, đăng kí & đăng nhập bạn có thể xem thông tin của mình.</p>
        <a href={app1} target="_blank">
          <img className="img-fluid" src={app1} alt="Xem thông tin BHXH trên ứng dụng di động 1"/>
        </a>
        <a href={app2} target="_blank">
          <img className="img-fluid" src={app2} alt="Xem thông tin BHXH trên ứng dụng di động 1"/>
        </a>

        <hr/>

        <p>Nếu bạn không xem được bằng cả 2 cách trên, hãy thử hỏi bộ phận kế toán / nhân sự của công ty bạn!</p>
      </Modal.Body>
    </Modal>
  );
}

export default ModalInsuranceSalary;
