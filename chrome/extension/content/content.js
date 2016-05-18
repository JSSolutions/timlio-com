import React from 'react';
import { render } from 'react-dom';
import $ from 'jquery';

import Time from '../../app/components/Time';

const renderTimer = () => {
  const $anchor = $('<div id="header-timlio"></div>');

  const $headerUser = $('.header-user');

  $anchor.insertBefore($headerUser);
  render(<Time/>, $('#header-timlio')[0]);
};

window.addEventListener('load', () => {
  renderTimer();
  
  const target = document.querySelector('#header');
  const config = { attributes: true, childList: true, subtree: true, characterData: true };
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.addedNodes.length) {
        const node = mutation.addedNodes[0];
        if ($(node).hasClass('header-user')) {
          renderTimer();
        }
      }
    });
  });
  
  observer.observe(target, config);
}, false);

