export enum DepartmentRole {
  DEVELOPER = 'Developer',
  TEAM_LEADER = 'Team Leader',
}


export const getReadableValue = (role: DepartmentRole): string => {
  const enumValue = Object.values(DepartmentRole).find(val => {
    return val.replace(" ", "_").toLowerCase() === role.toLowerCase();
  });
  return enumValue !== undefined ? enumValue : ''
}
