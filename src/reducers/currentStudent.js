import { FETCH_ONE_STUDENT } from '../actions/students/subscribe'

export default (state = [], { type, payload } = {}) => {
  switch (type) {
    case FETCH_ONE_STUDENT:
      return payload

    default :
      return state
  }
}
