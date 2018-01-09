import React, { Component } from 'react'
import styled from 'styled-components'
import Cell from './Cell'
import gameState from './gameState'

const GameContainer = styled.div`
  background: ${props => props.themeColor + '6b'};
  box-shadow: rgba(0, 0, 0, 0.2) 5px 5px 25px 0px;
`
const Row = styled.div`
  display: flex;
  margin-bottom: ${props => props.isLast ? '0px': '2px'};
`

class Board extends Component {
  constructor(props) {
    super(props)
    this.theme = ['#DD1155', '#00CC99']
    this.state = {
      gameState: [],
      turn: 0,
    }
  }

  componentDidMount() {
    this.setState({ gameState })
  }

  drawCells() {

  }

  onCellClick(indexRow, index) {
    const cellValue = this.state.gameState[indexRow][index].value
    // console.log(cellValue)
    const stateCopy = [...this.state.gameState]
    console.log(stateCopy[indexRow][index].reserved !== null)

    if (stateCopy[indexRow][index].reserved !== null && stateCopy[indexRow][index].reserved !== this.state.turn) return
    // console.log(Object.assign({} ,stateCopy))
    console.log(stateCopy[indexRow][index])
    if (cellValue !== 3) {
      stateCopy[indexRow][index].value = cellValue + 1
      stateCopy[indexRow][index].reserved = this.state.turn
    }

    console.log(stateCopy)
    this.setState(prevState => ({
      gameState: stateCopy,
      turn: (prevState.turn === 0) ? 1 : 0,
    }), () => {
      // console.log(this.state)
    })
  }

  generateBoard() {
    return this.state.gameState.map((row, indexRow) => (
      <Row isLast={indexRow === 8} key={indexRow}>
        {row.map((state, index) =>
          <Cell
            isLast={index === 5}
            value={this.state.gameState[indexRow][index].value}
            key={index}
            themeColor={this.theme[this.state.gameState[indexRow][index].reserved]}
            onCellClick={() => {
              this.onCellClick(indexRow, index)
            }}
           />
      )}
      </Row>
    ))
  }

  render() {
    return (
        <GameContainer themeColor={this.theme[this.state.turn]}>
          {this.generateBoard()}
        </GameContainer>
    )
  }

}

export default Board
