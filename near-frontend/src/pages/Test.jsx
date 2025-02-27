import Button from "../components/Button";
import useStore from "../store/store";
import connectToNear from "../connections/connect-to-near";

function Test() {
  const activeAccount = useStore((state) => state.activeAccount);
  async function callNearFunction() {
    const nearConnection = await connectToNear();
    const userAccount = await nearConnection.account(activeAccount.accountId);
    console.log(await userAccount.connection.signer);
    // console.log(userAccount.accountId);

    try {
      console.log(
        await userAccount
          // .signAndSendTransaction({
          //   transactions: [
          //     {
          //       receiverId: userAccount.accountId,
          //       actions: [
          //         {
          //           type: "FunctionCall",
          //           params: {
          //             contractId: "milam-ft.dev-1670602093214-42636269062771",
          //             methodName: "ft_balance_of",
          //             // args: {
          //             //   greeting: "Hello World",
          //             // },
          //             // gas: THIRTY_TGAS,
          //             // deposit: NO_DEPOSIT
          //           },
          //         },
          //       ],
          //     },
          //   ],
          // })

          .functionCall({
            contractId: "milam-ft.dev-1670602093214-42636269062771",
            methodName: "ft_balance_of",
            args: {
              account_id: userAccount.accountId,
            },
          })
      );
    } catch (error) {
      console.log(error);
    }
  }

  return <Button text={"call function"} handleClick={callNearFunction} />;
}

export default Test;

// functionCall({ contractId, methodName, args, gas, attachedDeposit, walletMeta, walletCallbackUrl, stringify, jsContract }: ChangeFunctionCallOptions): Promise<FinalExecutionOutcome>
