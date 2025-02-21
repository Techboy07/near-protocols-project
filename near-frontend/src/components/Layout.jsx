import TabNavigation from "./TabNavigation";
import useStore from "../store/store";

import Header from "./Header";
import { Outlet } from "react-router";

// eslint-disable-next-line react/prop-types
function AccountTray({ accounts, func }) {
  const setAccountTrayOpen = useStore((state) => state.setAccountTrayOpen);

  return (
    <div className="fixed left-0 top-0 w-full">
      <div
        className="w-full min-h-screen backdrop-blur-3xl px-5 py-20 max-w-xl mx-auto"
        onClick={() => setAccountTrayOpen(false)}
      >
        <p className="text-white text-center font-bold text-2xl mb-10">
          Select active account
        </p>
        {
          // eslint-disable-next-line react/prop-types
          accounts.map((account) => {
            return (
              <button
                className="bg-accent  rounded-md text-white text-2xl px-5 py-3 w-full mb-8 text-center "
                onClick={() => func(account)}
                key={account.accountId}
              >
                {account.accountId}
              </button>
            );
          })
        }
      </div>
    </div>
  );
}

function Layout() {
  const accounts = useStore((state) => state.accounts);
  const accountTrayOpen = useStore((state) => state.accountTrayOpen);
  const setActiveAccount = useStore((state) => state.setActiveAccount);

  return (
    <div className="text-white px-5 pt-10">
      {accountTrayOpen ? (
        <AccountTray accounts={accounts} func={setActiveAccount} />
      ) : null}
      <Header />
      <Outlet />
      <TabNavigation />
    </div>
  );
}

export default Layout;
