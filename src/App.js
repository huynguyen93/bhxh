import React from 'react';
import {months, years} from "./constants";

function getNumberOfYear({monthStart, yearStart, monthEnd, yearEnd}) {
  return 1;
}

function App() {
  const [periods, setPeriods] = React.useState([]);

  const addPeriod = () => {
    setPeriods([...periods, {}]);
  };

  const removePeriod = (index) => {
    setPeriods([...periods.filter((period, idx) => idx !== index)]);
  };

  const calculate = () => {
    let totalMonths = 0;

    periods.forEach(period => {
      const monthStart = period.monthStart;
      const yearStart = period.yearStart;
      const monthEnd = period.monthEnd;
      const yearEnd = period.yearEnd;
      const salary = period.salary;

      const totalYears = getNumberOfYear({monthStart, monthEnd, yearStart, yearEnd});

    });
  };

  return (
    <div className="App">
      <h1>BHXH</h1>
      <hr/>
      {periods.map((period, index) => {
        return (
          <div className="row my-4" key={index}>
            <div className="col-lg-4">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Từ</label>
                        <select id="inputState" className="form-control">
                          <option>Tháng...</option>
                          {months.map((label, index) => (<option value={index + 1} key={index}>{label}</option>))}
                        </select>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1" style={{visibility: 'hidden'}}>From date</label>
                        <select id="inputState" className="form-control">
                          <option>Năm...</option>
                          {years.map((label) => (<option value={label} key={label}>{label}</option>))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Đến</label>
                        <select id="inputState" className="form-control">
                          <option>Tháng...</option>
                          {months.map((label, index) => (<option value={index + 1} key={index}>{label}</option>))}
                        </select>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1" style={{visibility: 'hidden'}}>From date</label>
                        <select id="inputState" className="form-control">
                          <option>Năm...</option>
                          {years.map((label) => (<option value={label} key={label}>{label}</option>))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="card">
                <div className="card-body">
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Lương (vnd)</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-1 d-flex align-content-end flex-wrap pb-3">
              <button
                onClick={() => removePeriod(index)}
                className="btn btn-danger btn-sm"
              >
                Remove
              </button>
            </div>
          </div>
        );
      })}
      <button
        onClick={addPeriod}
        className="btn btn-sm btn-success"
      >
        Add period
      </button>
      <hr/>
      <div>
        <button
          className="btn btn-lg btn-primary"
        >
          Calculate
        </button>
      </div>
    </div>
  );
}

export default App;
