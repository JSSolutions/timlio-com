import React, { Component } from 'react';
import { render } from 'react-dom';
import { Meteor } from 'meteor/meteor';

export default class MainLayout extends Component {
  loginOnClick() {
    Meteor.loginWithTrello({}, (err) => { 
      if (!err)
        console.log('Success') 
    });
  }
  render() {
    return (
      <div>
        <nav className="navbar navbar-default navbar-static-top">
          <div className="container">
            <div className="navbar-header">
              <div className="navbar-brand">Timlio</div>
            </div>
            <div className="collapse navbar-collapse">
              {() => {
                if (Meteor.userId()) {
                  return (
                    <ul className="nav navbar-nav navbar-right">
                      <li><a onClick={this.loginOnClick} href="#">Login</a></li>
                    </ul>
                  )}
              }}
            </div>
          </div>
        </nav>
        <div className="container">
          {this.props.children}
        </div>
      </div>
    )
  }
}