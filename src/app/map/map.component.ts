import { AfterViewInit, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  map:any;

  private initMap(): void {

    this.map = L.map('map').setView([-30.889332, -55.557966], 13);
    
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
  
    /* var myIcon = L.icon({
      iconUrl: '../assets/markers/001.svg',
      iconSize: [38, 95],
      iconAnchor: [22, 94],
      popupAnchor: [-3, -76],
     
    }); */

    var myIcon = L.divIcon({
        className: 'my-div-icon',
        iconSize:[50,90],
        bgPos:[0,0]
      });
    
// you can set .my-div-icon styles in CSS



    this.map.on('click',  ($event:any)=> {
      let lat=$event.latlng.lat;
      let lng=$event.latlng.lng;
    
      L.marker([lat,lng],{draggable:true,icon: myIcon}).addTo(this.map)
      
    });
 
  }

  constructor(

  ) { 

    


  }

  ngAfterViewInit(): void {
    this.initMap();

   
  }

  addMarker($event:any){
    console.log($event.latlng);

    let lat=$event.latlng.lat;
    let lng=$event.latlng.lng;

    console.log(lat,lng);
    
    L.marker([lat,lng]).addTo(this.map)
    .bindPopup('A pretty CSS popup.<br> Easily customizable.')
    .openPopup();
  }

 

}
