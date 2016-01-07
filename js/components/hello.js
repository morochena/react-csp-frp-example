import React from 'react';
import csp from 'js-csp';

class Hello extends React.Component {
  constructor(props) {
    super(props);

    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler() {
    let channel = this.props.channel;
    csp.go(function*() {
      yield csp.put(channel, {actionType: 'increment'})
    });
  }

  render() {
    return(
      <div>
        <button onClick={this.clickHandler}>increment</button>
        <div> clicked {this.props.counter.value} times </div>
      </div>
    );
  }
}

module.exports = Hello;
