const pick = <T extends Record<string, unknown>, k extends keyof T>(
  obj: T,
  keys: k[]
) => {
    // Partial meaning partial of T meaning some param could be missing
  const finalObj: Partial<T> = {};

  // ['page', 'limit', 'sortBy', 'sortOrder']

  for (const key of keys) {
    if (obj && Object.hasOwnProperty.call(obj, key)) {
      finalObj[key] = obj[key];
    }
  }
  return finalObj;
};

export default pick;
