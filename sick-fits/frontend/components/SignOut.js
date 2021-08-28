import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { CURRENT_USER_QUERY } from './User';

const SIGNOUT_MUTATION = gql`
  mutation SIGNOUT_MUTATION {
    endSession
  }
`;

export default function SignOut() {
  const [signout] = useMutation(SIGNOUT_MUTATION, {
    // refetch the currently logged in user
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  async function handleSignOutClick() {
    await signout();
  }

  return (
    <button type="button" onClick={handleSignOutClick}>
      Sign Out
    </button>
  );
}
