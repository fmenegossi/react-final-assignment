import{
  EVALUATION_CREATED,
  EVALUATION_UPDATED,
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

    case EVALUATION_UPDATED:
      return state.map((evaluation) => {
        if(evaluation._id === payload._id){
          return { ...payload }
        }

        return evaluation
      })

    default :
      return state
  }
}
