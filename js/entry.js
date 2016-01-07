import React from 'react';
import ReactDOM from 'react-dom';
import csp from 'js-csp';

import Hello from './components/hello.js';
import Counter from './models/counter.js';

var channel = csp.chan();
var entry = document.getElementById('entry');

var update = (model, action) => {
  switch (action.actionType) {
    case 'increment':
      model.value += 1;
      return model;
  }
}

var renderLoop = (channel, counter) => {
  ReactDOM.render(
    <Hello channel={channel} counter={counter}/>,
    entry
  );

  csp.go(function*() {
    while (true) {
      var action = yield csp.take(channel);
      counter = update(counter, action);
      ReactDOM.render(
        <Hello channel={channel} counter={counter}/>,
        entry
      );
    }
  });
}

renderLoop(channel, Counter);
