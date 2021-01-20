import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ModalSalary from "./components/ModalSalary";
import {months, salaryTypes, years} from "./constants";
import utils from "./utils";

function App() {
  const [periods, setPeriods] = React.useState([{salary: ''}]);
  const [result, setResult] = React.useState(null);
  const [showModalSalary, setShowModalSalary] = React.useState(false);

  const addPeriod = () => {
    setPeriods([...periods, {salary: ''}]);
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
      console.log(errorMessage);

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
    updatedPeriods[periodIndex] = {...periods[periodIndex], ...data};

    setPeriods([
      ...updatedPeriods,
    ]);
  };

  const handleSalaryChange = (periodIndex, salary) => {
    if (salary.length === 0) {
      updatePeriod(periodIndex, {salary: ''});
      return;
    }

    const integer = parseInt(salary.replace(/[^0-9]/g, '') || 0);
    const localeString = integer.toLocaleString('en');
    const formattedSalary = localeString.replace(/,/g, ' ');

    updatePeriod(periodIndex, {salary: formattedSalary});
  };

  return (
    <div className="App">
      <h1>BHXH</h1>
      <hr/>
      {periods.map((period, index) => {
        const {salary, monthStart, monthEnd, yearStart, yearEnd, errorMessage} = period;
        let isValidTimeRange = true;
        if (monthStart && monthEnd && yearStart && yearEnd) {
          if (yearEnd < yearStart || (yearEnd === yearStart && monthEnd < monthStart)) {
            isValidTimeRange = false;
          }
        }

        return (
          <div className="row my-4" key={index}>
            <div className="col-lg-6">
              <div className="card">
                <div className="card-header">
                  <strong>#{index + 1}</strong>
                  <span className="float-right">
                    <button
                      title="Xóa"
                      onClick={() => removePeriod(index)}
                      className="close"
                    >
                      ×
                    </button>
                  </span>
                </div>
                <div className="card-body">
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Từ: </label>
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
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Đến: </label>
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
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Mức lương</label>
                    <select
                      id="inputState"
                      className="mx-2"
                      onChange={(e) => updatePeriod(index, {yearStart: e.target.value})}
                    >
                      {/*<option value={salaryTypes.contracted}>chính thức</option>*/}
                      <option value={salaryTypes.insurance}>đóng BHXH</option>
                    </select>
                    <input
                      type="text"
                      placeholder="10 000 000"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      value={salary}
                      onChange={(e) => handleSalaryChange(index, e.target.value)}
                      style={{width: '120px'}}
                    />
                    <span className="text-secondary"> đ</span>
                    <button
                      className="btn btn-sm btn-link mx-1"
                      onClick={() => setShowModalSalary(true)}
                      disabled={showModalSalary}
                    >
                      *Giải thích
                    </button>
                  </div>
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
                </div>
              </div>
            </div>
          </div>
        );
      })}
      <button
        onClick={addPeriod}
        className="btn btn-sm btn-success"
      >
        + Thêm thời gian
      </button>
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
    </div>
  );
}

export default App;
