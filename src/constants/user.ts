export const GENDER_TYPES = {
  MALE: "male",
  FEMALE: "female",
} as const;

export type GenderTypes = (typeof GENDER_TYPES)[keyof typeof GENDER_TYPES];