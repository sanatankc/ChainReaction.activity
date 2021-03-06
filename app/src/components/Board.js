import React, { Component } from 'react'
import styled from 'styled-components'
import { Easing, Tween, autoPlay } from 'es6-tween'
import Cell from './Cell'
import gameState from './gameState'
import GameOverUI from './GameOver'
import HelpUI from './HelpUI'

autoPlay(true)

const GameContainer = styled.div`
  position: relative;
  background: ${props => props.themeColor + '6b'};
  box-shadow: rgba(0, 0, 0, 0.2) 5px 5px 25px 0px;
`
const Row = styled.div`
  display: flex;
  margin-bottom: ${props => props.isLast ? '0px': '2px'};
`
const animateCells = (cellsToAnimate, callback) => {
  const animateMap = {
    left: 'translateX(-',
    right: 'translateX(',
    top: 'translateY(-',
    bottom: 'translateY(',
  }
  let coords = { x: 0};
  let tween = new Tween(coords)
    .to({ x: 70 }, 300)
    .on('update', animation => {
      for (const cells of cellsToAnimate) {
        for (const balls of cells) {
          const cellElem = document.getElementById(`cell-${balls.y}-${balls.x}`)
          try {
            cellElem.children[balls.index].style.setProperty('transform', `${animateMap[balls.toAnimate]}${animation.x}px`)
          } catch(err) {
            cells.pop(balls)
          }
        }
      }
    })
    .start()
    setTimeout(() => {
      if (callback) {
        callback()
      }
    }, 700)
}

const isOnEdge = (x,y) =>
      (x === 0 && y === 0) || (x === 5 && y === 0) || (x === 0 && y == 8) || (x === 5 && y === 8)
const isOnSide = (x, y) =>
  (!isOnEdge(x, y) && (x === 0 || x === 5 || y === 0 || y === 8))


class Board extends Component {
  constructor(props) {
    super(props)
    this.theme = ['#DD1155', '#00CC99']
    this.state = {
      gameState: gameState(),
      turn: 0,
      canClick: true,
      winner: null,
      isGameOver: true,
      isThisFirstTime: true
    }
  }

  onCellClick(indexRow, index) {
    if (this.state.canClick) {
      const cellValue = this.state.gameState[indexRow][index].value
      const stateCopy = [...this.state.gameState]

      if (stateCopy[indexRow][index].reserved !== null && stateCopy[indexRow][index].reserved !== this.state.turn) return
      if (cellValue < 4) {
        stateCopy[indexRow][index].value = cellValue + 1
        stateCopy[indexRow][index].reserved = this.state.turn
      }

      this.setState(prevState => ({
        gameState: stateCopy
      }), () => {
        this.processBoard()
      })
    }
  }

  burstCellsList() {
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
            }
          }
        })
      })
    return burstList
  }

  shouldGameOver() {
    const gameStateCopy = this.state.gameState
    const reservedGameState = gameStateCopy
      .map(row => row.map(cell => cell.reserved))
      .reduce(( acc, cur ) => acc.concat(cur), [])
    const isRedStillPlaying = reservedGameState.some(reserve => reserve === 0)
    const isGreenStillPlaying = reservedGameState.some(reserve => reserve === 1)
    if (!isRedStillPlaying) {
      return 1
    } else if (!isGreenStillPlaying) {
      return 0
    }
    return null
  }
  changeTurns() {
    this.setState(prevState => ({turn: (prevState.turn === 0) ? 1 : 0}))
  }

  processBoard(burstList) {
    if (!burstList) {
      burstList = this.burstCellsList()
    }
    this.setState({canClick: false})
    if (burstList.length === 0) {
      this.setState({canClick: true})
      this.changeTurns()
      return
    }
    this.burstBoard(burstList)
  }

  burstBoard(burstList) {
    const {gameState} = this.state
    const gameStateCopy = gameState.concat()
    const cellsToAnimate = []
    for (const cell of burstList) {
      const {x, y} = cell
      const isLeft = x - 1 >= 0
      const isRight = x + 1 <= 5
      const isTop = y - 1 >= 0
      const isBottom = y + 1 <= 8
      if (isOnEdge(x,y)) {
        if (isRight && isBottom) {
          cellsToAnimate.push([
            {x , y, index: 0, toAnimate: 'right'},
            {x , y, index: 1, toAnimate: 'bottom'}
          ])
        }
        if (isLeft && isBottom) {
          cellsToAnimate.push([
            {x , y, index: 0, toAnimate: 'left'},
            {x , y, index: 1, toAnimate: 'bottom'}
          ])
        }
        if (isRight && isTop) {
          cellsToAnimate.push([
            {x , y, index: 0, toAnimate: 'top'},
            {x , y, index: 1, toAnimate: 'right'}
          ])
        }
        if (isLeft && isTop) {
          cellsToAnimate.push([
            {x , y, index: 0, toAnimate: 'top'},
            {x , y, index: 1, toAnimate: 'left'}
          ])
        }
      } else if (isOnSide(x,y)) {
        if (!isLeft) {
          cellsToAnimate.push([
            {x , y, index: 0, toAnimate: 'right'},
            {x , y, index: 1, toAnimate: 'top'},
            {x , y, index: 2, toAnimate: 'bottom'}
          ])
        }
        if (!isRight) {
          cellsToAnimate.push([
            {x , y, index: 0, toAnimate: 'top'},
            {x , y, index: 1, toAnimate: 'left'},
            {x , y, index: 2, toAnimate: 'bottom'}
          ])
        }
        if (!isTop) {
          cellsToAnimate.push([
            {x , y, index: 0, toAnimate: 'right'},
            {x , y, index: 1, toAnimate: 'left'},
            {x , y, index: 2, toAnimate: 'bottom'}
          ])
        }
        if (!isBottom) {
          cellsToAnimate.push([
            {x , y, index: 0, toAnimate: 'right'},
            {x , y, index: 1, toAnimate: 'left'},
            {x , y, index: 2, toAnimate: 'top'}
          ])
        }
      } else {
        cellsToAnimate.push([
          {x , y, index: 0, toAnimate: 'top'},
          {x , y, index: 1, toAnimate: 'bottom'},
          {x , y, index: 2, toAnimate: 'left'},
          {x , y, index: 3, toAnimate: 'right'},
        ])
      }
    }
    animateCells(cellsToAnimate, () => {
      for (const cell of burstList) {
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

      }

      this.setState({gameState: gameStateCopy}, () => {
        const shouldGameOver = this.shouldGameOver()
        if (shouldGameOver !== null) {
          this.setState({
            isGameOver: true,
            winner: shouldGameOver
          })
          return
        }

        const burstList = this.burstCellsList()
        if (burstList.length !== 0) {
          this.processBoard(burstList)
        } else {
          this.setState({canClick: true})
          this.changeTurns()
        }
      })
    })
  }

  generateBoard() {
    return this.state.gameState.map((row, indexRow) => (
      <Row isLast={indexRow === 8} key={indexRow}>
        {row.map((state, index) =>
          <Cell
            isLast={index === 5}
            value={this.state.gameState[indexRow][index].value}
            key={`${indexRow}-${index}`}
            id={`cell-${indexRow}-${index}`}
            themeColor={this.theme[this.state.gameState[indexRow][index].reserved]}
            onCellClick={() => {
              this.onCellClick(indexRow, index)
            }}
          />
      )}
      </Row>
    ))
  }

  onPlayClick() {
    if (this.state.isThisFirstTime) {
      this.setState({isThisFirstTime: false})
    }
    this.setState({
      isGameOver: false,
      gameState: gameState(),
      turn: 0,
      canClick: true,
      winner: null
     })
  }

  render() {
    return (
        <GameContainer themeColor={this.theme[this.state.turn]}>
          {this.props.help &&
            <HelpUI />
          }
          {this.state.isGameOver &&
            <GameOverUI help={this.props.help} winner={this.state.winner} onPlayClick={this.onPlayClick.bind(this)} isThisFirstTime={this.state.isThisFirstTime} />
          }
          {this.generateBoard()}
        </GameContainer>
    )
  }

}


export default Board
