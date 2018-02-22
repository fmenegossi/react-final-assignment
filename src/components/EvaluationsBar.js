import React, { PureComponent } from 'react'

class EvaluationsBar extends PureComponent {
  renderEvaluation(evaluation, index) {
    const style = {
      width:'30px',
      height:'30px',
      fontSize: '10px',
      marginLeft: '5px',
      marginRight: '5px',
      backgroundColor: evaluation.color
    }

    //const date = new Date(evaluation.date)

    return (
      <div key={index} className="" style={style}>

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
