export const sortByVolume = (a, b) => {
  const avol = a.volume;
  const bvol = b.volume;
  if (avol < bvol) {
    return 1;
  } else if (avol > bvol) {
    return -1;
  }
  return 0;
};
