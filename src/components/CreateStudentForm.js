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
      <div className="col-sm-8 col-md-6">
        <h3>Add a fellow student:</h3>

        <form onSubmit={this.handleFormSubmit}>
          <div className="form-group">
            <div className="form-row">
              <div className="col-md-4">
                <label htmlFor="name"> Name: </label>
                <input className="form-control form-control-sm" type="text" id="name" name="name"/>
              </div>
              <div className="col">
                <label htmlFor="photo"> Photo(link): </label>
                <input className="form-control form-control-sm" type="text" id="photo" name="photo"/>
              </div>
            </div>
            <div className="form-row">
              <div className="col">
                <button className="btn btn-sm btn-primary" type="submit"> Add a student! </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default connect(null, { createStudentInBatch })(CreateStudentForm)
