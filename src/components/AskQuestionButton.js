import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { createStudentInBatch } from '../actions/students/create'
import { studentShape } from '../containers/Student'

class AskQuestionButton extends PureComponent {
  static propTypes = {
    students: PropTypes.arrayOf(studentShape).isRequired
  }

  askQuestion = () => {
    const { students } = this.props

    const redGroup = students.filter((student) => student.currentColor === 'red')
    const yellowGroup = students.filter((student) => student.currentColor === 'yellow')
    const greenGroup = students.filter((student) => student.currentColor === 'green')

    const chance = Math.floor(Math.random() * 100);
    let student = null
    let position = null
    let size = null

    if(chance <= 48 ) {
      if(redGroup.length === 0) {
        return this.askQuestion()
      }

      student = redGroup[Math.floor(Math.random() * (redGroup.length - 1))]
    } else if ((chance <= 82) && (chance > 48)) {
      if(yellowGroup.length === 0) {
        return this.askQuestion()
      }

      student = yellowGroup[Math.floor(Math.random() * (yellowGroup.length - 1))]
    } else if (chance > 82) {
      if(greenGroup.length === 0) {
        return this.askQuestion()
      }

      student = greenGroup[Math.floor(Math.random() * (greenGroup.length - 1))]
    }

    alert(`Ask a question to ${student.name}.\nCurrent color: ${student.currentColor.toUpperCase()}`)
  }

  render() {
    return (
      <div>
        <button className="btn btn-lg btn-dark" type="button" onClick={this.askQuestion}> Ask a Question! </button>
      </div>
    )
  }
}

export default AskQuestionButton
