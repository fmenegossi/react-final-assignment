import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { connect as subscribeToWebsocket } from '../actions/websocket'
import createEvaluation from '../actions/evaluations/create'
import updateStudent from '../actions/students/update'

class EvaluationForm extends PureComponent {
  componentWillMount() {
    this.props.subscribeToWebsocket()
  }

  handleFormSubmit = (event) => {
    event.preventDefault()

    const { student, currentUser, createEvaluation, updateStudent, evaluations } = this.props
    const {date, color, remarks} = event.target
    const newEvaluation = {
      studentId: student._id,
      userId: currentUser._id,
      date: date.value,
      color: color.value,
      remarks: remarks.value
    }


    createEvaluation(newEvaluation)

    let lastColor = null

    if(evaluations[evaluations.length - 1]){
      lastColor = evaluations[evaluations.length - 1].color
    } else {
      lastColor = newEvaluation.color
    }
    updateStudent(student._id, {currentColor: lastColor})
  }

  render() {
    const currentDate = new Date()
    const day = currentDate.getDate()
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0')
    const year = currentDate.getFullYear()
    const today = `${year}-${month}-${day}`


    return (
      <div className="col mt-3">
        <form onSubmit={this.handleFormSubmit}>
          <div className="form-group">
            <div className="form-row">
              <div className="col-md-2">
                <label htmlFor="date"> Evaluation date </label>
                <input id="date"
                  className="form-control form-control-sm"
                  type="date"
                  name="date"
                  min={today}
                  defaultValue={today}
                />
              </div>

              <div className="col">
                <label htmlFor="remarks"> Remarks </label>
                <input id="remarks" className="form-control form-control-sm" name="remarks" type="text"/>
              </div>

              <div className="col mt-2 pt-4">
                <label className="btn btn-sm btn-danger mr-2">
                  <input name="color" type="radio" value="red" defaultChecked/> RED
                </label>
                <label className="btn btn-sm btn-warning mr-2">
                  <input name="color" type="radio" value="yellow" /> YELLOW
                </label>
                <label className="btn btn-sm btn-success mr-2">
                  <input name="color" type="radio" value="green" /> GREEN
                </label>
              </div>
            </div>



            <div className="form-row">
              <div className="col">
                <button className="btn btn-sm btn-primary" type="submit"> Save Evaluation </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = ({ currentUser, evaluations }) => {
  return {
    currentUser,
    evaluations
  }
}

export default connect(mapStateToProps, {
  subscribeToWebsocket,
  createEvaluation,
  updateStudent
})(EvaluationForm)
