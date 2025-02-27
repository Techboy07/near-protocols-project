// Find all our documentation at https://docs.near.org
import { NearBindgen, near, call, view, NearPromise } from 'near-sdk-js';
import { AccountId } from 'near-sdk-js';

@NearBindgen({})
class HelloNear {

  static schema = {
    greeting: 'string'   
  };
  greeting: string = 'Hello';

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

}