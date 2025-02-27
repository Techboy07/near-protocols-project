/* eslint-disable react/prop-types */
import profile from "/header-icons/Group19.svg";
import coin from "/header-icons/nearcoin.svg";
import notification from "/header-icons/Group20.svg";

import useStore from "../store/store";

function Header() {
  const activeAccount = useStore((state) => state.activeAccount);
  const balance = useStore((state) => state.balance);
  const setAccountTrayOpen = useStore((state) => state.setAccountTrayOpen);
  const accounts = useStore((state) => state.accounts);
  const accountTrayOpen = useStore((state) => state.accountTrayOpen);
  const setActiveAccount = useStore((state) => state.setActiveAccount);

  return (
    <>
      {accountTrayOpen ? (
        <AccountTray accounts={accounts} func={setActiveAccount} />
      ) : null}

      <div className="flex justify-between items-center mb-8">
        <div
          className="text-white flex gap-2"
          onClick={() => {
            setAccountTrayOpen(true);
          }}
        >
          <img className="w-10" src={profile} alt="wallet-image" />
          <div>
            <p>
              {activeAccount.accountId
                ? activeAccount.accountId
                : "0x0657..35g"}
            </p>
            <div className="flex items-center gap-2">
              <p>Bal: {balance.toFixed(2)}</p>{" "}
              <img
                className="bg-white p-[2px] w-4 rounded-full"
                src={coin}
                alt="coin-image"
              />
            </div>
          </div>
        </div>
        <div>
          <img src={notification} alt="notify-image" />
        </div>
      </div>
    </>
  );
}

function AccountTray({ accounts, func }) {
  const setAccountTrayOpen = useStore((state) => state.setAccountTrayOpen);

  return (
    <div className="fixed left-0 top-0 w-full z-40">
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

export default Header;
