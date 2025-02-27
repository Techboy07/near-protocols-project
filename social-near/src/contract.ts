// Find all our documentation at https://docs.near.org
import { NearBindgen, near, call, view, NearPromise, PromiseAction } from 'near-sdk-js';
import { AccountId } from 'near-sdk-js';

@NearBindgen({})
class HelloNear {

  static schema = {
    greeting: 'string'   
  };
  greeting: string = 'Hello';
  allowances: any;

  @view({})
  get_greeting(): string {
    return this.greeting;
  }

  @call({}) 
  set_greeting({ greeting }: { greeting: string }): void {
    near.log(`Saving greeting ${greeting}`);
    this.greeting = greeting;
  }

  @call({})
  transfer({ to, amount }: { to: AccountId, amount: bigint }) {
    return NearPromise.new(to).transfer(amount);
  }

  
  constructor() {
    this.allowances = new Map(); // Stores allowances: (owner, spender) -> amount
  }

  // Approve a spender to deduct tokens from the owner's account
  @call({})
  approve({ spender, amount }) {
    const owner = near.predecessorAccountId(); // Get the account ID of the caller
    const key = `${owner}:${spender}`; // Create a unique key for the owner-spender pair

    // Store the allowance amount
    this.allowances.set(key, amount);

    // Log the approval event
    near.log(`Approved ${spender} to spend ${amount} tokens on behalf of ${owner}`);
  }

  // Transfer tokens from the owner to the recipient on behalf of the owner
  @call({})
  transfer_from({ owner, recipient, amount }) {
    const spender = near.predecessorAccountId(); // Get the account ID of the caller (spender)
    const key = `${owner}:${spender}`; // Create a unique key for the owner-spender pair

    // Check if the spender has enough allowance
    const allowance = this.allowances.get(key) || 0;
    if (allowance < amount) {
      throw new Error("Not enough allowance");
    }

    // Deduct the allowance
    this.allowances.set(key, allowance - amount);

    // Log the transfer event (instead of actually transferring tokens)
    near.log(`Transferred ${amount} tokens from ${owner} to ${recipient}`);
  }

  // View the remaining allowance for a spender
  @view({})
  get_allowance({ owner, spender }) {
    const key = `${owner}:${spender}`; // Create a unique key for the owner-spender pair
    return this.allowances.get(key) || 0; // Return the allowance amount (default to 0 if not found)
  }
}

