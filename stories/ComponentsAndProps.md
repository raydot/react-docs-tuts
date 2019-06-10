# Components

This is the simplest component that can be made in React.  It can be made as a class or a function.

    import React, { Component } from 'react'
    
    class ComponentsAndProps extends Component {
      render() {
        return <h1>Hello, { this.props.name }</h1>
      }
    }
    
    export default ComponentsAndProps
The class is then rendered as a Component either alone, or with a `prop` passed to it:

    <ComponentsAndProps name="Lulu" />

Will return:

    Hello, Lulu