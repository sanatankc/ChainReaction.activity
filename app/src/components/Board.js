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
const isOnEdge = (x,y) =>
      (x === 0 && y === 0) || (x === 5 && y === 0) || (x === 0 && y == 8) || (x === 5 && y === 8)
const isOnSide = (x, y) =>
  (!isOnEdge(x, y) && (x === 0 || x === 5 || y === 0 || y === 8))

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

    if (stateCopy[indexRow][index].reserved !== null && stateCopy[indexRow][index].reserved !== this.state.turn) return
    // console.log(Object.assign({} ,stateCopy))
    if (cellValue < 4) {
      stateCopy[indexRow][index].value = cellValue + 1
      stateCopy[indexRow][index].reserved = this.state.turn
    }

    this.setState(prevState => ({
      gameState: stateCopy,
    }), () => {
      this.processBoard()
    })
  }

  burstCells() {
    const shouldBurst = (x, y, value) =>
      (isOnEdge(x,y) && value > 1) ||
      (isOnSide(x,y) && value > 2) ||
      (!isOnEdge(x,y) && !isOnSide(x, y)&& value > 3)

    const burstList = []
    this.state.gameState
      .map((row, y) => {
        row.map((cell, x) => {
          if (cell.value !== 0) {
            if (shouldBurst(x, y, cell.value)) {
              burstList.push({ x, y })
              console.log('Burst: ', x, y)
            }
          }
        })
      })
    return burstList
  }

  changeTurns() {
    this.setState(prevState => ({turn: (prevState.turn === 0) ? 1 : 0}))
  }

  processBoard(burstList) {
    if (!burstList) {
      burstList = this.burstCells()
    }

    burstList.forEach((cell) => {
      this.burstCell(cell)
    })
    if (burstList.length === 0) {
      this.changeTurns()
    }
  }


  burstCell(cell) {
    const {gameState} = this.state
    const gameStateCopy = gameState.concat()
    const {x, y} = cell
    const isLeft = x - 1 >= 0
    const isRight = x + 1 <= 5
    const isTop = y - 1 >= 0
    const isBottom = y + 1 <= 8
    gameStateCopy[y][x].value = 0
    gameStateCopy[y][x].reserved = null
    if (isLeft) {
      gameStateCopy[y][x - 1].value++
      gameStateCopy[y][x - 1].reserved = this.state.turn
    }
    if (isRight) {
      gameStateCopy[y][x + 1].value++
      gameStateCopy[y][x + 1].reserved = this.state.turn
    }
    if (isTop) {
      gameStateCopy[y-1][x].value++
      gameStateCopy[y-1][x].reserved = this.state.turn
    }
    if (isBottom) {
      gameStateCopy[y+1][x].value++
      gameStateCopy[y+1][x].reserved = this.state.turn
    }
    this.setState({gameState: gameStateCopy}, () => {
      window.setTimeout(this.processBoard.bind(this), 1000)
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
