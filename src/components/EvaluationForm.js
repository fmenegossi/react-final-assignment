import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { connect as subscribeToWebsocket } from '../actions/websocket'
import createEvaluation from '../actions/evaluations/create'

class EvaluationForm extends PureComponent {
  componentWillMount() {
    this.props.subscribeToWebsocket()
  }

  handleFormSubmit = (event) => {
    event.preventDefault()

    const { student, currentUser, createEvaluation } = this.props
    const {date, color, remarks} = event.target
    const newEvaluation = {
      studentId: student._id,
      userId: currentUser._id,
      date: date.value,
      color: color.value,
      remarks: remarks.value
    }

    createEvaluation(newEvaluation)

  }

  render() {
    return (
      <div className="Game">
        <h1>Evaluation Form:</h1>

        <form onSubmit={this.handleFormSubmit}>
          <label> Evaluation for date:
            <input type="date" name="date"/>
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

const mapStateToProps = ({ currentUser }) => {
  return {
    currentUser
  }
}

export default connect(mapStateToProps, {
  subscribeToWebsocket,
  createEvaluation
})(EvaluationForm)
