import { createContext, useContext, type ReactNode } from "react";
import { useAuth } from "react-oidc-context";


/* ===== UserData Type ===== */
interface UserData {
  userImage: string;
  userName: string;
  displayName: string;
}


/* ===== Context Type ===== */
interface UserContextType {
  isAuthenticated: boolean;
  userData: UserData | null;
}


/* ===== Context Setup ===== */
const UserContext = createContext<UserContextType | undefined>(undefined);


/* ===== Provider Component ===== */
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const auth = useAuth();

  /* Get User Data */
  const userData: UserData | null =
    auth.isAuthenticated && auth.user
    ? {
        userImage: "https://randomuser.me/api/portraits/men/1.jpg",
        userName: auth.user.profile.preferred_username ?? "unknown-user",
        displayName: auth.user.profile.name ?? "Unknown User",
      }
    : null;

  /* Provider return */
  return (
    <UserContext.Provider
      value={{
        isAuthenticated: auth.isAuthenticated,
        userData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};


/* ===== Custom Hook ===== */
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};
