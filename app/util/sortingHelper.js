const compareByName = (a, b) => {
  if (a.name < b.name) return -1;
  if (a.name > b.name) return 1;
  return 0;
};
const compareByCar = (a, b) => {
  if (!a.car && b.car) return -1;
  if (a.car && !b.car) return 1;
  return 0;
};

const sortingHelper = {
  compareByName,
  compareByCar,
};

export default sortingHelper;
