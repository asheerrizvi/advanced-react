// At it's simplest access control is a yes or a no value
// depending on the user's session.

import { ListAccessArgs } from './types';

export function isSignedIn({ session }): ListAccessArgs {
  return !!session;
}
