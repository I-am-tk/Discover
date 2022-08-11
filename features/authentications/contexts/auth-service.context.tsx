import React, { ReactNode, useContext } from "react";
import * as authSerive from "../services/auth.service";

const AuthServiceDefaultValue = {
  signup: authSerive.signup,
  login: authSerive.login,
  logout: authSerive.logout,
  resetUserPassword: authSerive.resetUserPassword,
  updateUserEmail: authSerive.updateUserEmail,
  updateUserPassword: authSerive.updateUserPassword,
  googleSignInWithPopup: authSerive.googleSignInWithPopup,
  guestLogin: authSerive.guestLogin,
};

const AuthServiceContext = React.createContext(AuthServiceDefaultValue);

export const AuthServiceProvider = ({ children }: { children: ReactNode }) => {
  return (
    <AuthServiceContext.Provider value={AuthServiceDefaultValue}>
      {children}
    </AuthServiceContext.Provider>
  );
};

export const useAuthService = () => useContext(AuthServiceContext);
