import React, { Component } from 'react'
import { Skeleton } from 'antd'

import StyleQuickCheck from './style'

class QuickCheck extends Component {
  render() {
    const isParagraph = false
    return (
      <StyleQuickCheck>
        <Skeleton paragraph={isParagraph} className="header" active></Skeleton>
        <Skeleton paragraph={isParagraph} className="body" active></Skeleton>

        <Skeleton paragraph={isParagraph} className="header" active></Skeleton>

        <Skeleton paragraph={isParagraph} className="header" active></Skeleton>

        <Skeleton paragraph={isParagraph} className="header" active></Skeleton>
      </StyleQuickCheck>
    )
  }
}

export default QuickCheck