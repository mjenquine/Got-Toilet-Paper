import React from 'react'

class Show extends React.Component {
  render () {
    return (
      <>
        <div className="details">
         <h3>Store Info:</h3>
         <hr/>
         <h4> { this.props.gtp.store }</h4>
         <h6><span>Has Toilet Paper:</span>   { this.props.gtp.hasTP ? 'In Stock' : 'Out of Stock'} </h6>
       </div>
      </>
    )
  }
 }
export default Show
