import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useUser } from "./UserContext";
import SidePanel from "./Pages/SidePanel";

export default function App() {
  const { user } = useUser()
  const navigate = useNavigate();

  useEffect(() => {
    if (user == null) {
      navigate("/signup");
    }
  }, []);

  return (
  <>
      <SidePanel />
      <Outlet />
  </>
  );
}
