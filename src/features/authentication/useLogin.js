import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { login as loginApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useLogin() {
  const navigate = useNavigate();

  const { mutate: login, isLoading } =
    useMutation({
      mutationFn: ({ email, password }) =>
        loginApi({ email, password }),
      onSuccess: () => {
        toast.success("Login successful!"); // Success toast
        navigate("/dashboard");
      },
      onError: (error) => {
        toast.error(
          `Login failed: ${error.message}`
        ); // Error toast
        console.error("Login failed:", error);
      },
    });

  return { login, isLoading };
}
