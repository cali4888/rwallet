/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 */

import React from 'react';

import './style.scss';

export default function NotFound() {
  return (
    <article>
      <h1>Whoops. This page does not exist. Try to check out FAQ.</h1>
    </article>
  );
}
