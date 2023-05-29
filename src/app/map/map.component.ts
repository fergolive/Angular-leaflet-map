import { AfterViewInit, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as L from 'leaflet';
import 'leaflet-routing-machine';


@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  map:any;
  positions:L.LatLng[]=[]
  userLocation?:L.LatLng;
  myIcon = L.divIcon({className: 'my-div-icon',iconSize:[50,90],bgPos:[0,0]});

  constructor() { 
    this.getCurrentLocation()
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  getCurrentLocation(){
    navigator.geolocation.getCurrentPosition((data:any)=>{
      let lat=data.coords.latitude;
      let lng=data.coords.longitude;
      this.userLocation=new L.LatLng(lat,lng);
      this.addMarker(lat,lng)
    })
  }

  private initMap(): void {
    //create map into id 'map'
    this.map = L.map('map').setView([-30.889332, -55.557966], 16);
    //setup tile layer (map style) - see documentation to change style of map
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
    //event click of map to add marker
    this.map.on('click',  ($event:any)=> {
      let lat=$event.latlng.lat;
      let lng=$event.latlng.lng;
      this.addMarker(lat,lng)
    });
  }

  addMarker(lat:any,lng:any){
    L.marker([lat,lng],{draggable:true,icon: this.myIcon}).addTo(this.map)
  }






 

}
