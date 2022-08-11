import { useState, useRef, useEffect } from "react";
import { User } from "firebase/auth";
import * as authService from "../services";

export const useInitializeUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    const unSubscribeAuthChange = authService.subscribeAuthChange((user) => {
      if (user) {
        setUser(user);
      }
      if (!user) {
        setUser(null);
      }
      setIsLoading(false);
    });
    return unSubscribeAuthChange;
  }, []);

  return { user, isLoading };
};
