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
         // <h6><span>Likes:</span> {this.props.holiday.likes}</h6>
         // <p><span>Description:</span> { this.props.holiday.description } </p>
       </div>
      </>
    )
  }
 }
export default Show
