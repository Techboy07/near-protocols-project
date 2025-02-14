import Button from "./Button";
import PathButton from "./PathButton";
import TabNavigation from "./TabNavigation";
// import Input from "./Input";
import { useState, useEffect } from "react";

import modal, { selector } from "../wallets/modal";
import connectToNear from "../connections/connect-to-near";
import Header from "./Header";

// eslint-disable-next-line react/prop-types
function Form({ account, signedIn }) {
  const [balance, setBalance] = useState(null);
  // const [acct, setAcct] = useState(null);

  useEffect(() => {
    connectToNear().then(async (nearConnection) => {
      // eslint-disable-next-line react/prop-types
      const userAccount = await nearConnection.account(account.accountId);

      if (userAccount) {
        // setAcct(userAccount);
        const acctBalance = await userAccount.getAccountBalance();
        setBalance(acctBalance);
      }
    });
  }, [signedIn, account]);

  return account ? (
    <div className="bg-white px-10 py-5 w-max">
      <p>
        <span style={{ fontWeight: "bold" }}>acountId: </span>
        {/* eslint-disable-next-line react/prop-types */}
        {account.accountId}
      </p>
      <p className="form-para">
        {/* eslint-disable-next-line react/prop-types */}
        <span style={{ fontWeight: "bold" }}>pubKey:</span> {account.publicKey}
      </p>

      <p className="form-para">
        <span style={{ fontWeight: "bold" }}> total balance:</span>{" "}
        {balance ? balance.total : ""}
      </p>

      <p className="form-para">
        <span style={{ fontWeight: "bold" }}> available balance:</span>{" "}
        {balance ? balance.available : ""}
      </p>
      <p className="form-para">
        <span style={{ fontWeight: "bold" }}> staked balance:</span>{" "}
        {balance ? balance.staked : ""}
      </p>
    </div>
  ) : null;
}

const Login = () => {
  const [account, setAccount] = useState([]);
  const [signedIn, setSignedIn] = useState(false);

  // const [pubKey, setPubKey] = useState(true);
  useEffect(() => {
    selector.then(async (selector) => {
      setSignedIn(selector.isSignedIn());
      const wallet = await selector.wallet();
      const accounts = await wallet.getAccounts();
      setAccount(accounts);
    });
  }, [signedIn]);

  return (
    <div className="w-max space-y-7 mx-auto pt-20 px-3">
      <Header />
      <Button
        login={true}
        handleClick={async () => {
          const newModal = await modal;
          newModal.show();
        }}
      />
      {/* {account.map((account) => {
        return (
          <Form account={account} key={account.accountId} signedIn={signedIn} />
        );
      })} */}
      <PathButton
        text="Manage Bio"
        icon="/splash-icons/BioThin.png"
        func={() => {}}
      />
      <TabNavigation />
    </div>
  );
};

export default Login;
