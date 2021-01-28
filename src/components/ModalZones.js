import React from "react";
import Modal from "react-bootstrap/Modal";
import zones from "../zones.json";
import {minimumSalaryByZone} from "../constants";
import utils from "../utils";

function ModalZones({ show, setShow}) {
  const [province, setProvince] = React.useState('');
  const [district, setDistrict] = React.useState('');
  const [shouldShowFull, setShouldShowFull] = React.useState(false);

  const districts = zones[province] || '';
  const zone = district !== '' ? zones[province][district] : null;

  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      dialogClassName="modal-90w"
      aria-labelledby="salary-explanation"
    >
      <Modal.Header closeButton>
        <Modal.Title id="salary-explanation">
          Mức lương tối thiểu vùng
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Mức lương tối thiểu được nhà nước quy định theo từng vùng.</p>
        <ul>
          <li>Vùng I: 4,420,000 đồng/tháng</li>
          <li>Vùng II: 3,920,000 đồng/tháng</li>
          <li>Vùng III: 3,430,000 đồng/tháng</li>
          <li>Vùng IV: 3,070,000 đồng/tháng</li>
        </ul>
        <div>
          <div className="mb-1">
            <b>Tìm vùng của bạn</b>
          </div>
          <div className="mb-2">
            <select
              id="inputZoneProvince"
              value={province}
              onChange={(e) => {
                setDistrict('');
                setProvince(e.target.value);
              }}
            >
              <option value="">Chọn tỉnh thành</option>
              {Object.keys(zones).map((province) => (
                <option key={province} value={province}>
                  {province}
                </option>
              ))}
            </select>
            <select
              id="inputZoneDist"
              className="mx-2"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
            >
              <option value="">Chọn quận / huyện / thị xã</option>
              {Object.keys(districts).map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </select>
          </div>
          {zone && (
            <div className="mb-4">
              Kết quả:
              {' '}
              <strong className="text-success">Vùng {zone}</strong>
              {' - '}
              lương tối thiểu:
              {' '}
              <strong>{utils.formatNumber(minimumSalaryByZone[zone])}</strong>
            </div>
          )}
          <div className="mt-4">
            {!shouldShowFull && (
              <button
                className="btn btn-sm btn-link"
                onClick={() => setShouldShowFull(true)}
              >
                Xem toàn bộ
              </button>
            )}
            {shouldShowFull && (
              <table className="table table-responsive">
                <thead>
                <tr>
                  <th style={{width: '120px'}}>Tỉnh thành</th>
                  <th>Quận / huyện / thị xã</th>
                </tr>
                </thead>
                <tbody>
                {Object.keys(zones).map((province) => {
                  const districtsByZone = {};
                  Object.keys(zones[province]).forEach((district) => {
                    const zone = zones[province][district];
                    if (!districtsByZone[zone]) {

                      districtsByZone[zone] = [];
                    }

                    districtsByZone[zone].push(district);
                  });

                  return (
                    <tr key={province}>
                      <td>{province}</td>
                      <td>
                        <ul className="list-group">
                          {Object.keys(districtsByZone).map((zone) => {
                            return (
                              <li key={province+zone} className="list-group-item">
                                <strong>Vùng {zone}: </strong>
                                {' '}
                                {districtsByZone[zone].join(', ')}.
                              </li>
                            );
                          })}
                        </ul>
                      </td>
                    </tr>
                  )
                })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default ModalZones;
