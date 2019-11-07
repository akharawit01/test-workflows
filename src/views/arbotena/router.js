import React from 'react'
import { Switch, Route } from "react-router-dom"

import Experimentee from '../experimentee'
import ExperimenteeCreate from '../experimenteeCreate'

const ArbotenaRouter = props => {
  return (
    <Switch>
      <Route exact path="/arbotena" component={Experimentee} />
      <Route path="/arbotena/create" component={ExperimenteeCreate} />
      <Route path="/arbotena/:id" component={ExperimenteeCreate} />
    </Switch>
  )
}
export default ArbotenaRouter