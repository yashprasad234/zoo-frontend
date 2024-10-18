import type { UserType } from "./user";
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

export type AnimalHistoryType = {
  id: Number;
  from_zoo: ZooType;
  to_zoo: ZooType;
  animal_id: AnimalType;
  user: UserType;
  transferredOn?: Date;
};
