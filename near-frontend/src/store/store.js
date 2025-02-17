import { create } from "zustand";

const useStore = create((set) => ({
  // states
  selector: {},
  accounts: [],
  activeAccount: {},
  balance: 0,
  authState: false,
  accountTrayOpen: false,
  // setstates
  setSelector: (selector) =>
    set({
      selector,
    }),
  setAccounts: (accounts) =>
    set({
      accounts,
    }),

  setAuthState: (authState) =>
    set({
      authState,
    }),
  setActiveAccount(activeAccount) {
    return set({
      activeAccount,
    });
  },
  setAccountTrayOpen(open) {
    return set({
      accountTrayOpen: open,
    });
  },
  setBalance(bal) {
    return set({
      balance: bal,
    });
  },
}));

export default useStore;
