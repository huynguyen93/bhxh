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
  };

  const removePeriod = (index) => {
    setPeriods([...periods.filter((period, idx) => idx !== index)]);
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
                    className="mx-3"
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
                    className="mx-3"
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
                  vnd
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
        >
          Xem kết quả
        </button>
      </div>
      {result && (
        <div>
          <h2>Kết quả</h2>
          <p>Số tháng đóng BHXH: {result.totalMonths}</p>
          <p>Thu nhập bình quân: {utils.formatNumber(result.adjustedAverageSalary)} vnd</p>
          <p className="text-success">
            <b>
              Số tiền sẽ nhận: {utils.formatNumber(result.amountWillReceive)} vnd
            </b>
          </p>
        </div>
      )}
      <ModalSalary show={showModalSalary} setShow={setShowModalSalary}/>
    </div>
  );
}

export default App;
