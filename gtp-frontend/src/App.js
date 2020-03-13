import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import './index.css';

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
      gtps: []
    }
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
  render () {
    return (
      <div className="container">
        <div className="jumbotron">
          <h1>Hello</h1>
        </div>
        {this.state.gtps.map(gtp => {
          return (
        <div class="card" style="width: 18rem;">
          <div class="card-body">
            <h5 class="card-title">{gtp.store}</h5>
            <h6 class="card-subtitle mb-2 text-muted">{gtp.hasTP}</h6>
            <p class="card-text">{gtp.brands}</p>
            <a href="#" class="card-link">Edit</a>
            <a href="#" class="card-link">Delete</a>
          </div>
        </div>
          )
        })}
      </div>
    )
  }
}

export default App;
