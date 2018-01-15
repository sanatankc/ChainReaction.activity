import React, { Component } from 'react'

class Toolbar extends Component {
  render() {
    return (
      <div id="main-toolbar" className="react-toolbar toolbar">
        <button className="toolbutton" id="activity-button" title="Chain Reaction"></button>
        <button className="toolbutton pull-right" id="stop-button" title="Stop"></button>
      </div>
    )
  }
}

export default Toolbar
