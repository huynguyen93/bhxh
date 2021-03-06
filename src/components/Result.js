import React from 'react';
import utils from '../utils';
import ModalAdjustments from './ModalAdjustments';

function Result({ result }) {
  const [showModalAdjustments, setShowModalAdjustments] = React.useState(false);

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
      <p>
        <p className="text-secondary">
          <small>* Kết quả có thể chênh lệch nhỏ so với thực tế vì nhiều lý do!</small>
        </p>
      </p>

      <div className="mt-5">
        <h4>Công thức</h4>
        <table className="table table-borderless table-responsive">
          <tbody>
          <tr>
            <td><b>Mbqtl</b></td>
            <td>=</td>
            <td>
              (Số tháng đóng BHXH x Tiền lương tháng đóng BHXH x Mức điều chỉnh hàng năm)
              {' : '}
              Tổng số tháng đóng BHXH
            </td>
          </tr>
          <tr>
            <td><b>Mức hưởng</b></td>
            <td>=</td>
            <td>
              (1,5 x Mbqtl x Thời gian đóng BHXH trước năm 2014)
              {' + '}
              (2 x Mbqtl x Thời gian đóng BHXH sau năm 2014)
            </td>
          </tr>
          </tbody>
        </table>
        <p>
          Trong đó:
          <ul>
            <li>Mbqtl là mức bình quân tiền lương tháng đóng BHXH.</li>
            <li>Thời gian đóng BHXH có tháng lẻ thì từ 01 - 06 tháng được tính là ½ năm, từ 07 - 11 tháng được tính là 01 năm.</li>
            <li>Trường hợp tính đến trước 01/01/2014 nếu thời gian đóng BHXH có tháng lẻ thì những tháng lẻ đó được chuyển sang giai đoạn đóng BHXH từ 01/01/2014 trở đi.</li>
            <li>
              <a href="#" onClick={() => {setShowModalAdjustments(!showModalAdjustments)}}>
                Xem bảng mức điều chỉnh hằng năm
              </a>
            </li>
          </ul>
        </p>



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
              {result.totalYearsBefore2014 > 0 && (
                `(${1.5} * ${utils.formatNumber(result.adjustedAverageSalary)} * ${result.totalYearsBefore2014})`
              )}
              {result.totalYearsBefore2014 > 0 && result.totalYearsFrom2014 > 0 && (
                ' + '
              )}
              {result.totalYearsFrom2014 > 0 && (
                `(${2} * ${utils.formatNumber(result.adjustedAverageSalary)} * ${result.totalYearsFrom2014})`
              )}
            </td>
            <td>=</td>
            <td>{utils.formatNumber(result.amountWillReceive)}</td>
          </tr>
          </tbody>
        </table>
      </div>
      <ModalAdjustments show={showModalAdjustments} setShow={setShowModalAdjustments} />
    </div>
  )
}

export default Result;
