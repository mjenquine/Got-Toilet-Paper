import React from 'react'
class NewForm extends React.Component {
  constructor (props) {
  super(props)
  this.state = {
    name: ''
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
      //this.props.baseURL = http://localhost:3003
      fetch(this.props.baseURL + '/holidays', {
          method: 'POST', // Put, Delete
          body: JSON.stringify({name: this.state.name}),
          headers: {
              'Content-Type': 'application/json'
            }
          })
          let data =  await response.json()
          this.props.handleAddHoliday(data)
          this.setState({
            name: ''
          })
        }catch(e){
          console.error({'Error': e})
        }
      }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="name"></label>
        <input type="text" id="store" name="store" onChange={this.handleChange} value={this.state.store} placeholder="Location"/>
        <label htmlFor="hasTP"></label>
        <input type="checkbox" id="hasTP" name="hasTP" onChange={this.handleChange} value={this.state.hasTP}/>
        <label htmlFor="brands"></label>
        <input type="text" id="brands" name="brands" onChange={this.handleChange} value={this.state.brands} placeholder="ex:) Charmin, Kirkland, etc."/>
        <input type="submit" value="Share your toilet paper!"/>
      </form>
    )
  }
}
export default NewForm
