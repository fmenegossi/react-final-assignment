import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { connect as subscribeToWebsocket } from '../actions/websocket'
import fetchBatchStudents from '../actions/students/fetch'
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

    const { updateStudent, student } = this.props
    const { studentId } = this.props.match.params
    const { name, photo } = event.target

    const updates = {
      name: name.value || student.name,
      photo: photo.value || student.photo
    }

    updateStudent(studentId, updates)

    name.value = ''
    photo.value = ''

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
    const { student, currentEvaluations, batch } = this.props

    if(!student) return null
    if(!batch) return null

    return (
      <div className="col-md-10 offset-md-1 mt-2">
        <div className="row">
          <div className="col text-center">
            <div className="row">
              <div className="col">
                <h1 className={student.currentColor}>{student.name}</h1>
              </div>
            </div>

            <div className="row mb-1">
              <EvaluationsBar evaluations={currentEvaluations}/>
            </div>
          </div>
        </div>

        <div className="row">
          <EvaluationForm student={student} />
        </div>

        <div className="row">
          <div className="col-md-4">
            <img className="img img-thumbnail" alt="" src={student.photo} />
          </div>

          <div className="col-md-8">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <div className="form-row">
                  <label htmlFor="name"> Full Name: </label>
                  <input id="name"
                    className="form-control"
                    name="name"
                    type="text"
                    placeholder={student.name}
                  />
                </div>

                <div className="form-row">
                  <label htmlFor="photo"> Photo (link): </label>
                  <input id="photo"
                    className="form-control"
                    name="photo"
                    type="text"
                    placeholder={student.photo}
                  />
                </div>

                <div className="form-row" style={{marginTop: "1rem"}}>
                  <button
                    className="btn btn-success"
                    type="submit"
                    onClick={() => this.clicked('save')}> Save </button>
                  <button
                    className="btn btn-warning ml-2"
                    type="submit"
                    onClick={() => this.clicked('savenext')}> Save & Next </button>
                  <button
                    className="btn btn-dark ml-2"
                    type="button"
                    onClick={this.goToBatch}> Back to Batch #{batch.number} </button>
                </div>
              </div>
            </form>
          </div>
        </div>
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
