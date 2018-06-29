import React from 'react';
import { Route, Redirect} from 'react-router-dom';

const PrivateRouts = ({
  user,
  component: Comp,
  ...rest
}) => (
  <Route {...rest} component={(props) => (
      user ?
        <Comp {...props} user={user} />
        :
        <Redirect to='/sign-in' />
    )}
  />
)

export default PrivateRouts;