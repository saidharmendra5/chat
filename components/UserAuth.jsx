import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserDetails } from "../contex/IsLoggedIn";

const UserAuth = ({ children }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // control flow
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { loggeduser , setLoggedUser } = useContext(UserDetails);
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('http://localhost:8000/chat/verify', {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" }
        });

        const result = await response.json();

        if (response.ok) {
          setIsAuthenticated(true);
          console.log("authenticated : user details from server : ", result.user);
          
          setLoggedUser(result.user);
        } else {
          navigate('/');
        }
      } catch (err) {
        console.log("Error in UserAuth:", err);
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) return <div>Loading...</div>;

  return isAuthenticated ? children : null;
};

export default UserAuth;
