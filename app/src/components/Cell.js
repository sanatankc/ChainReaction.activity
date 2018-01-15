import React, { Component } from 'react'
import styled, { injectGlobal } from 'styled-components'


const CellWrapper = styled.div`
  position: relative;
  width: 70px;
  height: 70px;
  background: #222;
  margin-right: ${props => props.isLast ? '0px' : '2px'}
`
const Ball = styled.div`
  position: absolute;
  z-index: 10;
  width: 25px;
  height: 25px;
  background: ${props => props.themeColor};
  border-radius: 50%;
  top: ${props => props.position[0] + 'px'};
  left: ${props => props.position[1] + 'px'};
  transition: transform 0.4s ease-in-out;
  &.move-top {
    transform: translateY(-70px);
  }
  &.move-bottom {
    transform: translateY(70px)
  }
  &.move-left {
    transform: translateX(-70px)
  }
  &.move-right {
    transform: translateX(70px)
  }
`

export default class Cell extends Component {
  oneBall() {
    return <Ball themeColor={this.props.themeColor} position={[23, 23]} className='cell'/>
  }

  twoBall() {
    return [
      <Ball themeColor={this.props.themeColor} position={[10, 23]} key={0} />,
      <Ball themeColor={this.props.themeColor} position={[35, 23]} key={1} />
    ]
  }

  threeBall() {
    return [
      <Ball themeColor={this.props.themeColor} position={[10,35]} key={0} />,
      <Ball themeColor={this.props.themeColor} position={[10,10]} key={1} />,
      <Ball themeColor={this.props.themeColor} position={[32, 23]} key={2} />
    ]
  }
  fourBall() {
    return [
      <Ball themeColor={this.props.themeColor} position={[10, 23]} key={0} />,
      <Ball themeColor={this.props.themeColor} position={[35, 23]} key={1} />,
      <Ball themeColor={this.props.themeColor} position={[22, 8]} key={2} />,
      <Ball themeColor={this.props.themeColor} position={[22, 36]} key={2} />
    ]
  }

  render() {
    const balls = [null, this.oneBall(), this.twoBall(), this.threeBall(), this.fourBall()]
    return (
      <CellWrapper isLast={this.props.isLast} onClick={this.props.onCellClick} id={this.props.id}>
        {balls[this.props.value]}
      </CellWrapper>
    )
  }
}

