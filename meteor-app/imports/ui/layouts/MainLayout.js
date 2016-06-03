import React from 'react';
import { render } from 'react-dom';

export default MainLayout = (props) => {
  return (
    <div>
      {props.children}
    </div>
  )
};