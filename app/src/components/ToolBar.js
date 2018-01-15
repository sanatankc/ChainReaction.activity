import React, { Component } from 'react'
import styled from 'styled-components'

const PlayButton = styled.button`
  background: url('icons/plus.svg')
`
const MinusButton = styled.button`
  background: url('icons/minus.svg')
`

class Toolbar extends Component {
  render() {
    return (
      <div id="main-toolbar" className="react-toolbar toolbar">
        <button className="toolbutton" id="activity-button" title="Chain Reaction"></button>
        <button className="toolbutton pull-right" id="stop-button" title="Stop"></button>
        <PlayButton className="toolbutton" title="Plus" onClick={this.props.onIncrement}></PlayButton>
        <MinusButton className="toolbutton" title="Minus" onClick={this.props.onDecrement}></MinusButton>
      </div>
    )
  }
}

export default Toolbar
