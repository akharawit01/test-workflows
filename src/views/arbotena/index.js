import React from 'react'
import { Layout } from 'antd'
import ArbotenaRouter from './router'

import Header from '../../components/organisms/header'
import Footer from '../../components/organisms/footer'
import Breadcrumb from '../../components/molecules/breadcrumb'

const { Content } = Layout;

const Arbotena = () => {
  return (
    <Content>
      <Header />
      <div className="container">
        <Breadcrumb />
        <ArbotenaRouter />
      </div>
      <Footer />
    </Content>
  )
}

export default Arbotena