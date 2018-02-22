// src/components/ui/Title.js
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {studentShape} from '../containers/Student'
import './StudentItem.css'

class StudentItem extends PureComponent {
  static propTypes = {
    student: studentShape,
    onClick: PropTypes.func.isRequired
  }

  render() {
    const {student, onClick} = this.props

    return(
      <div className="row">
        <span className="click-item" onClick={onClick}>
          <div className="col-md-8">
            {student.name}
          </div>
          <div className="col-md-2">
            <img alt="" className="student-item-photo" src={student.photo} />
          </div>
          <div className={`col-md-2 student.currentColor`}>
          </div>
        </span>
      </div>
    )
  }
}

export default StudentItem
