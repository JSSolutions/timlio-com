import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Store } from 'react-chrome-redux';
import $ from 'jquery';
import Timer from '../../app/containers/Timer';
import TimerButton from '../../app/containers/TimerButton';

const store = new Store({
  portName: 'timlio'
});

const renderTimer = () => {
  const $anchor = $('<div id="header-timlio"></div>');
  const $headerUser = $('.header-user');

  $anchor.insertBefore($headerUser);
  render(
    <Provider store={store}>
      <Timer/>
    </Provider>
    , $anchor[0]);
};

const renderTimerButton = () => {
  const $anchor = $('<span class="anchor-btn"></span>');
  const $iconEdit = $('.icon-edit');

  $anchor.insertBefore($iconEdit);
  
  const $anchors = $('.anchor-btn');
  $.each($anchors, (i, el) => {
    render(
      <Provider store={store}>
        <TimerButton/>
      </Provider>
      , el);
  });
};

window.addEventListener('load', () => {
  renderTimer();
  renderTimerButton();
  
  const target = document.querySelector('body');
  const config = { attributes: true, childList: true, subtree: true, characterData: true };
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.addedNodes.length) {
        const $anchors = $('.anchor-btn');
        if (!$anchors.length) {
          renderTimerButton();
        }
        
        const $timer = $('#header-timlio');
        if (!$timer.length) {
          renderTimer();
        }
      }
    });
  });
  
  observer.observe(target, config);
}, false);

