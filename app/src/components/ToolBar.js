import React, { Component } from 'react'
import styled from 'styled-components'

const HelpButton = styled.button.attrs({className: 'toolbutton'})`
  background: url('icons/help.svg')
`

class Toolbar extends Component {
  render() {
    return (
      <div id="main-toolbar" className="react-toolbar toolbar">
        <button className="toolbutton" id="activity-button" title="Chain Reaction"></button>
        <button className="toolbutton pull-right" id="stop-button" title="Stop"></button>
        <HelpButton id='help-button' title='help' onClick={() => {
          console.log('hello')
          this.props.onHelpClick()
        }}/>
      </div>
    )
  }
}

export default Toolbar
