import { toast } from "react-toastify";

type Position = "top-right" | "top-center" | "top-left" | "bottom-right" | "bottom-center" | "bottom-left";

export function showNotification(body: string, backgroundClass: string, position: Position = "top-right") {
  if (backgroundClass === "success") {
    toast.success(body, {
      theme: "colored",
      hideProgressBar: true,
      position: position || "top-right",
      autoClose: 2000,
      pauseOnHover: true,
    });
  } else {
    toast.error(body, {
      theme: "colored",
      hideProgressBar: true,
      position: position || "top-right",
      autoClose: 10000,
      closeOnClick: true,
      pauseOnHover: true,
    });
  }
}
