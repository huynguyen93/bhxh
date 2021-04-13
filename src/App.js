import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ModalInsuranceSalary from './components/ModalInsuranceSalary';
import Result from './components/Result';
import {
  months,
  years,
} from "./constants";
import utils from "./utils";

let periodId = 0;

function createNewPeriod(lastPeriod) {
  let monthStart = '';
  let monthEnd = '';
  let yearStart = '';
  let yearEnd = '';

  if (lastPeriod) {
    const lastMonthStart = parseInt(lastPeriod['monthStart']) || false;
    const lastMonthEnd = parseInt(lastPeriod['monthEnd']) || lastMonthStart || false;
    const lastYearStart = parseInt(lastPeriod['yearStart']) || false;
    const lastYearEnd = parseInt(lastPeriod['yearEnd']) || lastYearStart || false;

    if (lastMonthStart && lastMonthEnd) {
      monthStart = lastMonthEnd === 12 ? 1 : lastMonthEnd + 1;
      yearStart = lastYearEnd || '';
      if (monthStart === 1 && yearStart) {
        yearStart++;
      }

      monthEnd = monthStart === 12 ? 1 : monthStart + 1;
      yearEnd = yearStart || '';
      if (monthEnd === 1 && yearEnd) {
        yearEnd++;
      }
    }
  }

  return  {
    salary: '',
    id: periodId,
    monthStart,
    monthEnd,
    yearStart,
    yearEnd,
  };
}

function App() {
  const [periods, setPeriods] = React.useState([{...createNewPeriod()}]);
  const [result, setResult] = React.useState(null);
  const [showModalSalary, setShowModalSalary] = React.useState(false);

  const addPeriod = () => {
    periodId++;
    const lastPeriod = periods[periods.length - 1];
    const newPeriod = createNewPeriod(lastPeriod);

    console.log(newPeriod);

    setPeriods([...periods, newPeriod]);
    setResult(null);
  };

  const removePeriod = (index) => {
    setPeriods([...periods.filter((period, idx) => idx !== index)]);
    setResult(null);
  };

  const calculate = () => {
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

  const fillPeriod = (index) => {
    const period = periods[index];
    if (!period) {
      return;
    }

    const previousPeriod = periods[index - 1];
    if (!previousPeriod) {
      return;
    }

    updatePeriod(index, {
      ...createNewPeriod(previousPeriod),
      ...period,
    });
  };

  return (
    <div className="App">
      <button className="btn btn-sm btn-link" onClick={() => setShowModalSalary(true)} disabled={showModalSalary}>
        Hướng dẫn kiểm tra mức lương đóng BHXH
      </button>
      <table className="table table-bordered table-responsive-md">
        <thead>
        <tr>
          <th>#</th>
          <th>Từ... </th>
          <th>Đến... </th>
          <th>
            Mức lương đóng BHXH
          </th>
          <th/>
        </tr>
        </thead>
        <tbody>
          {periods.map((period, index) => {
            const {
              id,
              salary,
              monthStart,
              monthEnd,
              yearStart,
              yearEnd,
            } = period;

            return (
              <tr key={id}>
                <td>{index + 1}</td>
                <td>
                  <select
                    className="mr-3"
                    onChange={(e) => updatePeriod(index, {monthStart: e.target.value})}
                    value={monthStart}
                  >
                    <option>Tháng...</option>
                    {months.map((label, index) => (<option value={index + 1} key={index}>{label}</option>))}
                  </select>
                  <select
                    className=""
                    onChange={(e) => updatePeriod(index, {yearStart: e.target.value})}
                    value={yearStart}
                  >
                    <option>Năm...</option>
                    {years.map((label) => (<option value={label} key={label}>{label}</option>))}
                  </select>
                </td>
                <td>
                  <select
                    className="mr-3"
                    onChange={(e) => updatePeriod(index, {monthEnd: e.target.value})}
                    value={monthEnd}
                  >
                    <option>Tháng...</option>
                    {months.map((label, index) => (<option value={index + 1} key={index}>{label}</option>))}
                  </select>
                  <select
                    onChange={(e) => {
                      updatePeriod(index, {yearEnd: e.target.value});

                      // fillPeriod(index + 1);
                    }}
                    value={yearEnd}
                  >
                    <option>Năm...</option>
                    {years.map((label) => (<option value={label} key={label}>{label}</option>))}
                  </select>
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="10 000 000"
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
          const monthStart = parseInt(period.monthStart);
          const monthEnd = parseInt(period.monthEnd);
          const yearStart = parseInt(period.yearStart);
          const yearEnd = parseInt(period.yearEnd);
          const {errorMessage} = period;

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

      {!result && (
        <div className="mt-5 mb-3">
          <button
            className="btn btn-lg btn-primary"
            onClick={calculate}
            disabled={periods.length === 0}
          >
            Xem kết quả
          </button>
        </div>
      )}

      {result && (
        <div className="card mt-5">
          <div className="card-body">
            <Result
              result={result}
            />
          </div>
        </div>
      )}
      <ModalInsuranceSalary
        show={showModalSalary}
        setShow={setShowModalSalary}
      />
    </div>
  );
}

export default App;
