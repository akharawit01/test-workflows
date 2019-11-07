import React, { Component } from 'react'
import HeaderStyle from './header.style'
import TopHeader from '../topHeader'
import MainHeader from '../mainHeader'

class Header extends Component {
  render() {
    return (
      <HeaderStyle>
        <TopHeader />
        <MainHeader />
      </HeaderStyle>
    )
  }
}

export default Header