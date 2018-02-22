import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { connect as subscribeToWebsocket } from '../actions/websocket'
import fetchBatchStudents from '../actions/students/fetch'
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
    subscribeToWebsocket: PropTypes.func.isRequired
  }

  constructor(){
    super()

    this.buttonClicked = null
  }

  componentWillMount() {
    const {
        fetchBatchStudents,
        fetchOneBatch,
        subscribeToWebsocket,
        fetchStudentEvaluations,
        push } = this.props
    const { batchId, studentId } = this.props.match.params

    subscribeToWebsocket()
    fetchBatchStudents(batchId)
    fetchOneBatch(batchId)
    fetchStudentEvaluations(studentId)
  }

  clicked = (type) => this.buttonClicked = type

  handleSubmit = (event) => {
    event.preventDefault()

    const { updateStudent, student } = this.props
    const { batchId, studentId } = this.props.match.params

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
    const { student, evaluations } = this.props

    if(!student) return null

    return (
      <div className="Game">
        <h1 style={{backgroundColor:student.currentColor}}>{student.name}</h1>
        <img alt="" src={student.photo} /><br/><br/>

        <form onSubmit={this.handleSubmit}>
          <label htmlFor="name"> Name: </label>
          <input name="name" type="text" defaultValue={student.name} />
          <label htmlFor="photo"> Photo (link): </label>
          <input name="photo" type="text" defaultValue={student.photo} />
          <input type="submit" value="Save" onClick={() => this.clicked('save')}/>
          <input type="submit" value="Save & Next" onClick={() => this.clicked('savenext')}/>
        </form>

        <EvaluationsBar evaluations={evaluations}/>
        <EvaluationForm student={student} />
      </div>
    )
  }
}

const mapStateToProps = ({ currentUser, batches, batchStudents, evaluations }, { match }) => {
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
    batchStudents,
    evaluations
  }
}

export default connect(mapStateToProps, {
  fetchStudentEvaluations,
  subscribeToWebsocket,
  fetchBatchStudents,
  fetchOneBatch,
  push
})(Student)
