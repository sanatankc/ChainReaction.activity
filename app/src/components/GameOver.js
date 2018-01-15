import React, { Component } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 2;
}`

const Main = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background: white;
  padding: 15px 30px;
  border-radius: 5px;
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

export default class GameOverUI extends Component {
  render() {
    console.log(this.props.isThisFirstTime)
    return (
      <Container>
        <Main>
          {this.props.isThisFirstTime
            ? [<Welcome key='welcome'>Welcome</Welcome>,
              <Instructions key='instructions'>Objective: The Objective of Chain Reaction is to take control of the board by eliminating your opponents orbits.</Instructions>]
            : [<OverText key='overtext'>Game Over</OverText>,
              <WinText key='wintext'><span>{this.props.winner === 0 ? 'Red': 'Green'}</span> Won</WinText>]
          }
          <PlayButton onClick={this.props.onPlayClick}></PlayButton>
        </Main>
      </Container>
    )
  }
}