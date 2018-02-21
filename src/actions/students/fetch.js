import API from '../../api/client'
import {BATCH_STUDENTS_FETCHED} from '../batches/subscribe'
import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
} from '../loading'

export const FETCH_ALL_STUDENTS = 'FETCH_ALL_STUDENTS'
export const FETCH_ONE_STUDENT = 'FETCH_ONE_STUDENT'

const api = new API()

export default (batchId) => {
  return (dispatch) => {
    dispatch({ type: APP_LOADING })

    api.get(`/batches/${batchId}/students`)
      .then((result) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({ type: LOAD_SUCCESS })
      })
      .catch((error) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({
          type: LOAD_ERROR,
          payload: error.message
        })
      })
  }
}

export const fetchAllStudents = () =>{
  return (dispatch) => {
    dispatch({ type: APP_LOADING })

    api.get(`/students`)
      .then((result) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({ type: LOAD_SUCCESS })

        dispatch({
          type: FETCH_ALL_STUDENTS,
          payload: result.body
        })
      })
      .catch((error) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({
          type: LOAD_ERROR,
          payload: error.message
        })
      })
  }
}

export const fetchOneStudent = (studentId) =>{
  return (dispatch) => {
    dispatch({ type: APP_LOADING })

    api.get(`/students/${studentId}`)
      .then((result) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({ type: LOAD_SUCCESS })

        dispatch({
          type: FETCH_ONE_STUDENT,
          payload: result.body
        })
      })
      .catch((error) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({
          type: LOAD_ERROR,
          payload: error.message
        })
      })
  }
}
