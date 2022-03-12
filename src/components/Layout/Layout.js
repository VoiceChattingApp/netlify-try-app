import { Fragment } from 'react';

import MainNavigation from './MainNavigation';

const Layout = (props) => {
  return (
    <Fragment>
      {props.children}
    </Fragment>
  );
};

export default Layout;