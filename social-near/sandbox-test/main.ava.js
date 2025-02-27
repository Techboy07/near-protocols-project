import anyTest from 'ava';
import { Worker } from 'near-workspaces';
import {HelloNear} from "../src/contract"
import { setDefaultResultOrder } from 'dns'; setDefaultResultOrder('ipv4first'); // temp fix for node >v17

/**
 *  @typedef {import('near-workspaces').NearAccount} NearAccount
 *  @type {import('ava').TestFn<{worker: Worker, accounts: Record<string, NearAccount>}>}
 */
const test = anyTest;

test.beforeEach(async t => {
  // Create sandbox
  const worker = t.context.worker = await Worker.init();

  // Deploy contract
  const root = worker.rootAccount;
  const contract = await root.createSubAccount('test-account');

  // Get wasm file path from package.json test script in folder above
  await contract.deploy(
    process.argv[2],
  );

  // Save state for test runs, it is unique for each test
  t.context.accounts = { root, contract };
});

test.afterEach.always(async (t) => {
  await t.context.worker.tearDown().catch((error) => {
    console.log('Failed to stop the Sandbox:', error);
  });
});

test('returns the default greeting', async (t) => {
  const { contract } = t.context.accounts;
  const greeting = await contract.view('get_greeting', {});
  t.is(greeting, 'Hello');
});

test('changes the greeting', async (t) => {
  const { root, contract } = t.context.accounts;
  await root.call(contract, 'set_greeting', { greeting: 'Howdy' });
  const greeting = await contract.view('get_greeting', {});
  t.is(greeting, 'Howdy');
});


 // the test code for the approval and transfer funds
function setupEnvironment({ predecessor, signer, balance }) {
  VMContext.setPredecessor_account_id(predecessor);
  VMContext.setSigner_account_id(signer);
  VMContext.setAccount_balance(balance);
}

describe("HelloNear Contract", () => {
  let contract;

  beforeEach(() => {
    contract = new TokenDeduction(); 

  it("should approve a spender to deduct tokens", () => {
    
    setupEnvironment({
      predecessor: "alice.near",
      signer: "alice.near",
      balance: "1000",
    });

    
    contract.approve({ spender: "bob.near", amount: 100 });

    
    const allowance = contract.get_allowance({
      owner: "alice.near",
      spender: "bob.near",
    });
    expect(allowance).toBe(100);
  });

  it("should log a transfer on behalf of the owner", () => {
   
    setupEnvironment({
      predecessor: "alice.near",
      signer: "alice.near",
      balance: "1000",
    });

    
    contract.approve({ spender: "bob.near", amount: 100 });

    
    setupEnvironment({
      predecessor: "bob.near",
      signer: "bob.near",
      balance: "1000",
    });

   
    contract.transfer_from({
      owner: "alice.near",
      recipient: "charlie.near",
      amount: 50,
    });

    
    const allowance = contract.get_allowance({
      owner: "alice.near",
      spender: "bob.near",
    });
    expect(allowance).toBe(50);
  });

  it("should fail if the spender does not have enough allowance", () => {
   
    setupEnvironment({
      predecessor: "alice.near",
      signer: "alice.near",
      balance: "1000",
    });

   
    contract.approve({ spender: "bob.near", amount: 100 });

  
    setupEnvironment({
      predecessor: "bob.near",
      signer: "bob.near",
      balance: "1000",
    });

   
    expect(() => {
      contract.transfer_from({
        owner: "alice.near",
        recipient: "charlie.near",
        amount: 150,
      });
    }).toThrow("Not enough allowance");
  });

  it("should return 0 allowance if no approval exists", () => {
    
    setupEnvironment({
      predecessor: "alice.near",
      signer: "alice.near",
      balance: "1000",
    });

   
    const allowance = contract.get_allowance({
      owner: "alice.near",
      spender: "bob.near",
    });
    expect(allowance).toBe(0);
  });
});
});

