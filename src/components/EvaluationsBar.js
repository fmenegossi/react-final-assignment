import React, { PureComponent } from 'react'

class EvaluationsBar extends PureComponent {
  renderEvaluation(evaluation, index) {
    let style

    switch(evaluation.color){
      case 'red':
        style = 'danger'
        break
      case 'yellow':
        style = 'warning'
        break
      case 'green':
        style = 'success'
        break
      default:
        style = 'dark'
    }

    const date = (new Date(evaluation.date)).toLocaleDateString()

    return (
      <span className={`badge badge-pill badge-${style}`}>{date}</span>
    )
  }

  render() {
    const { evaluations } = this.props

    if(!evaluations) return null

    return (
      <div className="col text-center">
        <div className="row">
            {
              (evaluations.length > 0) ?
                evaluations.map(this.renderEvaluation)
              :
              <div className="col">
                <div class="alert alert-warning" role="alert">
                  No evaluations to show!
                </div>
              </div>
            }
        </div>
      </div>
    )
  }
}

export default EvaluationsBar
