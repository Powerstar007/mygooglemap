import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  InfoWindow,
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
import Geocode from "react-geocode";
import { Descriptions } from 'antd';
import AutoComplete from 'react-google-autocomplete';

Geocode.setApiKey("AIzaSyCJFzcr6aLrmc4IY0kjWHiFaI7l0M4gF3w")

class App extends React.Component {

  state ={
    address:"",
    city:"",
    area:"",
    state:"",
    zoom:15,
    height:400,
    mapPosition:{
      lat:0,
      lng:0,
    },
    markerPosition:{
      lat:0,
      lng:0,
    }
  }



  onMarkerDragEnd =(event) =>{
    let newLat = event.latLng.lat();
    let newLng = event.latLng.lng();
    Geocode.fromLatLng(newLat, newLng)
    .then(response => {
      
      const address = response.results[0].formatted_address,
      addressArray = response.results[0].address_components,
      city = this.getCity(addressArray),
      area = this.getArea(addressArray),
      state = this.getState(addressArray)
      this.setState({
        address:(address) ? address : "",
        area :(area) ? area:"",
        city :(city) ? city:"",
        state:(state) ? state:"",
        markerPosition :{
          lat:newLat,
          lng:newLng,
        },
        mapPosition :{
          lat:newLat,
          lng:newLng,
        },
      })
    })
  }
  onPlaceSelected = (place) => {
    const address = place.formatted_address,
    addressArray = place.address_components,
    city = this.getCity(addressArray),
    area = this.getArea(addressArray),
    state = this.getState(addressArray),
    newLat = place.geometry.location.lat(),
    newLng = place.geometry.location.lng()
    this.setState({
      address:(address) ? address : "",
      area :(area) ? area:"",
      city :(city) ? city:"",
      state:(state) ? state:"",
      markerPosition :{
        lat:newLat,
        lng:newLng,
      },
      mapPosition :{
        lat:newLat,
        lng:newLng,
      },
    })
  }

  render(){

    const MapWithAMarker = withScriptjs(withGoogleMap(props =>
      <GoogleMap
        defaultZoom={8}
        defaultCenter={{ lat:this.state.mapPosition.lat, lng: this.state.mapPosition.lng }}
      >
        <Marker
        draggable={true}
       onDragEnd={this.onMarkerDragEnd}
          position={{lat:this.state.markerPosition.lat, lng: this.state.markerPosition.lng }}
        >
          <InfoWindow>
            <div>
              hello
            </div>
          </InfoWindow>
          </Marker>

         <AutoComplete
          style={{width:'100%', height:'40px', paddingLeft:16,marginTop:2,marginBottom:'2rem'}}
          types={['(regions)']}
          onPlaceSelected={this.onPlaceSelected}
         
         />
      </GoogleMap>
    ));

  return (

   <div style={{padding:'1rem',margin:'0 auto',maxwidth:100}}>
    <h1>Google Map Basic</h1>
   <Descriptions bordered>
    <Descriptions.Item label="City">{this.state.city}</Descriptions.Item>
    <Descriptions.Item label="Area">{this.state.area}</Descriptions.Item>
    <Descriptions.Item label="State">{this.state.state}</Descriptions.Item>
    <Descriptions.Item label="Address">{this.state.address}</Descriptions.Item>
  </Descriptions>


      
    <MapWithAMarker
    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCJFzcr6aLrmc4IY0kjWHiFaI7l0M4gF3w&v=3.exp&libraries=geometry,drawing,places"
    loadingElement={<div style={{ height: `100%` }} />}
    containerElement={<div style={{ height: `400px` }} />}
    mapElement={<div style={{ height: `100%` }} />}
  />
  </div>
    
  );
}
}

export default App;
