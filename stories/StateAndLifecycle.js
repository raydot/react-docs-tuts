// This example ticking clock uses ReactDOM.render() to change the rendered output:

function tick() {
  const element = (
    <div>
      <h1>Hi there!</h1>
      <h2>It is now {new Date().toLocaleTimeString()}.</h2>
    </div>
  )
  ReactDOM.render(
    element,
    document.getElementById('root')
  )
}

setInterval(tick, 1000)

// Let's make this a `Clock` component that is truly reusable and encapsulated.  Starting with the looks:


// Component
function Clock(props) {
  return(
    <div>
      <h1>Hola!</h1>
      <h2>It is {props.date.toLocaleTimeString()}.</h2>
    </div>
  )
}

// Implementation
function tick() {
  ReactDOM.render(
    <Clock date={new Date()} />,
    document.getElementById('root')
  )
}

setInterval(tick, 1000)

// Shouldn't the implementation be attached to the Component?
ReactDOM.render(
  <Clock />,
  document.getElementById('root')
)

// That won't happen with our present design!

// # Converting a Function to a Class

/* 
   In Five easy steps:

  1. Create an ES6 class with the same name that extends React.Component
  2. Add a single empty method to it called `render` that returns the presentation of your Component.
  3. Move the body of the function into the `render()` method
  4. Replace `props` with `this.props` in the `render()` body.
  5. Delete the remaining empty function declaration.
*/

class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Guten Tag!</h1>
        <h2>It is now {this.props.date.toLocaleTimeString()}.</h2>
      </div>
    )
  }    
}

// `Clock` is now defined as a class rather than a function.

/*
  The `render` method will be called each time an update happens, but as long as we render
  `<Clock />` into the same DOM node, only a single instance of the `Clock` class will be used.
  This lets us use additional features such as local state and lifecycle methods.
*/  

// # Adding Local State to a Class -- In three easy steps:

//  1. Replace this.props.date with this.state.date in the render() method

class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Guten Tag!</h1>
        <h2>It is now {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    )
  }    
}

// 2.   Add a `class constructor` that assigns the initial `this.state`.  Note how we pass `props`
//      to the base conductor.  Class components should always call the base constructor with `props`.

class Clock extends React.Component {
  super(props)
  constructor(props) { 
    this.state = { date: new Date() }
  }

  render() {
    return (
      <div>
        <h1>Ti Kannis!</h1>
        <h2>It is now {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    )
  }    
}

// 3.  Remove the `date` prop from the `<Clock />` element:

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
)

// # Adding Lifecycle Methods to a Class

/*
  In applications with many components,  it's very important to free up resources taken
  by the components when they are destroyed.  We want to set up a timer whenever the `Clock`
  is rendered to the DOM for the first time (Mounting).

  We also want to clear the timer whenever the DOM produced by the `Clock` is removed (Unmounting)

  These methods are called "lifecycle methods."
*/

class Clock extends React.Component {
  constructor(props) {
    super(props)
    this.state = { date: new Date() }
  }

  componentDidMount() {
    // Runs after the component output has been rendered to the DOM. 
    // Good place to set up a timer:
    this.timerID = setInterval (
      () => this.tick(), // Note where we save the timerID and tick().  Good place to store stuff that
      1000 // doesn't participate in the data flow
    )
  }

  componentWillUnmount() {
    // Tear down the timer
    clearInterval(this.timerID)
  }

  tick() {
    this.setState ({ // schedules a UI update, calls the render() method again, updates.
      date: new Date()
    })
  }

  render() {
    return (
      <div>
        <h1>Konichiwa!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    )
  }
} // class

// Then of course:
ReactDOM.render(
  <Clock />,
  document.getElementById('root')
)

// # Three things you need to know about Using State Correctly

//  1.  The only place where you can assign this.state is the constructor.  Do Not Modify State Directly:

// Wrong
this.state.comment = 'Hello'

// Right -- use setState()
this.setState({comment: 'Hello'})

//  2.  State Updates may be Asynchronous  

/*
  React may batch multiple setState() calls into a single update for performance.  Because this.props and this.state may be updated asychronously, you should not rely on their values for calculating he next state.
*/

// Wrong: This may fail to update (also, there you go modifying state directly!)
this.setState({
  counter: this.state.counter + this.props.increment
})

// To fix: pass a function to setState() instead of an object.  The function receives the 
// previous state as the first afrument, and the props at the time the update is applied as the
// second:

// Correct:  i. e. Use an arrow function!
this.setState(state, props) => ({
  counter: state.counter + props.increment
})

// Also correct: use a regular function!
this.setState(function(state, props) {
  return {
    counter: state.counter + props.increment
  }
})

// 3. State Updates are Merged

/*
  When you call setState() React merges the object you provide into the current state.
*/


// State with several independent variables:
constructor(props) {
  super(props)
  this.state = {
    posts: [],
    comments: []
  }
}

// Update then independently with separate setState() calls:
componentDidMount() {
  fetchPosts().then(response => {
    this.setState({
      posts: response.posts
    })
  })

  fetchComments().then(response => {
    this.setState({
      comments: response.comments
    })
  })
}

/* 
  The merging is shallow so this.setState({ comments }) leaves `this.state.posts` intact
  but completely replaces this.state.comments.
*/

// # The Data Flows Down

/*
  Neither parent nor child components can know if a certain component is stateful or stateless, and they shouldn't care whether it is defined as a function or a class.

  This is why state is often called "local" or "encapsulated."  It is not accessible to any component other than the one that owns and sets it.

  A component may choose to pass its state down as props to its child components:
*/

<h2> It is { this.state.date.toLocaleTimeString()}.</h2>

// This also works for user-defined components:

<FormattedDate date = {this.state.date} />

/*
  The `FormattedDate` component would receive the `date` in its props and wouldn't know whether it came from the Clock's stage, the Clock's props, or was typed into an input field.
*/

function FormattedDate(props) {
  return <h2>It is { props.date.toLocaleTimeString()}.</h2>
}

/*
    This is commonly called a "top-down" or "unidirectional" data flow.  (All top-down state flows are unidirectional, but not all unidirectional data flows are top down.) Any state is always owned by some specific component, and any data or UI derived from that state can only affect components "below" them in the tree.

    If you imagine a component tree as a waterfall of props, each component's state is like an additional water source that joins it at an arbitrary point but also flows down.

    To show that all components are tryly isolated, we can create an `App` component that renders three `<Clock>`s.
*/

function App() {
  return (
    <div>
      <Clock />
      <Clock />
      <Clock />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
// REACT SHALLOW MERGING