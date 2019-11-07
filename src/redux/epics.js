import { combineEpics } from 'redux-observable'

import Arbotena from './arbotena/epic'
import ArbotenaCreate from './arbotena/create/epic'
import ArbotenaDetail from './arbotena/detail/epic'
import User from './user/epic'

export default combineEpics(Arbotena, ArbotenaCreate, ArbotenaDetail, User)