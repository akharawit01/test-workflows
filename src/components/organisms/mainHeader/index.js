import React, { Component } from 'react'
import MainHeader from './mainHeader.style'

import Logo from '../../../images/logo.svg'

class Header extends Component {
  render() {
    return (
      <MainHeader>
        <div className="container" id="main-header">
          <img src={Logo} alt="Arbotena logo" />
        </div>
      </MainHeader>
    )
  }
}

export default Header