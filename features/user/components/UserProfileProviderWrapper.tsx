import GlobalLoading from "components/GlobalLoading";
import RedirectToSignup from "components/RedirectToSignup";
import { AuthServiceProvider } from "features/authentications/contexts/auth-service.context";
import { UserProfileContextProvider } from "features/authentications/contexts/user.context";
import { User } from "firebase/auth";
import { ReactNode } from "react";

const UserProfileProviderWrapper = ({
  children,
  isLoading,
  user,
}: {
  children: ReactNode | undefined;
  isLoading: boolean;
  user: User | null;
}) => {
  return (
    <div>
      {isLoading && <GlobalLoading />}
      {!isLoading && user && (
        <UserProfileContextProvider user={user}>
          <AuthServiceProvider>{children}</AuthServiceProvider>
        </UserProfileContextProvider>
      )}
      {!isLoading && !user && <RedirectToSignup />}
    </div>
  );
};

export default UserProfileProviderWrapper;
