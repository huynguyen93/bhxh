import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ModalSalary from "./components/ModalSalary";
import {
  months,
  years
} from "./constants";
import utils from "./utils";

const defaultPeriod = {
  salary: '',
};

function App() {
  const [periods, setPeriods] = React.useState([{...defaultPeriod}]);
  const [result, setResult] = React.useState(null);
  const [showModalSalary, setShowModalSalary] = React.useState(false);

  const addPeriod = () => {
    setPeriods([...periods, {...defaultPeriod}]);
    setResult(null);
  };

  const removePeriod = (index) => {
    setPeriods([...periods.filter((period, idx) => idx !== index)]);
    setResult(null);
  };

  const calculate = () => {
    const isValid = true;
    const updatedPeriods = [];
    let hasError = false;

    periods.forEach((period) => {
      const errorMessage = utils.validatePeriod(period);

      if (errorMessage) hasError = true;

      updatedPeriods.push({
        ...period,
        errorMessage: errorMessage,
      })
    });

    setPeriods(updatedPeriods);

    if (!hasError) {
      setResult(utils.calculatePeriods(periods));
    }
  };

  const updatePeriod = (periodIndex, data) => {
    const updatedPeriods = [...periods];
    updatedPeriods[periodIndex] = {
      ...periods[periodIndex],
      ...data,
      errorMessage: '',
    };

    setPeriods([
      ...updatedPeriods,
    ]);

    setResult(null);
  };

  const handleSalaryChange = (periodIndex, salary) => {
    if (salary.length === 0) {
      updatePeriod(periodIndex, {salary: ''});
      return;
    }

    const salaryInInteger = parseInt(salary.replace(/[^0-9]/g, '') || 0);
    const localeString = salaryInInteger.toLocaleString('en');
    const formattedSalary = localeString.replace(/,/g, ' ');

    const amountPaidForInsurance = utils.calculateAmountPaid(salaryInInteger);

    updatePeriod(periodIndex, {salary: formattedSalary, amountPaidForInsurance});
  };
console.log(result);
  return (
    <div className="App">
      <table className="table table-bordered table-responsive-md">
        <thead>
        <tr>
          <th>#</th>
          <th>Từ... </th>
          <th>Đến... </th>
          <th>
            Lương đóng BHXH
            <button
              className="btn btn-sm btn-link mx-1"
              onClick={() => setShowModalSalary(true)}
              disabled={showModalSalary}
            >

            </button>
          </th>
          <th/>
        </tr>
        </thead>
        <tbody>
          {periods.map((period, index) => {
            const {
              salary,
            } = period;

            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <select
                    id="inputState"
                    className="mr-3"
                    onChange={(e) => updatePeriod(index, {monthStart: e.target.value})}
                  >
                    <option>Tháng...</option>
                    {months.map((label, index) => (<option value={index + 1} key={index}>{label}</option>))}
                  </select>
                  <select
                    id="inputState"
                    className=""
                    onChange={(e) => updatePeriod(index, {yearStart: e.target.value})}
                  >
                    <option>Năm...</option>
                    {years.map((label) => (<option value={label} key={label}>{label}</option>))}
                  </select>
                </td>
                <td>
                  <select
                    id="inputState"
                    className="mr-3"
                    onChange={(e) => updatePeriod(index, {monthEnd: e.target.value})}
                  >
                    <option>Tháng...</option>
                    {months.map((label, index) => (<option value={index + 1} key={index}>{label}</option>))}
                  </select>
                  <select
                    id="inputState"
                    onChange={(e) => updatePeriod(index, {yearEnd: e.target.value})}
                  >
                    <option>Năm...</option>
                    {years.map((label) => (<option value={label} key={label}>{label}</option>))}
                  </select>
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="10 000 000"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    value={salary}
                    onChange={(e) => handleSalaryChange(index, e.target.value)}
                    style={{width: '120px'}}
                  />
                  {' '}
                  vnđ
                </td>
                <td>
                  <button
                    title="Xóa"
                    onClick={() => removePeriod(index)}
                    className="btn btn-sm rounded btn-danger"
                  >
                    xóa
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="mb-4">
        <button
          onClick={addPeriod}
          className="btn btn-sm btn-secondary mr-2"
        >
          <b>+</b> thêm dòng
        </button>
      </div>
      <ul>
        {periods.map((period, index) => {
          const {
            monthStart,
            monthEnd,
            yearStart,
            yearEnd,
            errorMessage,
          } = period;
          let isValidTimeRange = true;
          if (monthStart && monthEnd && yearStart && yearEnd) {
            if (yearEnd < yearStart || (yearEnd === yearStart && monthEnd < monthStart)) {
              isValidTimeRange = false;
            }
          }

          if (isValidTimeRange && !errorMessage) {
            return null;
          }

          return (
            <li key={index}>
              Lỗi ở dòng {index + 1}:
              {' '}
              {!isValidTimeRange && (
                <span className="text-danger">Thời gian không phù hợp, vui lòng chọn lại!</span>
              )}
              {' '}
              {errorMessage && (
                <span className="text-danger">{errorMessage}</span>
              )}
            </li>
          );
        })}
      </ul>

      <div className="mt-5 mb-5">
        <button
          className="btn btn-lg btn-primary"
          onClick={calculate}
          disabled={periods.length === 0}
        >
          Xem kết quả
        </button>
      </div>
      {result && (
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

          <div className="mt-5">
            <h4>Công thức</h4>
            <table className="table table-borderless table-responsive">
              <tbody>
              <tr>
                <td><b>Mức hưởng</b></td>
                <td>=</td>
                <td>(1,5 x Mbqtl x Thời gian đóng BHXH trước năm 2014)</td>
                <td>+</td>
                <td>(2 x Mbqtl x Thời gian đóng BHXH sau năm 2014)</td>
              </tr>
              </tbody>
            </table>
            <p>
              Trong đó:
              <ul>
                <li>Thời gian đóng BHXH có tháng lẻ thì từ 01 - 06 tháng được tính là ½ năm, từ 07 - 11 tháng được tính là 01 năm.</li>
                <li>Trường hợp tính đến trước 01/01/2014 nếu thời gian đóng BHXH có tháng lẻ thì những tháng lẻ đó được chuyển sang giai đoạn đóng BHXH từ 01/01/2014 trở đi.</li>
                <li>Mbqtl là mức bình quân tiền lương tháng đóng BHXH.</li>
              </ul>
            </p>
            <table className="table table-borderless table-responsive">
              <tbody>
              <tr>
                <td><b>Mbqtl</b></td>
                <td>=</td>
                <td>(Số tháng đóng BHXH x Tiền lương tháng đóng BHXH x Mức điều chỉnh hàng năm)</td>
                <td>:</td>
                <td>Tổng số tháng đóng BHXH</td>
              </tr>
              </tbody>
            </table>

            <p>Dựa theo công thức:</p>
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
                    `(${1.5} x ${utils.formatNumber(result.adjustedAverageSalary)} x ${result.totalYearsBefore2014})`
                  )}
                  {result.totalYearsBefore2014 > 0 && result.totalYearsFrom2014 > 0 && (
                    ' + '
                  )}
                  {result.totalYearsFrom2014 > 0 && (
                    `(${2} x ${utils.formatNumber(result.adjustedAverageSalary)} x ${result.totalYearsFrom2014})`
                  )}
                </td>
                <td>=</td>
                <td>{utils.formatNumber(result.amountWillReceive)}</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
      <ModalSalary show={showModalSalary} setShow={setShowModalSalary}/>
    </div>
  );
}

export default App;
