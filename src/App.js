import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ModalSalary from "./components/ModalSalary";
import ModalZones from './components/ModalZones';
import {
  maximumInsurancePerMonth,
  minimumSalaryByZone,
  months, percentageCompanyPays, percentageWorkerPays,
  salaryTypes,
  years,
  zoneLabels,
  zones
} from "./constants";
import utils from "./utils";

const defaultPeriod = {
  salary: '',
  zone: zones.zone1,
};

function App() {
  const [periods, setPeriods] = React.useState([{...defaultPeriod}]);
  const [result, setResult] = React.useState(null);
  const [showModalSalary, setShowModalSalary] = React.useState(false);
  const [showModalZone, setShowModalZone] = React.useState(false);

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

    const period = periods[periodIndex];
    const zone = period.zone;
    let amountPaidForInsurance = null;

    if (salaryInInteger >= minimumSalaryByZone[zone] && salaryInInteger <= maximumInsurancePerMonth) {
      amountPaidForInsurance = utils.calculateAmountPaid(salaryInInteger);
    }

    updatePeriod(periodIndex, {salary: formattedSalary, amountPaidForInsurance});
  };

  return (
    <div className="App">
      <h1>BHXH</h1>
      <hr/>
      <table className="table table-bordered table-responsive-md">
        <thead>
        <tr>
          <td>#</td>
          <td>Từ... </td>
          <td>Đến... </td>
          <td>
            Lương đóng BHXH
            <button
              className="btn btn-sm btn-link mx-1"
              onClick={() => setShowModalSalary(true)}
              disabled={showModalSalary}
            >
              *
            </button>
          </td>
          <td>Vùng</td>
          <td></td>
        </tr>
        </thead>
        <tbody>
          {periods.map((period, index) => {
            const {
              salary,
              monthStart,
              monthEnd,
              yearStart,
              yearEnd,
              errorMessage,
              amountPaidForInsurance,
            } = period;
            let isValidTimeRange = true;
            if (monthStart && monthEnd && yearStart && yearEnd) {
              if (yearEnd < yearStart || (yearEnd === yearStart && monthEnd < monthStart)) {
                isValidTimeRange = false;
              }
            }

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
                </td>
                <td>
                  {Object.keys(zoneLabels).map((zoneCode) => {
                    const id = 'radio' + zoneCode;
                    return (
                      <div className="form-check form-check-inline mx-3" key={zoneCode}>
                        <input
                          className="form-check-input"
                          type="radio"
                          name="zone"
                          id={id}
                          value={zoneCode}
                        />
                        <label className="form-check-label" htmlFor={id}>{zoneLabels[zoneCode]}</label>
                      </div>
                    )
                  })}
                </td>
                <td>
                  <button
                    onClick={addPeriod}
                    className="btn btn-sm btn-success mr-2"
                  >
                    <b>+</b>
                  </button>
                  <button
                    title="Xóa"
                    onClick={() => removePeriod(index)}
                    className="btn btn-sm rounded btn-danger"
                  >
                    <b>-</b>
                  </button>

                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <ul>
        {periods.map((period, index) => {
          const {
            monthStart,
            monthEnd,
            yearStart,
            yearEnd,
            errorMessage,
            amountPaidForInsurance,
          } = period;
          let isValidTimeRange = true;
          if (monthStart && monthEnd && yearStart && yearEnd) {
            if (yearEnd < yearStart || (yearEnd === yearStart && monthEnd < monthStart)) {
              isValidTimeRange = false;
            }
          }

          if (!amountPaidForInsurance && isValidTimeRange && !errorMessage) {
            return null;
          }

          return (
            <li key={index}>
              {amountPaidForInsurance && (
                <div className="mt-3">
                  Số tiền đóng BHXH:
                  <ul>
                    <li>Công ty đóng ({percentageCompanyPays}%): {utils.formatNumber(amountPaidForInsurance.byCompany)}</li>
                    <li>Người lao động đóng ({percentageWorkerPays}%): {utils.formatNumber(amountPaidForInsurance.byWorker)}</li>
                    <li>Tổng cộng: <strong>{utils.formatNumber(amountPaidForInsurance.total)}đ / tháng</strong></li>
                  </ul>
                </div>
              )}
              {!isValidTimeRange && (
                <div>
                  <span className="text-danger">Thời gian không phù hợp, vui lòng chọn lại!</span>
                </div>
              )}
              {errorMessage && (
                <div>
                  <span className="text-danger">{errorMessage}</span>
                </div>
              )}
            </li>
          );
        })}
      </ul>

      <div className="mt-5">
        <button
          className="btn btn-lg btn-primary"
          onClick={calculate}
        >
          Tính
        </button>
      </div>
      {result && (
        <div>
          <h3>Result</h3>
          <p>{result.result}</p>
        </div>
      )}
      <ModalSalary show={showModalSalary} setShow={setShowModalSalary}/>
      <ModalZones show={showModalZone} setShow={setShowModalZone} />
    </div>
  );
}

export default App;
