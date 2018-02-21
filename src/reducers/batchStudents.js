import {BATCH_STUDENTS_FETCHED} from '../actions/batches/subscribe'
import {FETCH_ONE_STUDENT} from '../actions/students/fetch'

export default (state = [], { type, payload } = {}) => {
  switch (type) {
    case BATCH_STUDENTS_FETCHED :
      return  [...payload]

    case FETCH_ONE_STUDENT:
      const studentIds = state.map(s => s._id)
      console.log(studentIds)

      if(!studentIds.includes(payload._id)){
        return [{...state, ...payload}]
      }

      return [...payload]

    default :
      return state
  }
}
