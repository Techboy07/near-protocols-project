import profile from "/header-icons/Group19.svg";
import coin from "/header-icons/nearcoin.svg";
import notification from "/header-icons/Group20.svg";

import useStore from "../store/store";

function Header() {
  const activeAccount = useStore((state) => state.activeAccount);
  const balance = useStore((state) => state.balance);
  const setAccountTrayOpen = useStore((state) => state.setAccountTrayOpen);

  return (
    <div
      className="flex justify-between items-center mb-8"
      onClick={() => {
        setAccountTrayOpen(true);
      }}
    >
      <div className="text-white flex gap-2">
        <img className="w-10" src={profile} alt="wallet-image" />
        <div>
          <p>
            {activeAccount.accountId ? activeAccount.accountId : "0x0657..35g"}
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
  );
}

export default Header;
