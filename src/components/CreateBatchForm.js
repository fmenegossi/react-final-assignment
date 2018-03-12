import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import createBatch from '../actions/batches/create'

class CreateBatchForm extends PureComponent {
  handleFormSubmit = (event) => {
    event.preventDefault()

    const { createBatch } = this.props
    const { number, startDate, endDate } = event.target

    const newBatch = {
      number: number.value,
      startDate: startDate.value,
      endDate: endDate.value
    }

    createBatch(newBatch)
  }

  render() {
    return (
      <div className="col-md-6">
        <h3>Create a batch:</h3>

        <form onSubmit={this.handleFormSubmit}>
          <div className="form-group">
            <div className="form-row">
              <div className="col-md-3">
                Batch number:
                <input
                  className="form-control form-control-sm"
                  type="number"
                  id="number"
                  name="number"
                  placeholder="Batch number"
                  required/>
              </div>
            </div>
            <div className="form-row">
              <div className="col-md-4">
                Start date:
                <input
                  className="form-control form-control-sm"
                  type="date"
                  id="startDate"
                  name="startDate"
                  required/>
              </div>
              <div className="col-md-4">
                End date:
                <input
                  className="form-control form-control-sm"
                  type="date"
                  id="endDate"
                  name="endDate"
                  required/>
              </div>
            </div>
            <div className="form-row">
              <div className="col">
                <button
                  className="btn btn-sm btn-primary"
                  type="submit">
                  Create batch!
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default connect(null, { createBatch })(CreateBatchForm)
