export const getEnumOptions = <T extends object, TEnum>(enumType: T, mapper: Map<TEnum, string>): Array<{ label: any; value: any }> => {
  const result = Object.entries(enumType)
    .filter(([k]) => isNaN(Number(k)))
    .map(([key, value]) => {
      return {
        label: mapper.get(value),
        value: key,
      };
    });
  return result;
};
