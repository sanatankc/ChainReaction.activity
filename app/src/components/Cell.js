import React, { Component } from 'react'
import styled from 'styled-components'

const CellWrapper = styled.div`
  position: relative;
  width: 70px;
  height: 70px;
  background: #222;
  margin-right: ${props => props.isLast ? '0px' : '2px'}
`
const Ball = styled.div`
  position: absolute;
  width: 25px;
  height: 25px;
  background: ${props => props.themeColor};
  border-radius: 50%;
  top: ${props => props.position[0] + 'px'};
  left: ${props => props.position[1] + 'px'};
`

export default class Cell extends Component {
  oneBall() {
    return <Ball themeColor={this.props.themeColor} position={[23, 23]}/>
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
  render() {
    const balls = [null, this.oneBall(), this.twoBall(), this.threeBall()]
    return (
      <CellWrapper isLast={this.props.isLast} onClick={this.props.onCellClick}>
        {balls[this.props.value]}
      </CellWrapper>
    )
  }
}

