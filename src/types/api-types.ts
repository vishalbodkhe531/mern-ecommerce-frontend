import { User } from "./types";

export type messageResponce = {
  success: boolean;
  message: string;
};

export type userResponce = {
  success: boolean;
  user: User;
};
