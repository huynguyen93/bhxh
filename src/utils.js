import {salaryTypes} from "./constants";

function calculatePeriods(periods) {
  let totalMonthsBefore2014 = 0;
  let totalMonthsFrom2014 = 0;
  let adjustedSalary = 0;

  periods.forEach(period => {
    const monthStart = parseInt(period.monthStart);
    const yearStart = parseInt(period.yearStart);
    const monthEnd = parseInt(period.monthEnd);
    const yearEnd = parseInt(period.yearEnd);
    const salary = parseInt(period.salary);
    const salaryType = period.salaryType;
    const insuranceSalary = salaryType === salaryTypes.contracted
      ? contractedSalaryToInsuranceSalary(salary)
      : salary;

    for (let year = yearStart; year <= yearEnd; year++) {
      const adjustment = getAdjustmentRate(year);
      let totalMonthsOfPeriod = 0;

      if (yearStart === yearEnd) {
        totalMonthsOfPeriod = monthEnd - monthStart + 1;
      } else if (year === yearStart) {
        totalMonthsOfPeriod = 12 - monthStart + 1;
      } else if (year === yearEnd) {
        totalMonthsOfPeriod = monthEnd;
      } else {
        totalMonthsOfPeriod = 12;
      }

      adjustedSalary += (totalMonthsOfPeriod * insuranceSalary * adjustment);

      if (yearEnd < 2014) {
        totalMonthsBefore2014 += totalMonthsOfPeriod;
      } else {
        totalMonthsFrom2014 += totalMonthsOfPeriod;
      }
    }
  });

  const totalMonths = totalMonthsBefore2014 + totalMonthsFrom2014;
  const adjustedAverageSalary = adjustedSalary / totalMonths;
  const totalYearsBefore2014 = totalMonthsBefore2014 / 12;
  const totalYearsFrom2014 = totalMonthsFrom2014 / 12;

  return {
    result: (1.5 * adjustedAverageSalary * totalYearsBefore2014) + (2.5 * adjustedAverageSalary * totalYearsFrom2014)
  };
}

function validatePeriod(period) {
  const {salary, monthStart, monthEnd, yearStart, yearEnd} = period;
  let errorMessage = '';

  if (!salary || !monthStart || !monthEnd || !yearStart || !yearEnd) {
    errorMessage = 'Vui lòng điền hết thông tin!';
  }

  return errorMessage;
}

function getAdjustmentRate(year) {
  return 2;
}

function getNumberOfYear({monthStart, yearStart, monthEnd, yearEnd}) {
  return 1;
}

function contractedSalaryToInsuranceSalary(contractedSalary) {

}

export default {
  calculatePeriods,
  validatePeriod,
};
