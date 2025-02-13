import Button from "./Button";
// import Input from "./Input";
import { useState, useEffect } from "react";

import modal, { selector } from "../wallets/modal";
import connectToNear from "../connections/connect-to-near";

// eslint-disable-next-line react/prop-types
function Form({ account, signedIn }) {
  const [balance, setBalance] = useState(null);
  const [acct, setAcct] = useState(null);

  useEffect(() => {
    connectToNear().then(async (nearConnection) => {
      const userAccount = await nearConnection.account(account.accountId);

      if (userAccount) {
        setAcct(userAccount);
        const acctBalance = await userAccount.getAccountBalance();
        setBalance(acctBalance);
      }
    });
  }, [signedIn]);

  return account ? (
    <div className="bg-white px-10 py-5 w-max text-2xl">
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
        <span style={{ fontWeight: "bold" }}> total balance :</span>{" "}
        {balance ? balance.total : ""}
      </p>

      <p className="form-para">
        <span style={{ fontWeight: "bold" }}> available balance :</span>{" "}
        {balance ? balance.available : ""}
      </p>
      <p className="form-para">
        <span style={{ fontWeight: "bold" }}> staked balance :</span>{" "}
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
    <div className="w-max space-y-7 mx-auto pt-20">
      <Button
        login={true}
        handleClick={async () => {
          const newModal = await modal;
          newModal.show();
        }}
      />
      {account.map((account) => {
        return (
          <Form account={account} key={account.accountId} signedIn={signedIn} />
        );
      })}
    </div>
  );
};

export default Login;
