import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Store } from 'react-chrome-redux';
import Timer from '../../app/containers/Timer';
import TimerButton from '../../app/containers/TimerButton';
import './content.css';
import { trelloAuth } from '../../app/util/trello';

trelloAuth();

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

function headerUserReady() {
  return new Promise((resolve, reject) => {
    const inc = 40;
    let interval = 0;
    const headerUserListener = ()  => {
      const $headerUser = $('.header-user');
      if ($headerUser.length != 0) {
        resolve('true');
      }
      else {
        if (++interval < inc) {
          setTimeout(() => headerUserListener(), 100);
        } else {
          reject('Timeout');
        }
      }
    };

    headerUserListener();
  });
}

const unsubscribe = store.subscribe(() => {
  unsubscribe();
  headerUserReady()
    .then(() => renderTimer());
  renderTimerButton();
});

window.addEventListener('load', () => {
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

