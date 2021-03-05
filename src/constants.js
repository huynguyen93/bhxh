const million = 1000000;

export const adjustmentsByYear = {
  1995: 4.72,
};

export const months = Array(12).fill('').map((_, i) => 'Tháng ' + `${i + 1}`.padStart(2, '0'));

export const years = [];
const currentYear = new Date().getFullYear();
const oldestYear = currentYear - 30;
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
