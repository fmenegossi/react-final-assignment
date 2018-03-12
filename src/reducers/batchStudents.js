import { BATCH_STUDENTS_FETCHED } from '../actions/batches/subscribe'
import { STUDENT_UPDATED } from '../actions/students/subscribe'

export default (state = [], { type, payload } = {}) => {
  switch (type) {
    case BATCH_STUDENTS_FETCHED :
      return  [...payload]

    case STUDENT_UPDATED:
      return state.map((student) => {
        if (student._id === payload._id) {
          return { ...payload }
        }
        return student
      })

    default :
      return state
  }
}
