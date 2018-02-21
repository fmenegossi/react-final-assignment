import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { connect as subscribeToWebsocket } from '../actions/websocket'
import {fetchOneStudent} from '../actions/students/fetch'
import {fetchOneBatch} from '../actions/batches/fetch'

export const studentShape = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  photo: PropTypes.string.isRequired,
  currentColor: PropTypes.string.isRequired
})

class Student extends PureComponent {
  static propTypes = {
    student: studentShape
  }

  componentWillMount() {
    const { student, batch } = this.props
    const { studentId, batchId } = this.props.match.params

    if(!batch){fetchOneBatch(batchId)}
    if(!student){fetchOneStudent(studentId)}
    subscribeToWebsocket()
  }

  goToNext = studentId => event => this.props.push(`/student/${studentId}`)

  render() {
    const { student } = this.props

    //if (!student) return null

    return (
      <div className="Game">
        <h1>Student Page</h1>




        <h2>Debug Props</h2>
        <pre>{JSON.stringify(this.props, true, 2)}</pre>
      </div>
    )
  }
}

const mapStateToProps = ({ currentUser, batches, batchStudents }, { match }) => {
  const student = batchStudents.filter((s) => (s._id === match.params.studentId))[0]
  const batch = batches.filter((b) => (b._id === match.params.batchId))[0]

  const currentPos = batchStudents.indexOf(student)
  let nextStudent = ""

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
  fetchOneStudent,
  fetchOneBatch,
  push
})(Student)
