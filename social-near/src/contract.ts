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
    this.allowances = new Map();
  }

  
  @call({})
  approve({ spender, amount } : { spender: AccountId, amount: bigint }) {
    const owner = near.predecessorAccountId(); 
    const key = `${owner}:${spender}`;

    
    near.storageWrite(key, amount.toString()); // Store as string
    near.log(`Approved ${spender} to spend ${amount} tokens on behalf of ${owner}`);
  }

  
  @call({})
  transfer_from({ owner, recipient, amount }) {
    const spender = near.predecessorAccountId(); 
    const key = `${owner}:${spender}`;

   
    const allowance = this.allowances.get(key) || 0;
    if (allowance < amount) {
      throw new Error("Not enough allowance");
    }

   
    this.allowances.set(key, allowance - amount);

   
    near.log(`Transferred ${amount} tokens from ${owner} to ${recipient}`);
  }

  
  @view({})
  get_allowance({ owner, spender }) {
    const key = `${owner}:${spender}`;
    return this.allowances.get(key) || 0; 
  }
}

