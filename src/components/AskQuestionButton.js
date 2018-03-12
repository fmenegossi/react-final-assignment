import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { studentShape } from '../containers/Student'

class AskQuestionButton extends PureComponent {
  static propTypes = {
    students: PropTypes.arrayOf(studentShape).isRequired
  }

  askQuestion = () => {
    const { students } = this.props


    const chance = Math.floor(Math.random() * 100);
    let student = null

    if(chance <= 48 ) {
      const redGroup = students.filter((student) => student.currentColor === 'red')
      if(redGroup.length === 0) {
        return this.askQuestion()
      }

      student = redGroup[Math.floor(Math.random() * (redGroup.length))]
    } else if ((chance <= 82) && (chance > 48)) {
      const yellowGroup = students.filter((student) => student.currentColor === 'yellow')
      if(yellowGroup.length === 0) {
        return this.askQuestion()
      }

      student = yellowGroup[Math.floor(Math.random() * (yellowGroup.length))]
    } else if (chance > 82) {
      const greenGroup = students.filter((student) => student.currentColor === 'green')
      if(greenGroup.length === 0) {
        return this.askQuestion()
      }

      student = greenGroup[Math.floor(Math.random() * (greenGroup.length))]
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
