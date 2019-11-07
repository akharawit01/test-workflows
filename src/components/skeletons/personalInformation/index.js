import React, { Component } from 'react'
import { Skeleton } from 'antd'

import StyleSkeletonPersonalInformation from './style'

class skeletonPersonalInformation extends Component {
  render() {
    const isParagraph = false
    return (
      <StyleSkeletonPersonalInformation>
        <Skeleton paragraph={isParagraph} className="form-label" active></Skeleton>
        <Skeleton paragraph={isParagraph} className="form-input" active></Skeleton>

        <Skeleton paragraph={isParagraph} className="form-label" active></Skeleton>
        <Skeleton paragraph={isParagraph} className="form-input" active></Skeleton>

        <Skeleton paragraph={isParagraph} className="form-label" active></Skeleton>
        <Skeleton paragraph={isParagraph} className="form-input" active></Skeleton>
      </StyleSkeletonPersonalInformation>
    )
  }
}

export default skeletonPersonalInformation