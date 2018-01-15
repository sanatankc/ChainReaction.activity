import React, { Component } from 'react'
import Board from './components/Board'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 55px);
`

class App extends Component {
  render() {
    return (
      <Container >
        <Board id='game-board' help={this.props.help} />
      </Container>
    )
  }
}

export default App