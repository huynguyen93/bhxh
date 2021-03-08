import React from 'react';
import utils from '../utils';
import ModalAdjustments from './ModalAdjustments';

function Result({ result }) {
  const [shouldShowDetails, setShouldShowDetails] = React.useState(false);
  const [showModalAdjustments, setShowModalAdjustments] = React.useState(false);
  console.log(result);

  return (
    <div>
      <h2>Kết quả</h2>
      <p>Số tháng tham gia BHXH: {result.totalMonths}</p>
      <p>Mức lương đóng BHXH bình quân: {utils.formatNumber(result.adjustedAverageSalary, true)} / tháng</p>
      <p>Số tiền <i>ước tính</i> đã đóng BHXH: {utils.formatNumber(result.estimatedContributed, true)}</p>
      <p className="text-success">
        <b>
          Số tiền <i>ước tính</i> sẽ nhận: <u>{utils.formatNumber(result.amountWillReceive, true)}</u>
        </b>
      </p>
      <p className="text-secondary">
        <small>* Kết quả có thể chênh lệch nhỏ so với thực tế vì nhiều lý do!</small>
      </p>

      {!shouldShowDetails && (
        <button className="btn btn-sm btn-secondary" onClick={() => setShouldShowDetails(true)}>
          Hiện chi tiết công thức tính
        </button>
      )}
      {shouldShowDetails && (
        <div className="mt-5">
          <h4>Công thức</h4>
          <table className="table table-borderless table-responsive">
            <tbody>
            <tr>
              <td><b>Mbqtl</b></td>
              <td>=</td>
              <td>
                (
                <span className="badge rounded-pill bg-warning text-dark">Số tháng đóng BHXH</span>
                {' x '}
                <span className="badge rounded-pill bg-warning text-dark">Tiền lương tháng đóng BHXH</span>
                {' x '}
                <span className="badge rounded-pill bg-warning text-dark">Mức điều chỉnh hàng năm</span>
                )
                {' : '}
                <span className="badge rounded-pill bg-warning text-dark">Tổng số tháng đóng BHXH</span>
              </td>
            </tr>
            <tr>
              <td><b>Mức hưởng</b></td>
              <td>=</td>
              <td>
                (
                <span className="badge rounded-pill bg-warning text-dark">1.5</span>
                {' x '}
                <span className="badge rounded-pill bg-warning text-dark">Mbqtl</span>
                {' x '}
                <span className="badge rounded-pill bg-warning text-dark">Số năm đóng BHXH trước 2014</span>
                )
                {' + '}
                (
                <span className="badge rounded-pill bg-warning text-dark">2</span>
                {' x '}
                <span className="badge rounded-pill bg-warning text-dark">Mbqtl</span>
                {' x '}
                <span className="badge rounded-pill bg-warning text-dark">Số năm đóng BHXH sau 2014</span>
                )
              </td>
            </tr>
            </tbody>
          </table>
          Trong đó
          <ul>
            <li>Mbqtl là mức bình quân tiền lương tháng đóng BHXH.</li>
            <li>Thời gian đóng BHXH có tháng lẻ thì từ 01 - 06 tháng được tính là ½ năm, từ 07 - 11 tháng được tính là 01 năm.</li>
            <li>Trường hợp tính đến trước 01/01/2014 nếu thời gian đóng BHXH có tháng lẻ thì những tháng lẻ đó được chuyển sang giai đoạn đóng BHXH từ 01/01/2014 trở đi.</li>
            <li>
              <button
                className="btn btn-sm btn-link"
                onClick={() => setShowModalAdjustments(!showModalAdjustments)}
                disabled={showModalAdjustments}
              >
                Xem bảng mức điều chỉnh hằng năm
              </button>
            </li>
          </ul>

          <p className="mt-4">Dựa theo công thức:</p>
          <table className="table table-borderless table-responsive">
            <tbody>
            <tr>
              <td><b>Mbqtl</b></td>
              <td>=</td>
              <td>{result.adjustedAverageSalaryFormula}</td>
              <td>=</td>
              <td>{utils.formatNumber(result.adjustedAverageSalary)}</td>
            </tr>
            <tr>
              <td><b>Mức hưởng</b></td>
              <td>=</td>
              <td>
                {`(${1.5} * ${utils.formatNumber(result.adjustedAverageSalary)} * ${result.totalYearsBefore2014})`}
                {' + '}
                {`(${2} * ${utils.formatNumber(result.adjustedAverageSalary)} * ${result.totalYearsFrom2014})`}
              </td>
              <td>=</td>
              <td>{utils.formatNumber(result.amountWillReceive)}</td>
            </tr>
            </tbody>
          </table>

          <ModalAdjustments show={showModalAdjustments} setShow={setShowModalAdjustments} />
        </div>
      )}
    </div>
  )
}

export default Result;
