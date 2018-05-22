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
  const disabled = props.disabled == null ? false : props.disabled;

  let button = (
    <button onClick={props.onClick} disabled={disabled} className={props.class}>
      {Children.toArray(props.children)}
    </button>
  );

  if (props.withWrapper) {
    button = (
      <div className="button-wrapper">
        {button}
      </div>
    );
  }

  return button;
};

Button.propTypes = {
  handleRoute: PropTypes.func,
  fa: PropTypes.string,
  class: PropTypes.string,
  disabled: PropTypes.bool,
  href: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node,
};

export default Button;
