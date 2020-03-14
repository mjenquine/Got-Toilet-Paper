import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import './index.css';
import NewForm from './components/NewForm.js'
import Show from './components/Show.js'
let baseURL = ''

if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:3003'
} else {
  baseURL = 'your heroku bakend url here'
}
console.log('current base URL:', baseURL)

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      gtps: [],
      gtp: null
    }
    this.getGtps = this.getGtps.bind(this)
    this.handleAddGtp = this.handleAddGtp.bind(this)
    this.deleteGtp = this.deleteGtp.bind(this)
    this.toggleHasTP = this.toggleHasTP.bind(this)
    this.getGtp = this.getGtp.bind(this)
    this.stopShow = this.stopShow.bind(this)
  }

  componentDidMount(){
    this.getGtps()
}

  async getGtps (){
    try {
      // the async request code you want to try
      let response = await fetch(`${baseURL}/gtps`)
      let data = await response.json()
      this.setState({gtps: data})
    }catch(e){
      // what happens when you get an error
      console.error(e)
    }
  }

  handleAddGtp(gtp) {
    const copyGtps = [gtp, ...this.state.gtps]
    this.setState({
      gtps: copyGtps
    })
  }

  async deleteGtp (id){
  console.log(`I made a delete request to here: ${baseURL}/gtps/${id}`)
  try {
  let response = await fetch(baseURL + '/gtps/' +  id, {
     method: 'DELETE'
     })
     let data = await response.json()
     const foundGtp = this.state.gtps.findIndex(gtp => gtp._id === id)
     const copyGtps = [...this.state.gtps]
     copyGtps.splice(foundGtp, 1)
     this.setState({gtps: copyGtps})
  } catch(e){
    console.error(e)
  }
}

  async toggleHasTP (gtp){
   console.log(gtp)
   try{
   let response = await fetch(baseURL + '/gtps/' + gtp._id, {
     method: 'PUT',
     body: JSON.stringify({hasTP: !gtp.hasTP}),
     headers: {
       'Content-Type': 'application/json'
     }
   })
   let updatedGtp = await response.json()
   const foundGtp = this.state.gtps.findIndex(foundItem => foundItem._id === gtp._id)
   const copyGtps = [...this.state.gtps]
   copyGtps[foundGtp].hasTP = updatedGtp.hasTP
   console.log(updatedGtp)
   this.setState({gtps: copyGtps})
   }catch(e){
     console.error(e)
   }
  }

  getGtp(gtp) {
   this.setState({gtp: gtp})

  }
  stopShow(gtp) {
   this.setState({gtp: null})

  }

  render () {
    return (
      <div className="container">
        <div className="jumbotron">
          <h1>Got Toilet Paper?</h1>
        </div>
        <NewForm
          handleAddGtp={this.handleAddGtp} baseURL={baseURL}
        />
        <br />
        {this.state.gtps.map(gtp => {
          return (
        <div
          key={gtp._id}
          onMouseOver={() => this.getGtp(gtp)} onMouseOut={() => this.stopShow(gtp)} className="column"
          onDoubleClick={() => this.toggleHasTP(gtp)}
                className={gtp.hasTP
                  ? 'hasTP '
                  : 'bg-danger' }
        >
          <div className="row">
            <div className="card col" >
              <div className="card-body">
                <h5 className="card-title">{gtp.store}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{gtp.hasTP}</h6>
                <p className="card-text">{gtp.brands}</p>
                <a onClick={()=>{ this.deleteGtp(gtp._id)}} href="#" className="card-link">Delete</a>
              </div>
            </div>


          </div>
        </div>
      )
    })}
        <div className="col position-sticky">
          { this.state.gtp
            ? <Show gtp={this.state.gtp}/>
            : null
          }
        </div>
      </div>
    )
  }

}
export default App
