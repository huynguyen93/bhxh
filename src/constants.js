const million = 1000000;

export const adjustmentsByYear = {
  1995: 4.72,
};

export const months = Array(12).fill('').map((_, i) => 'Tháng ' + `${i + 1}`.padStart(2, '0'));

export const years = [];
export const currentYear = new Date().getFullYear();
export const oldestYear = currentYear - 30;
for (let year = currentYear; year > oldestYear; year--) {
  years.push(year);
}

export const zones = {zone1: 'I', zone2: 'II', zone3: 'III', zone4: 'IV'};
export const zoneLabels = {
  [zones.zone1]: 'I',
  [zones.zone2]: 'II',
  [zones.zone3]: 'III',
  [zones.zone4]: 'IV',
};
export const baseSalary = 1.49 * million;
export const maximumInsurancePerMonth = baseSalary * 20;
export const minimumSalaryByZone = {
  [zones.zone1]: Math.round(4.18 * million),
  [zones.zone2]: Math.round(3.71 * million),
  [zones.zone3]: Math.round(3.25 * million),
  [zones.zone4]: Math.round(2.92 * million),
};
export const salaryTypes = {contracted: 'contracted', insurance: 'insurance'};

export const percentageCompanyPays = 17.5;
export const percentageWorkerPays = 8;

export const adjustments = {
  1994: 5.1,
  1995: 4.33,
  1996: 4.09,
  1997: 3.96,
  1998: 3.68,
  1999: 3.53,
  2000: 3.58,
  2001: 3.59,
  2002: 3.46,
  2003: 3.35,
  2004: 3.11,
  2005: 2.87,
  2006: 2.67,
  2007: 2.47,
  2008: 2.01,
  2009: 1.88,
  2010: 1.72,
  2011: 1.45,
  2012: 1.33,
  2013: 1.25,
  2014: 1.2,
  2015: 1.19,
  2016: 1.16,
  2017: 1.12,
  2018: 1.08,
  2019: 1.05,
  2020: 1.02,
  2021: 1,
  2022: 1,
};
