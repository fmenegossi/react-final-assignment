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
      <div className="col-sm-2 col-md-3">
        <div className="card student-card click-item" onClick={onClick}>
          <img className="card-img-top" src={student.photo} alt="" />
          <div className={`card-body ${student.currentColor}`}>
            <p className="card-text student-card-name">{student.name}</p>
          </div>
        </div>
      </div>

    )
  }
}

export default StudentItem
