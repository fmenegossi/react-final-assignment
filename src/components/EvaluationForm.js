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

    const lastColor = evaluations[evaluations.length - 1].color
    updateStudent(student._id, {currentColor: newEvaluation.color})
  }

  render() {
    const currentDate = new Date()
    const day = currentDate.getDate()
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0')
    const year = currentDate.getFullYear()
    const today = `${year}-${month}-${day}`


    return (
      <div className="Game">
        <h1>Evaluation Form:</h1>

        <form onSubmit={this.handleFormSubmit}>
          <label> Evaluation for date:
            <input type="date" name="date" min={today} defaultValue={today}/>
          </label>
          <br/>
          <label>
            <input name="color" type="radio" value="red" defaultChecked/> RED
          </label>
          <label>
            <input name="color" type="radio" value="yellow" /> YELLOW
          </label>
          <label>
            <input name="color" type="radio" value="green" /> GREEN
          </label>
          <br />
          <label>
            Remarks:
            <input name="remarks" type="text"/>
          </label>

          <input type="submit" value="Save" />
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
