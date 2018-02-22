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
      <div>
        <h3>Create a batch:</h3>

        <form onSubmit={this.handleFormSubmit}>
          <label htmlFor="number"> Batch number: </label>
          <input type="number" name="number"/>
          <br/>
          <label htmlFor="startDate"> Start date: </label>
          <input type="date" name="startDate"/>
          <br/>
          <label htmlFor="endDate"> End date: </label>
          <input type="date" name="endDate"/>

          <input type="submit" value="Create batch!" />
        </form>
      </div>
    )
  }
}

export default connect(null, { createBatch })(CreateBatchForm)
