import PathButton from "../components/PathButton";
import { useNavigate } from "react-router";
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
  const navigate = useNavigate();

  const paths = useState([
    { text: "Manage Bio", icon: "/splash-icons/BioThin.png", link: "bio" },
    {
      text: "Manage DMs",
      icon: "/splash-icons/Vector(1).svg",
      link: "messages",
    },
    { text: "Manage Tweets", icon: "/splash-icons/Vector.svg", link: "posts" },
    {
      text: "Manage Posts",
      icon: "/splash-icons/Vector(2).svg",
      link: "posts",
    },
    { text: "Manage Spaces", icon: "/splash-icons/Frame3.svg", link: "spaces" },
  ])[0];
  return (
    <div>
      <div className="flex mb-8 items-center justify-between">
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

      {paths.map(({ text, icon, link }, idx) => (
        <PathButton
          text={text}
          icon={icon}
          func={() => navigate(`/main/${link}`)}
          key={idx}
        />
      ))}
    </div>
  );
};

export default Home;
