import {percentageCompanyPays, percentageWorkerPays, salaryTypes} from "./constants";

function calculatePeriods(periods) {
  let totalMonthsBefore2014 = 0;
  let totalMonthsFrom2014 = 0;
  let adjustedSalary = 0;

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
    adjustedAverageSalary,
    totalMonths,
    amountWillReceive: (1.5 * adjustedAverageSalary * totalYearsBefore2014) + (2 * adjustedAverageSalary * totalYearsFrom2014)
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
  const mapping = {
    1995: 4.85,
    1996: 4.12,
    1997: 3.89,
    1998: 3.77,
    1999: 3.5,
    2000: 3.41,
    2001: 3.42,
    2002: 3.29,
    2003: 3.19,
    2004: 2.96,
    2005: 2.73,
    2006: 2.54,
    2007: 2.35,
    2008: 1.91,
    2009: 1.79,
    2010: 1.64,
    2011: 1.38,
    2012: 1.26,
    2013: 1.18,
    2014: 1.14,
    2015: 1.13,
    2016: 1.1,
    2017: 1.06,
    2018: 1.03,
    2019: 1,
    2020: 1,
  };

  const years = Object.keys(mapping);
  if (year < mapping[years[0]]) {
    return mapping[years[0]];
  }

  if (year > mapping[years[years.length - 1]]) {
    return mapping[years[years.length - 1]];
  }

  return mapping[year];
}

function getNumberOfYear({monthStart, yearStart, monthEnd, yearEnd}) {
  return 1;
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

function formatNumber(number) {
  return Math.round(number).toLocaleString('en');
}

export default {
  calculatePeriods,
  validatePeriod,
  calculateAmountPaid,
  formatNumber,
};
