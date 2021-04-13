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
  1994: 4.85,
  1995: 4.12,
  1996: 4.89,
  1997: 3.77,
  1998: 3.5,
  1999: 3.35,
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
