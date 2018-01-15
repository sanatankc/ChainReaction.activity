import React, { Component } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 22;
}`

const Main = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background: white;
  padding: 15px 30px;
  border-radius: 5px;
  width: 100%;
  height: 100%;
`
const WinText = styled.div`
  font-size: 36px;
  margin-top: 20px;
  margin-bottom: 20px;
`
const OverText = styled.div`
  font-size: 18px;
  letter-spacing: 2.2px;
`
const PlayButton = styled.div`
  cursor: pointer;
  width: 60px;
  height: 50px;
  background: url('icons/play.svg');
`
const Welcome = styled.div`
  font-size: 36px;
`
const Instructions = styled.div`
  font-size: 18px;
  margin-top: 20px;
  margin-bottom: 20px;
  width: 330px;
`

export default class HelpUI extends Component {
  render() {
    return (
      <Container>
        <Main>
        <Welcome>Objective</Welcome>
        <Instructions>Objective: The Objective of Chain Reaction is to take control
          of the board by eliminating your opponents orbits.</Instructions>
        <Instructions>
          Players takes it in turns to place their orbits in a cell. Once a cell has
          reached critical masss the orbits explode into the surrounding cells adding
          an extra orbits andd claiming cell for the player. A player may only place their
          own colour. As soon as a player looses all their orbs they are out of the game.
        </Instructions>
        </Main>
      </Container>
    )
  }
}
