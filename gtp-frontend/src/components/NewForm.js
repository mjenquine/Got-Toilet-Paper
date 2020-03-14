import React from 'react'
class NewForm extends React.Component {
  constructor (props) {
  super(props)
  this.state = {
    store: '',
    hasTP: Boolean,
    brands: '',
  }
this.handleChange = this.handleChange.bind(this)
this.handleSubmit = this.handleSubmit.bind(this)
}
handleChange (event) {
 this.setState({ [event.currentTarget.id]: event.currentTarget.value})
}
async handleSubmit (event) {
    event.preventDefault()
    try{
      let response = await
      this.props.baseURL = `http://localhost:3003`
      fetch(this.props.baseURL + '/gtps', {
          method: 'POST', // Put, Delete
          body: JSON.stringify({store: this.state.store}),
          headers: {
              'Content-Type': 'application/json'
            }
          })
          let data =  await response.json()
          this.props.handleAddGtp(data)
          this.setState({
              store: '',
              hasTP: Boolean,
              brands: '',
          })
        }catch(e){
          console.error({'Error': e})
        }
    }

render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="store">Store Name </label>
          <input className="form-control" type="text" id="store" name="store" onChange={this.handleChange} value={this.state.store} placeholder="Location"/>
        </div>
        <div className="form-group form-check">
          <input className="form-check-input" type="checkbox" id="hasTP" name="hasTP" onChange={this.handleChange} value={this.state.hasTP}/>
          <label className="form-check-label" htmlFor="hasTP">Is TP In Stock? </label>
        </div>
        <div className="form-group">
          <label htmlFor="brands">Brands In Stock </label>
          <input className="form-control" type="text" id="brands" name="brands" onChange={this.handleChange} value={this.state.brands} placeholder="ex:) Charmin, Kirkland, etc."/>
        </div>
        <div className="form-group">
          <input className="btn btn-primary" type="submit" value="Share your toilet paper!"/>
        </div>
      </form>
    )
  }
}
export default NewForm
