import { AxiosError } from "axios";
import { Dispatch } from "redux";

export const handleAxiosError = (err: unknown, dispatch: Dispatch, type: string) => {
  if (err instanceof Error && (err as AxiosError).response) {
    const error = (err as AxiosError).response?.data?.error?.message || "An unknown error occurred";

    dispatch({ type, error });

    throw error;
  }
};
