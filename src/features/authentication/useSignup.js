import { toast } from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

import { signup as signupApi } from "../../services/apiAuth";

export function useSignup() {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: signupApi,
    onSuccess: () => {
      toast.success(
        "Account successfully created!\nPlease verify the new account from the user's email address.",
        { duration: 5500 }
      );
    },
  });

  return { signup, isLoading };
}
