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

// The simplest way to define a component is to write a JavaScript function

function Welcome(props) {
  return <h1>Hello, {props.name}</h1>
}

/*
  This function accepts a single prop and returns a react element.  
  This component is called a "function component."
*/

/*
  The ES6 way is explained at the top of this script
*/

// RENDERING A COMPONENT

// So far we have only encountered React elements that represent DOM tags:

const element = <div />

// But they can of course also represent user-defined components:

const element = <Welcome name="Boo Boo" />

/*
  When react sees an element representing a user-defined component, it passes JSX
  attributes to this component as a single object called "props."  For instance:
*/

function Welcome(props) {
  return <h1>Hello, {props.name}</h1>
}

const element = <Welcome name="Yogi" />
ReactDOM.render(
  element,
  document.getElementById('root')
)

// ALWAYS START COMPONENT NAMES WITH A CAPITAL LETTER!


// # Composing components:

/*  Components can refer to other components in their output.  This lets us use
    the same component abstraction for any level of detail.  A button, a form, a dialog,
    a screen: in React apps, all those are commonly expressed as components.
*/

function Welcome(props){
  return <h1>Hi there, {props.name}</h1>
}

function App() {
  return (
    <div>
      <Welcome name="Bugs" />
      <Welcome name="Elmer" />
      <Welcome name="Wile" />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)

/*
  Typically, new React apps have a single APP component at the very top.  However, if you 
  integrate React into an existing app, you might start bottom-up with a small component
  like `Button` and gradually work your way to the top of the view hierarchy.
*/

// # Extracting Components

/*  
  Don't be afraid to split components into smaller compoents.  Consider this `Comment` component,
  which accepts `author` (object), `text` (string), and `date` (fig) as props, and describes
  a comment on a social media website.
*/

function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <img className="Avatar"
          src={ props.author.avatarUrl }
          alt={ props.author.name }
        />
        <div className="UserInfo-name">
        { props.author.name }
        </div>
      </div> {/*User Info*/}
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        { formatDate(props.date) }
      </div>
    </div>
  )
}

// Helper functions:
function formatDate(date) {
  return date.toLocaleDateString()
}

// Data
const comment = {
  date: new Date(),
  text: 'Able was I ere I saw Elba',
  author: {
    name: 'Tweety Bird',
    avatarUrl: 'https://www.avatarist.com/avatars/Cartoons/Looney-Tunes/Tweety-2.jpg'
  }
}

// Usage:
ReactDOM.render(
  <Comment
    date={comment.date}
    text={comment.text}
    author={comment.author}
  />,
  document.getElementById('root')
)

/*
  Not the best component: too much nesting and hard to reuse individual parts.  Let's extract
  a few components from it.
*/

/* 
  First, extract Avatar.  Avatar doesn't neet to know that it is being rendered inside a `Comment`,
  so we can generalize the props names to be more generic.
*/

/* In general, props should be named from the component's own point of view. */

function Avatar(props) {
  return(
     <img className="Avatar"
      alt: { props.user.name } 
      src: { props.user.avatarUrl }
     />
  )
}

// Comment is already simpler!
function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <Avatar user={props.author} />
        <div className="UserInfo-name">
        { props.author.name }
        </div>
      </div> {/*User Info*/}
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        { formatDate(props.date) }
      </div>
    </div>
  )
}

// Now let's extract UserInfo:
function UserInfo(props) {
  return(
    <div className="UserInfo">
      <Avatar user={ props.user } />
      <div className="UserInfo-name">
        { props.user.name }
      </div>
    </div>
  )
}

// Making Comment even simpler still!
function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <UserInfo user={props.author} />
        <div className="Comment-text">
          {props.text}
        </div>
        <div className="Comment-date">
          { formatDate(props.date) }
        </div>
      </div>
    </div>
  )
}

/* 
  A good rule of thumb os that if a part of your UI is used several times (`Button`, `Panel`, `Avatar`) or is complex enough on its own (`App`, `FeedStory`, `Comment`) then it is a good candidate to be reusable.
*/

/*
  Last of all: props are read-only.  All react components must act like pure functions
  with respect to their props.
*/