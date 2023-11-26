export type PermissionFlag = (typeof permissionFlags)[number];
export type PermissionFlagRecord = Record<PermissionFlag, boolean>;
export type PermissionFlagsState = {
  userPermissionFlags: PermissionFlagRecord | null;
};

export const permissionFlags = ["test", "test2"] as const;
export const initialPermissionFlagsState: Readonly<PermissionFlagsState> = {
  userPermissionFlags: null,
};

export function isPermissionFlags(flags: unknown): flags is PermissionFlagRecord {
  const isNonEmptyObject = typeof flags === "object" && flags !== null;
  if (isNonEmptyObject) {
    const areAllKeysValid = Object.keys(flags).every((key) => Object.values(flags).includes(key as PermissionFlag));
    const areAllValuesValid = Object.values(flags).every((value) => typeof value === "boolean");
    const isValidPermissionFlags = areAllValuesValid && areAllKeysValid;
    return isValidPermissionFlags;
  }
  return false;
}
