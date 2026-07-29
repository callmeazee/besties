import axios from "axios";
import { toast, type ToastPosition } from "react-toastify";

const CatchError = (err: unknown, position: ToastPosition = "top-center") => {
  if (axios.isAxiosError(err))
    return toast.error(err.response?.data.message, { position: position });
  //we can also write {position:position} to {position } as a short hand property

  if (err instanceof Error)
    return toast.error(err.message, { position: position });

  return toast.error("Netwrok error", { position: position });
};

export default CatchError;
