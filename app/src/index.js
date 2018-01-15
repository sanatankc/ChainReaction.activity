import React from 'react'
import { render } from 'react-dom'
import App from './App'
import ToolBar from './components/ToolBar'

class Main extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      help: false
    }
  }
  onHelpClick() {
    this.setState(prev => ({help: !prev.help}))
  }
  render () {
    return (
      <div>
        <ToolBar
          onHelpClick={this.onHelpClick.bind(this)}
        />
        <div id='canvas'>
          <App counter={this.state.counter} help={this.state.help} />
        </div>
      </div>
    )
  }
}

render(<Main/>, document.getElementById('app'))
