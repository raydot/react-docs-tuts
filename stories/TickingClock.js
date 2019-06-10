import React, { Component } from 'react'
import ReactDOM from 'react-dom'


class TickingClock (extends Component {
  render() {
    return (
      <div>
        <h1>DAVE RULES, and...</h1>
        <h2>Is is now: { new Date().toLocaleTimeString() }</h2>
      </div>
    )
  }
}

// Note the syntax.  This should probably be a storybook entry of its own!
ReactDOM.render() {
  return <TickingClock />,
)

setInterval(tick, 1000)

export default TickingClock


