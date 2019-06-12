import React from 'react';
import withRouter from 'react-router-dom/withRouter';

const userArea = ({location}) => (
    <>
     {location.pathname === '/' ? 'Logged out' : 'Logged In'}   
    </>
);

export default withRouter(userArea);