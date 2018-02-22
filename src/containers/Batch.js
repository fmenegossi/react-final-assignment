import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { connect as subscribeToWebsocket } from '../actions/websocket'
import { fetchOneBatch } from '../actions/batches/fetch'
import fetchBatchStudents from '../actions/students/fetch'
import StudentItem from '../components/StudentItem'


class Batch extends PureComponent {
  static propTypes = {
    fetchOneBatch: PropTypes.func.isRequired,
    fetchBatchStudents: PropTypes.func.isRequired,
    subscribeToWebsocket: PropTypes.func.isRequired,
    batch: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      number: PropTypes.number.isRequired,
      students: PropTypes.arrayOf(PropTypes.string).isRequired,
      startDate: PropTypes.string.isRequired,
      endDate: PropTypes.string.isRequired,
    })
  }

  componentWillMount() {
    const { batch, fetchOneBatch, subscribeToWebsocket, fetchBatchStudents} = this.props
    const { batchId } = this.props.match.params

    subscribeToWebsocket()

    if(!batch){fetchOneBatch(batchId)}
    fetchBatchStudents(batchId)
  }

  goToStudent = studentId => event => this.props.push(`/batch/${this.props.batch._id}/student/${studentId}`)

  renderStudent = (student, index) => {
    return (
      <StudentItem
        key={index}
        student={student}
        onClick={this.goToStudent(student._id)}
      />
    )
  }

  render() {
    const { batch, batchStudents } = this.props

    if (!batch) return null

    return (
      <div className="Game">
        <h1>Choose a Rookie</h1>


        {batchStudents.map(this.renderStudent)}

        <h2>Debug Props</h2>
        <pre>{JSON.stringify(this.props, true, 2)}</pre>
      </div>
    )
  }
}

const mapStateToProps = ({ currentUser, batches, batchStudents }, { match }) => {
  const batch = batches.filter((b) => (b._id === match.params.batchId))[0]
  return {
    batch,
    currentUser,
    batchStudents
  }
}

export default connect(mapStateToProps, {
  subscribeToWebsocket,
  fetchOneBatch,
  fetchBatchStudents,
  push
})(Batch)
