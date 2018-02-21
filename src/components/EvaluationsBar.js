import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { connect as subscribeToWebsocket } from '../actions/websocket'

class EvaluationsBar extends PureComponent {
  renderEvaluation(evaluation) {
    const style = {
      width:'30px',
      height:'30px',
      fontSize: '10px',
      marginLeft: '5px',
      marginRight: '5px',
      backgroundColor: evaluation.color
    }

    const date = new Date(evaluation.date)

    return (
      <div className="" style={style}>

      </div>
    )
  }

  render() {
    const { evaluations } = this.props

    if(!evaluations) return null

    return (
      <div className="row">
        {evaluations.map(this.renderEvaluation)}
      </div>
    )
  }
}

export default EvaluationsBar
