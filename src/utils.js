import {adjustments, percentageCompanyPays, percentageWorkerPays, salaryTypes} from "./constants";

function calculatePeriods(periods) {
  let totalMonthsBefore2014 = 0;
  let totalMonthsFrom2014 = 0;
  let adjustedSalary = 0;
  let estimatedContributed = 0;
  let adjustedAverageSalaryFormula = '{';

  periods.forEach(period => {
    const monthStart = parseInt(period.monthStart);
    const yearStart = parseInt(period.yearStart);
    const monthEnd = parseInt(period.monthEnd);
    const yearEnd = parseInt(period.yearEnd);
    const salary = parseInt(period.salary.split(' ').join(''));
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

      adjustedAverageSalaryFormula += `(${totalMonthsOfPeriod} * ${formatNumber(insuranceSalary)} * ${adjustment})`
      adjustedSalary += (totalMonthsOfPeriod * insuranceSalary * adjustment);
      estimatedContributed += (totalMonthsOfPeriod * insuranceSalary) * 20 / 100;

      if (year < 2014) {
        totalMonthsBefore2014 += totalMonthsOfPeriod;
      } else {
        totalMonthsFrom2014 += totalMonthsOfPeriod;
      }
    }
  });

  const totalMonths = totalMonthsBefore2014 + totalMonthsFrom2014;

  const adjustedAverageSalary = adjustedSalary / totalMonths;
  const totalYearsBefore2014 = calculateTotalYears(totalMonthsBefore2014);
  const totalYearsFrom2014 = calculateTotalYears(totalMonthsFrom2014);

  adjustedAverageSalaryFormula = adjustedAverageSalaryFormula.split(')(').join(') + (');
  adjustedAverageSalaryFormula += `} : ${totalMonths}`;

  return {
    totalYearsBefore2014,
    totalYearsFrom2014,
    adjustedAverageSalaryFormula,
    estimatedContributed,
    adjustedSalary,
    adjustedAverageSalary,
    totalMonths,
    amountWillReceive: (1.5 * adjustedAverageSalary * totalYearsBefore2014) + (2 * adjustedAverageSalary * totalYearsFrom2014)
  };
}

function calculateTotalYears(totalMonths) {
  const modulo = totalMonths % 12;
  const rawYears = totalMonths / 12;
  if (modulo === 0) {
    return rawYears;
  } else if (modulo <= 6) {
    return Math.round(rawYears) + 0.5
  } else {
    return Math.ceil(rawYears);
  }
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
  const years = Object.keys(adjustments);
  if (year < years[0]) {
    return adjustments[years[0]];
  }

  if (year > years[years.length - 1]) {
    return adjustments[years[years.length - 1]];
  }

  return adjustments[year];
}

function contractedSalaryToInsuranceSalary(contractedSalary) {

}

function calculateAmountPaid(insuranceSalary) {
  const byCompany = insuranceSalary * percentageCompanyPays / 100;
  const byWorker = insuranceSalary * percentageWorkerPays / 100;

  return {
    byCompany,
    byWorker,
    total: byCompany + byWorker,
  };
}

function formatNumber(number, withVnd = false) {
  const suffix = withVnd ? ' vnđ' : '';
  return Math.round(number).toLocaleString('en') + suffix;
}

export default {
  calculatePeriods,
  validatePeriod,
  calculateAmountPaid,
  formatNumber,
};
