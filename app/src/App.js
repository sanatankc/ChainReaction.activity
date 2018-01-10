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
      <Container onClick={() => {
        const cellElem = document.querySelector('#game-board').children[0].children[0]
        cellElem.children[0].classList.add('move-top')
        // console.log(document.querySelector('.cell').classList.add('move-top'))
      }}>
        <Board id='game-board' />
      </Container>
    )
  }
}

export default App