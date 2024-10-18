import AuthPage from "./components/AuthPage";
import Home from "./components/Home";
import SignIn from "./components/SignIn";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./components/SignUp";
import ProtectedRoute from "./components/ProtectedRoute";
import { useEffect } from "react";
import { useAuth } from "./hooks/useAuth";

function App() {
  const { setUser, setIsLoading } = useAuth();

  useEffect(() => {
    const CheckAuthStatus = async () => {
      setIsLoading(true);
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
  }, [setUser, setIsLoading]);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/auth" element={<AuthPage />}>
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
