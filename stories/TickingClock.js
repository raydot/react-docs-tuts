import React, { Component } from 'react'
import ReactDOM from 'react-dom'

/// AAAGH!  Too tricky to keep working.

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
ReactDOM.render(
  <TickingClock />,
  document.getElementById('root')
)

setInterval(tick, 1000)

export default TickingClock


