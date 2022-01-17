import Sidebar from "./Sidebar";
import { useRouter } from "next/router";

const Layout = ({ children }) => {
  const router = useRouter();

  return (
    <div className="flex bg-black h-screen">
      {router.pathname !== "/login" && <Sidebar />}
      {children}
    </div>
  );
};

export default Layout;
