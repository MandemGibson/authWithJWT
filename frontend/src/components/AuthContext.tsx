import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";

type User = {
  id: number;
  username: string;
  email: string;
};

type AuthContextProps = {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  setUser: () => {},
  isLoading: true,
  setIsLoading: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const CheckAuthStatus = async () => {
      try {
        const res = await fetch("/api/v1/auth/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        const data = await res.json();
        console.log(data);
        if (res.ok) {
          await setUser(data);
        } else setUser(null);
      } catch (error) {
        console.error("Error getting me: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    CheckAuthStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, isLoading, setIsLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
