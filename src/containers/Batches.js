// src/containers/Lobby.js
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import fetchBatches from '../actions/batches/fetch'
import { connect as subscribeToWebsocket } from '../actions/websocket'
import CreateBatchForm from '../components/CreateBatchForm'

class Batches extends PureComponent {
  componentWillMount() {
    this.props.fetchBatches()
    this.props.subscribeToWebsocket()
  }

  goToBatch = batchId => event => this.props.push(`/batch/${batchId}`)

  renderBatch = (batch, index) => {
    let startDate = new Date(batch.startDate).toLocaleDateString()
    let endDate = new Date(batch.endDate).toLocaleDateString()

    return (
      <div key={index} className="row click-item list-item" onClick={this.goToBatch(batch._id)}>
        <div className="col-md-4 pull-left">
          Batch #{batch.number}
        </div>
        <div className="col-md-8 text-right">
          from {startDate} to {endDate}
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="col">
        <div className="row">
          <h1>Batches</h1>
        </div>
        <div className="row">
          <CreateBatchForm />
        </div>
        <div className="col-md-6">
          {this.props.batches.map(this.renderBatch)}
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ batches, currentUser}) => ({ batches, currentUser })

export default connect(mapStateToProps,
  {
    fetchBatches,
    subscribeToWebsocket,
    push
  })(Batches)
