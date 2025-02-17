import Header from "../components/Header";
import PathButton from "../components/PathButton";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import connectToNear, {
  convertYoctoNear,
} from "../connections/connect-to-near";

import useStore from "../store/store";

import modal, { selector } from "../wallets/modal";

const Home = () => {
  const authState = useStore((state) => state.authState);
  const setAuthState = useStore((state) => state.setAuthState);
  const activeAccount = useStore((state) => state.activeAccount);
  const setActiveAccount = useStore((state) => state.setActiveAccount);
  const accounts = useStore((state) => state.accounts);
  const setAccounts = useStore((state) => state.setAccounts);
  const accountTrayOpen = useStore((state) => state.accountTrayOpen);
  const setBalance = useStore((state) => state.setBalance);
  const setAccountTrayOpen = useStore((state) => state.setAccountTrayOpen);

  // function updateAccountInfo() {}
  async function disconnect() {
    selector.then(async (selector) => {
      const wallet = await selector.wallet();
      wallet.signOut();
      setAuthState(selector.isSignedIn());
      console.log(authState);
    });
    console.log("disconnected");
  }

  useEffect(() => {
    selector.then(async (selector) => {
      try {
        const wallet = await selector.wallet();
        const acunts = await wallet.getAccounts();
        setAccounts(acunts);

        if (activeAccount.accountId) {
          // establish a near connection
          const nearConnection = await connectToNear();
          const userAccount = await nearConnection.account(
            activeAccount.accountId
          );
          const acctBalance = await userAccount.getAccountBalance();
          const nearBal = Number(convertYoctoNear(acctBalance.available));
          setBalance(nearBal);
        }
        if (!activeAccount.accountId) {
          setAccountTrayOpen(true);
        }

        selector.on("signedIn", async () => {
          setAuthState(selector.isSignedIn());
          const acunts = await wallet.getAccounts();
          setAccounts(acunts);
          setAccountTrayOpen(true);
          console.log("signed in");
        });

        selector.on("signedOut", () => {
          setAuthState(selector.isSignedIn());
          setAccounts([]);
          setActiveAccount({});
          console.log("signed out");
        });

        setAuthState(selector.isSignedIn());
      } catch (error) {
        console.log(error);
      }
      // console.log("second effect", activeAccount);

      // console.log(await selector.wallet());
      // console.log(authState);
    });
  }, [authState, activeAccount, accountTrayOpen]);

  const paths = useState([
    { text: "Manage Bio", icon: "/splash-icons/BioThin.png" },
    { text: "Manage DMs", icon: "/splash-icons/Vector(1).svg" },
    { text: "Manage Tweets", icon: "/splash-icons/Vector.svg" },
    {
      text: "Manage Posts",
      icon: "/splash-icons/Vector(2).svg",
    },
    { text: "Manage Spaces", icon: "/splash-icons/Frame3.svg" },
  ])[0];
  return (
    <div className="text-white px-5 pt-10">
      {accountTrayOpen ? (
        <AccountTray accounts={accounts} func={setActiveAccount} />
      ) : null}
      <Header />
      {paths.map(({ text, icon }, idx) => (
        <PathButton text={text} icon={icon} func={() => {}} key={idx} />
      ))}
      {!authState ? (
        <Button
          text={"Connect"}
          handleClick={async () => {
            const newModal = await modal;
            newModal.show();
          }}
        />
      ) : (
        <>
          <Button
            text={"Connect"}
            handleClick={async () => {
              const newModal = await modal;
              newModal.show();
            }}
          />
          <Button text={"Disconnect"} handleClick={disconnect} />
        </>
      )}
    </div>
  );
};

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

export default Home;
