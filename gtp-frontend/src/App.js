import React from 'react'
// import './css/normalize.css'
// import './css/skeleton.css'
// import './css/index.css'
import NewForm from './components/NewForm.js'
// import ballons from './images/two-balloon-icons-68911.png'
// import pencil from './images/simpleiconDOTcom-pen-15-64x64.png'
// import Show from './components/Show.js'
// import UpdateForm from './components/UpdateForm.js'
let baseURL = process.env.REACT_APP_BASEURL
//alternate baseURL = 'https://fathomless-sierra-68956.herokuapp.com'
if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:3003'
} else {
  baseURL = 'https://fathomless-sierra-68956.herokuapp.com'
}
console.log('current base URL:', baseURL)

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      gtps: []
      // gtp: null
    }
    this.getGtps = this.getGtps.bind(this)
    this.handleAddGtp = this.handleAddGtp.bind(this)
    this.deleteGtp = this.deleteGtp.bind(this)
    this.toggleCelebrated = this.toggleCelebrated.bind(this)
    this.getGtp = this.getGtp.bind(this)
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

async toggleCelebrated (gtp){
  console.log(gtp)
  try{
  let response = await fetch(baseURL + '/gtps/' + gtp._id, {
    method: 'PUT',
    body: JSON.stringify({celebrated: !gtp.celebrated}),
    headers: {
      'Content-Type': 'application/json'
    }
  })

  let updatedGtp = await response.json()
  const foundGtp = this.state.gtps.findIndex(foundItem => foundItem._id === gtp._id)
  const copyGtps = [...this.state.gtps]
  copyGtps[foundGtp].celebrated = updatedGtp.celebrated
  console.log(updatedGtp)
  this.setState({gtps: copyGtps})
  }catch(e){
    console.error(e)
  }
}

getGtp(gtp) {
  this.setState({gtp: gtp})
  console.log(gtp)
}

 render () {
   return (
     <div className='container'>
      <h1>Got Toilet Paper?</h1>
        <NewForm handleAddGtp={this.handleAddGtp} baseURL={baseURL}/>
        <table>
    <tbody>
      { this.state.gtps.map(gtp => {
          return (
            <tr key={gtp._id} onMouseOver={() => this.getGtp(gtp)}>
              <td  onDoubleClick={() => this.toggleCelebrated(gtp)}
                className={gtp.celebrated
                  ? 'celebrated'
                  : null }>
                  {gtp.name } and its {gtp.celebrated ? 'In Stock': 'Out of Stock' }
                </td>
              <td onClick={()=>{ this.deleteGtp(gtp._id)}}>X</td>
            </tr>
          )
        })
      }
    </tbody>
  </table>
  </div>
  // {/* This is conditional rendering */}
  // { this.state.gtp
  //       ? <Show gtp={this.state.gtp}/>
  //       : null }
   )
 }
}
export default App
