/**
 *
 * Button.js
 *
 * A common button, if you pass it a prop "route" it'll render a link to a react-router route
 * otherwise it'll render a link with an onclick
 */

import React, { Children } from 'react';
import PropTypes from 'prop-types';

const Button = (props) => {
  // Render an anchor tag
  let button = (
    <a href={props.href} onClick={props.onClick}>
      {Children.toArray(props.children)}
    </a>
  );

  // If the Button has a handleRoute prop, we want to render a button
  if (props.handleRoute) {
    button = (
      <button onClick={props.handleRoute}>
        {Children.toArray(props.children)}
      </button>
    );
  }

  // If the Button has a fa prop, we want to render an icon button
  if (props.fa) {
    return (
      <button className={props.class} onClick={props.handleRoute}>
        <i className={props.fa} />
      </button>
    );
  }

  return (
    <div className="button-wrapper">
      {button}
    </div>
  );
};

Button.propTypes = {
  handleRoute: PropTypes.func,
  fa: PropTypes.string,
  class: PropTypes.string,
  href: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node,
};

export default Button;
