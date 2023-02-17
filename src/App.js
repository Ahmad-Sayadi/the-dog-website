import React from 'react'
import axios from 'axios'
import './styles.css'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      breed: 'husky',
      images: [],
    }
  }

  componentDidMount() {
    this.fetchDogImages()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.breed !== this.state.breed) {
      this.setState({
        images: [],
      })
      this.fetchDogImages()
    }
  }

  handleChange = (event) => {
    this.setState({
      breed: event.target.value,
    })
  }

  fetchDogImages() {
    axios
      .get(`https://dog.ceo/api/breed/${this.state.breed}/images`)
      .then((result) => {
        this.setState({
          images: result.data.message,
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  render() {
    return (
      <div>
        <select onChange={this.handleChange} value={this.state.breed}>
          <option value="husky">Husky</option>
          <option vlaue="beagle">Beagle</option>
          <option value="corgi">Corgi</option>
        </select>

        <div>
          {this.state.images.map((image) => (
            <img className="image" src={image} alt="dog" />
          ))}
        </div>
      </div>
    )
  }
}

export default App
