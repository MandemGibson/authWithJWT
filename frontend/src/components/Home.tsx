import { useAuth } from "../hooks/useAuth";

const Home = () => {
  const { user } = useAuth();
  return <div>Welcome {user?.username}</div>;
};

export default Home;
