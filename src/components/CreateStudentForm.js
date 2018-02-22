import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { createStudentInBatch } from '../actions/students/create'
import { batchShape } from '../containers/Batch'

class CreateStudentForm extends PureComponent {
  static propTypes = {
    batch: PropTypes.shape(batchShape).isRequired,
    createStudentInBatch: PropTypes.func.isRequired
  }

  handleFormSubmit = (event) => {
    event.preventDefault()

    const { createStudentInBatch, batch } = this.props
    const { name, photo } = event.target

    const newStudent = {
      name: name.value,
      photo: photo.value
    }

    createStudentInBatch(newStudent, batch)
  }

  render() {
    return (
      <div>
        <h3>Add a fellow student:</h3>

        <form onSubmit={this.handleFormSubmit}>
          <label htmlFor="name"> Name: </label>
          <input type="text" name="name"/>
          <br/>
          <label htmlFor="photo"> Photo(link): </label>
          <input type="text" name="photo"/>

          <input type="submit" value="Add a student!" />
        </form>
      </div>
    )
  }
}

export default connect(null, { createStudentInBatch })(CreateStudentForm)
