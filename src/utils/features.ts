import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { messageResponce } from "../types/api-types";
import { SerializedError } from "@reduxjs/toolkit";
import { NavigateFunction } from "react-router-dom";
import toast from "react-hot-toast";

type resType =
  | {
      data: messageResponce;
    }
  | {
      error: FetchBaseQueryError | SerializedError;
    };

export const responceTost = (
  res: resType,
  navigate: NavigateFunction | null,
  url: string
) => {
  if ("data" in res) {
    toast.success(res.data.message);
    if (navigate) navigate(url);
  } else {
    const error = res.error as FetchBaseQueryError;
    const messageResponce = error.data as messageResponce;
    toast.error(messageResponce.message);
  }
};
