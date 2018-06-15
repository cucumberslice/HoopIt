
import React, { Component } from 'react';
// import './App.css';
// import the Google Maps API Wrapper from google-maps-react
import { Map, InfoWindow, GoogleApiWrapper, Marker} from 'google-maps-react'
// import child component
import MapContainer from './mapcontainer'
import courts from '../courts'
import axios from 'axios'
// import Marker from './marker'


const style = {
  width: '75%',
  height: '75%',
}

class HoopMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      courtInfo: {}
    }
    this.onMapClicked = this.onMapClicked.bind(this)

  }


  // async componentDidMount() {
  //   const res = await axios.get(`/api/courts/`)
  //   this.setState({courts: res.data})
  // }


  onMarkerClick = async (props, marker, event) => {
    const res = await axios.get(`/api/courts/${props.courtId}`)
    console.log(res.data)

    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
      courtInfo: res.data
    });
  }

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };

  render() {

    return (
      <div>
        <h1> FIND A PICKUP GAME </h1>
        <Map google={this.props.google}
        style={style}
        initialCenter={{lat: 40.7485722, lng: -74.0068633}}
        zoom={12}>
        {
        courts.map((court) => {
          return <Marker position={{lat: court.geometry.coordinates[1], lng: court.geometry.coordinates[0]}} icon={{
            url: "http://www.clker.com/cliparts/j/N/m/m/d/2/glossy-red-icon-button-md.png",
            anchor: new google.maps.Point(10,10),
            scaledSize: new google.maps.Size(10,10)
          }} onClick={this.onMarkerClick} courtId={court.courtId} />
        })}
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
            <div>
              <h1>{this.state.courtInfo.name}</h1>
              <h3>{this.state.courtInfo.location}</h3>
            </div>
        </InfoWindow>
        </Map>
      </div>
    );
  }
}
// OTHER MOST IMPORTANT: Here we are exporting the App component WITH the GoogleApiWrapper. You pass it down with an object containing your API key
export default GoogleApiWrapper({
  apiKey: 'AIzaSyBL6XBWAiP5STkl9nRcE8x3XTtywDqWDu4',
})(HoopMap)