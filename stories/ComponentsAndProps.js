// function Welcome(props) {
//   return <h1>Hello, {props.name}</h1>
// }

// THATS THE SIMPLEST COMPONENT, BUT LET'S ADD A CLASS TO GET IT WORKING IN STORYBOOK

import React, { Component } from 'react'

class ComponentsAndProps extends Component {
  render() {
    return <h1>Hello, { this.props.name }</h1>
  }
}

export default ComponentsAndProps