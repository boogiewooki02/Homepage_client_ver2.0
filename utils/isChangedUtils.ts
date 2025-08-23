export const isChanged = (
  original: { [key: string]: any },
  current: { [key: string]: any }
): boolean => {
  return Object.keys(original).some((key) => original[key] !== current[key]);
};
