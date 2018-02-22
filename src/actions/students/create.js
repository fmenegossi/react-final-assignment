import API from '../../api/client'
import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
} from '../loading'

import { STUDENT_CREATED } from './subscribe'
import { BATCH_UPDATED } from '../batches/subscribe'

const api = new API()
const batchApi = new API()

export default(newStudent) => {
  return (dispatch) => {
    dispatch({ type: APP_LOADING })

    api.post('/students', newStudent)
      .then((result) => {
        dispatch({
          type: STUDENT_CREATED,
          payload: result.body
        })
      })
      .catch((error) => {
        dispatch({
          type: LOAD_ERROR,
          payload: error.message
        })
      })
  }
}

export const createStudentInBatch = (newStudent, batch) => {
  return (dispatch) => {
    dispatch({ type: APP_LOADING })

    api.post('/students', newStudent)
      .then((result) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({ type: LOAD_SUCCESS })

        dispatch({
          type: STUDENT_CREATED,
          payload: result.body
        })

        const newStudents = batch.students.concat(result.body._id)

        api.patch(`/batches/${batch._id}`, { students: newStudents })
          .then((result) => {
            dispatch({
              type: BATCH_UPDATED,
              payload: result.body
            })
          })
          .catch((error) => {
            dispatch({
              type: LOAD_ERROR,
              payload: error.message
            })
          })
      })
      .catch((error) => {
        dispatch({
          type: LOAD_ERROR,
          payload: error.message
        })
      })
  }
}
