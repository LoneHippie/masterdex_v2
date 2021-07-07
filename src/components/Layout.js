import React from 'react';

import classes from './Layout.module.scss';

const Layout = (props) => {

    return (
        <main className={classes.container}>
            {props.children}
        </main>
    )
};

export default Layout;