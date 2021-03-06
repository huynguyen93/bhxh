import React from 'react';
import Modal from 'react-bootstrap/Modal';
import {adjustments} from '../constants';

function ModalAdjustments({ show, setShow}) {
  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      dialogClassName="modal-90w"
      aria-labelledby="salary-adjustment"
    >
      <Modal.Header closeButton>
        <Modal.Title id="salary-adjustment">
          Mức điều chỉnh lương
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Theo
          {' '}
          <a href="https://luatvietnam.vn/lao-dong/thong-tu-35-2019-tt-bldtbxh-muc-dieu-chinh-tien-luong-thu-nhap-thang-da-dong-bao-hiem-xa-hoi-180368-d1.html">
          Điều 2 Thông tư 35/2019/TT-BLĐTBXH
          </a>,
          mức điều chỉnh tiền lương tháng đóng BHXH của người lao động như sau:
        </p>
        <table className="table table-bordered table-striped">
          <thead>
          <tr>
            <th>Năm</th>
            <th>Mức điều chỉnh</th>
          </tr>
          </thead>
          <tbody>
          {Object.keys(adjustments).map((year, index) => {
            return (
              <tr key={year}>
                <td>{index === 0 && '<= '}{year}</td>
                <td>{adjustments[year]}</td>
              </tr>
            )
          })}
          </tbody>
        </table>
      </Modal.Body>
    </Modal>
  )
}

export default ModalAdjustments;
