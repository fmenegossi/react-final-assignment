import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { connect as subscribeToWebsocket } from '../actions/websocket'
import fetchBatchStudents from '../actions/students/fetch'
import {fetchOneBatch} from '../actions/batches/fetch'

export const studentShape = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  photo: PropTypes.string.isRequired,
  currentColor: PropTypes.string.isRequired
})

class Student extends PureComponent {
  static propTypes = {
    student: studentShape,
    fetchOneBatch: PropTypes.func.isRequired,
    fetchBatchStudents: PropTypes.func.isRequired,
    subscribeToWebsocket: PropTypes.func.isRequired
  }

  componentWillMount() {
    const { fetchBatchStudents, fetchOneBatch, subscribeToWebsocket } = this.props
    const { batchId } = this.props.match.params

    subscribeToWebsocket()
    fetchBatchStudents(batchId)
    fetchOneBatch(batchId)
  }

  goToNext = studentId => event => this.props.push(`/student/${studentId}`)

  render() {
    const { student } = this.props

    if(!student) return null

    return (
      <div className="Game">
        <h1>Student Page</h1>
        <span style={{backgroundColor:student.currentColor}}>{student.name}</span><br/>
        <img alt="" src={student.photo} /><br/>

        <h2>Debug Props</h2>
        <pre>{JSON.stringify(this.props, true, 2)}</pre>
      </div>
    )
  }
}

const mapStateToProps = ({ currentUser, batches, batchStudents }, { match }) => {
  const batch = batches.filter((b) => (b._id === match.params.batchId))[0]
  const student = batchStudents.filter((s) => (s._id === match.params.studentId))[0]

  const currentPos = batchStudents.indexOf(student)
  let nextStudent = null

  if(currentPos !== (batchStudents.length -1)){
    nextStudent = batchStudents[currentPos + 1]._id
  }

  return {
    student,
    batch,
    nextStudent,
    currentUser,
    batchStudents
  }
}

export default connect(mapStateToProps, {
  subscribeToWebsocket,
  fetchBatchStudents,
  fetchOneBatch,
  push
})(Student)
