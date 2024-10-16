export type UserType = {
  id: number;
  role: string;
  username: string;
};

export type UserLoginDetails = {
  token: string;
  userDetails: UserType;
};
