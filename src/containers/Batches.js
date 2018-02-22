// src/containers/Lobby.js
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import fetchBatches from '../actions/batches/fetch'
import { connect as subscribeToWebsocket } from '../actions/websocket'
import Paper from 'material-ui/Paper'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import './Lobby.css'
import CreateBatchForm from '../components/CreateBatchForm'

class Batches extends PureComponent {
  componentWillMount() {
    this.props.fetchBatches()
    this.props.subscribeToWebsocket()
  }

  goToBatch = batchId => event => this.props.push(`/batch/${batchId}`)

  renderBatch = (batch, index) => {
    return (
      <MenuItem
        key={index}
        onClick={this.goToBatch(batch._id)}
        primaryText={batch.number} />
    )
  }

  render() {
    return (
      <div className="Lobby">
        <h1>Batches</h1>
        <CreateBatchForm />
        <Paper className="paper">
          <Menu>
            {this.props.batches.map(this.renderBatch)}
          </Menu>
        </Paper>
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
