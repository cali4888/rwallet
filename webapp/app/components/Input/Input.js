/**
 *
 * Button.js
 *
 * A common button, if you pass it a prop "route" it'll render a link to a react-router route
 * otherwise it'll render a link with an onclick
 */

import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

const Input = (props) => (
  <input
    className={`inputComponent ${props.class == null ? '' : props.class}`}
    type={props.type}
    value={props.value}
    name={props.name}
    onChange={props.onChange}
    disabled={props.disabled == null ? false : props.disabled}
  />
);


Input.propTypes = {
  class: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.any,
  name: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
};

export default Input;
