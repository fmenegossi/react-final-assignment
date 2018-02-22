import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { connect as subscribeToWebsocket } from '../actions/websocket'
import fetchBatchStudents, { fetchOneStudent } from '../actions/students/fetch'
import updateStudent from '../actions/students/update'
import {fetchOneBatch} from '../actions/batches/fetch'
import {fetchStudentEvaluations} from '../actions/evaluations/fetch'

import EvaluationForm from '../components/EvaluationForm'
import EvaluationsBar from '../components/EvaluationsBar'

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
    // fetchOneStudent: PropTypes.func.isRequired,
    subscribeToWebsocket: PropTypes.func.isRequired
  }

  constructor(){
    super()

    this.buttonClicked = null
  }

  componentWillMount() {
    const {
        push,
        fetchOneBatch,
        fetchBatchStudents,
        subscribeToWebsocket,
        fetchStudentEvaluations,
    } = this.props
    const { batchId, studentId } = this.props.match.params

    subscribeToWebsocket()
    fetchBatchStudents(batchId)
    fetchOneBatch(batchId)
    fetchStudentEvaluations(studentId)
  }

  clicked = (type) => this.buttonClicked = type

  handleSubmit = (event) => {
    event.preventDefault()

    const { updateStudent, student, evaluations } = this.props
    const { batchId, studentId } = this.props.match.params
    const { name, photo } = event.target

    const updates = {
      name: name.value || student.name,
      photo: photo.value || student.photo
    }

    updateStudent(studentId, updates)

    if(this.buttonClicked === 'save') {
      this.goToBatch()
    } else {
      this.goToNext()
    }
  }

  goToNext = () => {
    const { nextStudent } = this.props
    const { batchId } = this.props.match.params

    if(nextStudent) {
      this.props.push(`/batch/${batchId}/student/${nextStudent}`)
    } else {
      this.goToBatch()
    }
  }
  goToBatch = () => this.props.push(`/batch/${this.props.match.params.batchId}`)

  render() {
    const { student, currentEvaluations } = this.props

    if(!student) return null

    return (
      <div>
        <h1 style={{backgroundColor:student.currentColor}}>{student.name}</h1>
        <img alt="" src={student.photo} /><br/><br/>

        <form onSubmit={this.handleSubmit}>
          <label htmlFor="name"> Name: </label>
          <input name="name" type="text" placeholder={student.name} />
          <label htmlFor="photo"> Photo (link): </label>
          <input name="photo" type="text" placeholder={student.photo} />
          <input type="submit" value="Save" onClick={() => this.clicked('save')}/>
          <input type="submit" value="Save & Next" onClick={() => this.clicked('savenext')}/>
        </form>

        <EvaluationsBar evaluations={currentEvaluations}/>
        <EvaluationForm student={student} />
      </div>
    )
  }
}

const mapStateToProps = ({ currentUser,
                           batches,
                           batchStudents,
                           evaluations }, { match }) => {
  const batch = batches.filter((b) => (b._id === match.params.batchId))[0]
  const student = batchStudents.filter((s) => (s._id === match.params.studentId))[0]
  const currentEvaluations = evaluations.filter((e) => (e.studentId === match.params.studentId))


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
    currentEvaluations,
    batchStudents,
    evaluations
  }
}

export default connect(mapStateToProps, {
  fetchStudentEvaluations,
  subscribeToWebsocket,
  updateStudent,
  fetchOneBatch,
  fetchBatchStudents,
  push
})(Student)
