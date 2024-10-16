import type { ZooType } from "./zoo";

export type AnimalType = {
  id?: number;
  zoo?: ZooType;
  name: string;
  gender: string;
  animalImg: string;
  dob: Date;
  species: string;
  habitat: string;
};
