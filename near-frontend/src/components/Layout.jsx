import TabNavigation from "./TabNavigation";
import useStore from "../store/store";

import Header from "./Header";
import { Outlet } from "react-router";
import { useEffect } from "react";

// eslint-disable-next-line react/prop-types

function Layout() {
  const accounts = useStore((state) => state.accounts);

  useEffect(() => {}, [accounts]);

  return (
    <div className="text-white px-5 pt-10 md:px-10">
      <Header />
      <Outlet />
      <TabNavigation />
    </div>
  );
}

export default Layout;
