// import anyTest from 'ava';
// import { Worker } from 'near-workspaces';
// // import { HelloNear } from "../src/contract.ts"
// // import { VMContext } from "near-sdk-js/lib"
// import { setDefaultResultOrder } from 'dns'; setDefaultResultOrder('ipv4first'); // temp fix for node >v17

// /**
//  *  @typedef {import('near-workspaces').NearAccount} NearAccount
//  *  @type {import('ava').TestFn<{worker: Worker, accounts: Record<string, NearAccount>}>}
//  */
// const test = anyTest;

// test.beforeEach(async t => {
//   // Create sandbox
//   const worker = t.context.worker = await Worker.init();

//   // Deploy contract
//   const root = worker.rootAccount;
//   const contract = await root.createSubAccount('test-account');

//   // Get wasm file path from package.json test script in folder above
//   await contract.deploy(
//     process.argv[2],
//   );

//   // Save state for test runs, it is unique for each test
//   t.context.accounts = { root, contract };
// });

// test.afterEach.always(async (t) => {
//   await t.context.worker.tearDown().catch((error) => {
//     console.log('Failed to stop the Sandbox:', error);
//   });
// });

// test('returns the default greeting', async (t) => {
//   const { contract } = t.context.accounts;
//   const greeting = await contract.view('get_greeting', {});
//   t.is(greeting, 'Hello');
// });

// test('changes the greeting', async (t) => {
//   const { root, contract } = t.context.accounts;
//   await root.call(contract, 'set_greeting', { greeting: 'Howdy' });
//   const greeting = await contract.view('get_greeting', {});
//   t.is(greeting, 'Howdy');
// });


// // the test code for the approval and transfer funds
// function setupEnvironment({ predecessor, signer, balance }) {
//   VMContext.setPredecessor_account_id(predecessor);
//   VMContext.setSigner_account_id(signer);
//   VMContext.setAccount_balance(balance);
// }

// // test.beforeEach((t) => {
// //   t.context.contract = new HelloNear(); // Initialize a new instance of the contract
// // });

// test("should approve a spender to deduct tokens", (t) => {
//   const { contract } = t.context;

//   // Set up the environment with Alice as the predecessor
//   setupEnvironment({
//     predecessor: "alice.near",
//     signer: "alice.near",
//     balance: "1000",
//   });

//   // Alice approves Bob to spend 100 tokens
//   contract.approve({ spender: "bob.near", amount: 100 });

//   // Check the allowance
//   const allowance = contract.get_allowance({
//     owner: "alice.near",
//     spender: "bob.near",
//   });
//   t.is(allowance, 100); // Expect Bob to have an allowance of 100 tokens
// });

// test("should log a transfer on behalf of the owner", (t) => {
//   const { contract } = t.context;

//   // Set up the environment with Alice as the predecessor
//   setupEnvironment({
//     predecessor: "alice.near",
//     signer: "alice.near",
//     balance: "1000",
//   });

//   // Alice approves Bob to spend 100 tokens
//   contract.approve({ spender: "bob.near", amount: 100 });

//   // Set up the environment with Bob as the predecessor
//   setupEnvironment({
//     predecessor: "bob.near",
//     signer: "bob.near",
//     balance: "1000",
//   });

//   // Bob transfers 50 tokens from Alice to Charlie
//   contract.transfer_from({
//     owner: "alice.near",
//     recipient: "charlie.near",
//     amount: 50,
//   });

//   // Check the remaining allowance
//   const allowance = contract.get_allowance({
//     owner: "alice.near",
//     spender: "bob.near",
//   });
//   t.is(allowance, 50); // Expect Bob to have 50 tokens remaining in allowance
// });

// test("should fail if the spender does not have enough allowance", (t) => {
//   const { contract } = t.context;

//   // Set up the environment with Alice as the predecessor
//   setupEnvironment({
//     predecessor: "alice.near",
//     signer: "alice.near",
//     balance: "1000",
//   });

//   // Alice approves Bob to spend 100 tokens
//   contract.approve({ spender: "bob.near", amount: 100 });

//   // Set up the environment with Bob as the predecessor
//   setupEnvironment({
//     predecessor: "bob.near",
//     signer: "bob.near",
//     balance: "1000",
//   });

//   // Attempt to transfer more than the allowance
//   const error = t.throws(() => {
//     contract.transfer_from({
//       owner: "alice.near",
//       recipient: "charlie.near",
//       amount: 150, // Attempt to transfer 150 tokens (more than the allowance)
//     });
//   });
//   t.is(error.message, "Not enough allowance"); // Expect the transaction to fail
// });

// test("should return 0 allowance if no approval exists", (t) => {
//   const { contract } = t.context;

//   // Set up the environment with Alice as the predecessor
//   setupEnvironment({
//     predecessor: "alice.near",
//     signer: "alice.near",
//     balance: "1000",
//   });

//   // Check the allowance for a non-existent approval
//   const allowance = contract.get_allowance({
//     owner: "alice.near",
//     spender: "bob.near",
//   });
//   t.is(allowance, 0); // Expect the allowance to be 0
// });


import test from 'ava';
import { Worker } from 'near-workspaces';
// import { strict as assert } from 'assert';

let worker, root, contract;

test.before(async () => {
  worker = await Worker.init();
  root = worker.rootAccount;
  contract = contract = await root.devDeploy('./build/social-near.wasm');
});

test.after.always(async () => {
  await worker.tearDown();
});

test('get_greeting returns default greeting', async (t) => {
  const greeting = await contract.view('get_greeting');
  t.is(greeting, 'Hello');
});

test('set_greeting updates the greeting', async (t) => {
  await contract.call('set_greeting', { greeting: 'Hi NEAR' });
  const greeting = await contract.view('get_greeting');
  t.is(greeting, 'Hi NEAR');
});

test('approve and get_allowance', async (t) => {
  const spender = await root.createSubAccount('spender');
  await contract.call('approve', { spender: spender.accountId, amount: 100 });

  const allowance = await contract.view('get_allowance', {
    owner: root.accountId,
    spender: spender.accountId
  });
  t.is(allowance, 100);
});

test('transfer_from fails without enough allowance', async (t) => {
  const recipient = await root.createSubAccount('recipient');
  const spender = await root.createSubAccount('spender');

  await contract.call('approve', { spender: spender.accountId, amount: 50 });

  const error = await t.throwsAsync(
    contract.call('transfer_from', {
      owner: root.accountId,
      recipient: recipient.accountId,
      amount: 100
    }, { account: spender })
  );

  t.regex(error.message, /Not enough allowance/);
});

test('transfer_from succeeds with enough allowance', async (t) => {
  const recipient = await root.createSubAccount('recipient');
  const spender = await root.createSubAccount('spender');

  await contract.call('approve', { spender: spender.accountId, amount: 200 });
  await contract.call('transfer_from', {
    owner: root.accountId,
    recipient: recipient.accountId,
    amount: 150
  }, { account: spender });

  const remainingAllowance = await contract.view('get_allowance', {
    owner: root.accountId,
    spender: spender.accountId
  });

  t.is(remainingAllowance, 50);
});










