export const adjustmentsByYear = {
  1995: 4.72,
};

export const months = Array(12).fill('').map((_, i) => 'Tháng ' + `${i + 1}`.padStart(2, '0'));

const currentYear = new Date().getFullYear();
const oldestYear = currentYear - 30;

const years = [];
for (let year = currentYear; year > oldestYear; year--) {
  years.push(year);
}

export {years};
