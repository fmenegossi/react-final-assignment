import{
  EVALUATION_CREATED,
  EVALUATION_UPDATED,
  ONE_EVALUATION_FETCHED,
  STUDENT_EVALUATIONS_FETCHED,
  ALL_EVALUATIONS_FETCHED
} from '../actions/evaluations/subscribe'

export default (state = [], { type, payload } = {}) => {
  switch (type) {
    case EVALUATION_CREATED:
      return  [...state].concat(payload)

    case ALL_EVALUATIONS_FETCHED:
      return payload

    case STUDENT_EVALUATIONS_FETCHED:
      return payload

    default :
      return state
  }
}
