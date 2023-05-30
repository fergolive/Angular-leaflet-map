import { AfterViewInit, Component } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import * as L from 'leaflet';
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";



@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule,NgFor],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  map:any;
  savedLocations:any[]=[]
  userLocation?:L.LatLng;
  myIcon = L.divIcon({className: 'my-div-icon',iconSize:[50,90],bgPos:[0,0]});

 

  constructor() { 
    
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  getCurrentLocation(){
    navigator.geolocation.getCurrentPosition((data:any)=>{
      let lat=data.coords.latitude;
      let lng=data.coords.longitude;
      this.userLocation=new L.LatLng(lat,lng);
      this.addMarker(lat,lng);
      this.goToLocation(lat,lng);
    })
  }

  goToLocation(lat:any,lng:any){
    this.map.setView([lat,lng])
  }


  private initMap(): void {
    //create map into id 'map'

    //option 1
    //this.map = L.map('map').setView([-30.889332, -55.557966], 16);

    //option 2 - with options
    this.map = new L.Map('map', {
      zoomControl: false,
      maxZoom: 20,
      minZoom: 5,
      center: new L.LatLng(40.708231, -74.005966),
      zoom: 14
    });

  

    //setup tile layer (map style) - see documentation to change style of map
    this.showLayers()

  /*   L.Routing.control({
      waypoints: [L.latLng(57.74, 11.94), L.latLng(57.6792, 11.949)],
      routeWhileDragging: true
    }).addTo(this.map);
 */

    //event click of map to add marker
    this.map.on('click',  ($event:any)=> {
      let lat=$event.latlng.lat;
      let lng=$event.latlng.lng;
      this.addMarker(lat,lng)
    });

  }



  addMarker(lat:any,lng:any){
    if(!this.checkSavedLocation(lat,lng)){
      let newMarker=L.marker([lat,lng],{draggable:true,icon: this.myIcon})
      newMarker.addTo(this.map);
      this.savedLocations.push(newMarker)
      
    } else{
      console.log('This locations already exist!');
      
    }
    
  }

  delMarker(selectedMarker:any){
    this.savedLocations = this.savedLocations.filter(marker=>  marker['_latlng'].lat!==selectedMarker['_latlng'].lat && marker['_latlng'].lng!==selectedMarker['_latlng'].lng)
    selectedMarker.removeFrom(this.map)
  }

  checkSavedLocation(lat:any,lng:any){
    return !!this.savedLocations.find(marker=>marker['_latlng'].lat===lat && marker['_latlng'].lng===lng) || false

  }

  showLayers(){
    const tileLayers = {
      'OpenStreet':L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map),

      'Google 1': L.tileLayer('https://{s}.google.com/vt/lyrs=m&hl=tr&x={x}&y={y}&z={z}', {
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
        zIndex: 0,
        maxNativeZoom: 21,
        maxZoom: 21
      }).addTo(this.map),

      'Google 2': L.tileLayer('https://{s}.google.com/vt/lyrs=p&hl=tr&x={x}&y={y}&z={z}', {
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
        zIndex: 0,
        maxNativeZoom: 21,
        maxZoom: 21
      }),

      'Google 3': L.tileLayer('https://{s}.google.com/vt/lyrs=s,h&hl=tr&x={x}&y={y}&z={z}', {
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
        maxNativeZoom: 20,
        zIndex: 0,
        maxZoom: 20
      }),
    };

    L.control.layers(tileLayers).addTo(this.map);
   
  }


 /*  drawRoute(){
    L.Routing.control({
      waypoints: [L.latLng(57.74, 11.94), L.latLng(57.6792, 11.949)],
      routeWhileDragging: true
    }).addTo(this.map);
  } */






 

}
