import React from 'react';
import {months, years} from "./constants";

function getAdjustmentRate(year) {
  return 2;
}

function getNumberOfYear({monthStart, yearStart, monthEnd, yearEnd}) {
  return 1;
}

function calculatePeriods(periods) {
  let totalMonthsBefore2014 = 0;
  let totalMonthsFrom2014 = 0;
  let adjustedSalary = 0;

  console.log(periods);

  periods.forEach(period => {
    const monthStart = parseInt(period.monthStart);
    const yearStart = parseInt(period.yearStart);
    const monthEnd = parseInt(period.monthEnd);
    const yearEnd = parseInt(period.yearEnd);
    const salary = parseInt(period.salary);

    if (yearStart === yearEnd) {
      const adjustment = getAdjustmentRate(yearStart);
      const totalMonthsOfPeriod = monthEnd - monthStart + 1;

      adjustedSalary += (totalMonthsOfPeriod * salary * adjustment);

      if (yearEnd < 2014) {
        totalMonthsBefore2014 += totalMonthsOfPeriod;
      } else {
        totalMonthsFrom2014 += totalMonthsOfPeriod;
      }
    } else {
      for (let year = yearStart; year <= yearEnd; year++) {
        const adjustment = getAdjustmentRate(year);
        let totalMonthsOfPeriod = 0;

        if (year === yearStart) {
          totalMonthsOfPeriod = 12 - monthStart + 1;
        } else if (year === yearEnd) {
          totalMonthsOfPeriod = monthEnd;
        } else {
          totalMonthsOfPeriod = 12;
        }

        adjustedSalary += (totalMonthsOfPeriod * salary * adjustment);

        if (yearEnd < 2014) {
          totalMonthsBefore2014 += totalMonthsOfPeriod;
        } else {
          totalMonthsFrom2014 += totalMonthsOfPeriod;
        }
      }
    }
  });

  const totalMonths = totalMonthsBefore2014 + totalMonthsFrom2014;
  const adjustedAverageSalary = adjustedSalary / totalMonths;
  const totalYearsBefore2014 = totalMonthsBefore2014 / 12;
  const totalYearsFrom2014 = totalMonthsFrom2014 / 12;

  console.log('totalMonths', totalMonths);
  console.log('adjustedAverageSalary', adjustedAverageSalary);

  return {
    result: (1.5 * adjustedAverageSalary * totalYearsBefore2014) + (2.5 * adjustedAverageSalary * totalYearsFrom2014)
  };
}

function App() {
  const [periods, setPeriods] = React.useState([]);
  const [result, setResult] = React.useState(null);

  const addPeriod = () => {
    setPeriods([...periods, {}]);
  };

  const removePeriod = (index) => {
    setPeriods([...periods.filter((period, idx) => idx !== index)]);
  };

  const calculate = () => {
    setResult(calculatePeriods(periods));
  };

  const updatePeriod = (periodIndex, data) => {
    const updatedPeriods = [...periods];
    updatedPeriods[periodIndex] = {...periods[periodIndex], ...data};

    setPeriods([
      ...updatedPeriods,
    ]);
  };

  console.log(periods);

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
                        <select
                          id="inputState"
                          className="form-control"
                          onChange={(e) => updatePeriod(index, {monthStart: e.target.value})}
                        >
                          <option>Tháng...</option>
                          {months.map((label, index) => (<option value={index + 1} key={index}>{label}</option>))}
                        </select>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1" style={{visibility: 'hidden'}}>From date</label>
                        <select
                          id="inputState"
                          className="form-control"
                          onChange={(e) => updatePeriod(index, {yearStart: e.target.value})}
                        >
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
                        <select
                          id="inputState"
                          className="form-control"
                          onChange={(e) => updatePeriod(index, {monthEnd: e.target.value})}
                        >
                          <option>Tháng...</option>
                          {months.map((label, index) => (<option value={index + 1} key={index}>{label}</option>))}
                        </select>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1" style={{visibility: 'hidden'}}>From date</label>
                        <select
                          id="inputState"
                          className="form-control"
                          onChange={(e) => updatePeriod(index, {yearEnd: e.target.value})}
                        >
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
                      onChange={(e) => updatePeriod(index, {salary: parseInt(e.target.value)})}
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
          onClick={calculate}
        >
          Calculate
        </button>
      </div>
      {result && (
        <div>
          <h3>Result</h3>
          <p>{result.result}</p>
        </div>
      )}
    </div>
  );
}

export default App;
