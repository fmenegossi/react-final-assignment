import {BATCH_STUDENTS_FETCHED} from '../actions/batches/subscribe'
import {FETCH_ONE_STUDENT, STUDENT_UPDATED} from '../actions/students/subscribe'

export default (state = [], { type, payload } = {}) => {
  const studentIds = state.map(s => s._id)

  switch (type) {
    case BATCH_STUDENTS_FETCHED :
      return  [...payload]

    case FETCH_ONE_STUDENT:
      if(!studentIds.includes(payload._id)){
        return [{...state, ...payload}]
      }

      return [...payload]

    case STUDENT_UPDATED:
      if(!studentIds.includes(payload._id)){
        return [{...state, ...payload}]
      }

      return [...payload]

    default :
      return state
  }
}
