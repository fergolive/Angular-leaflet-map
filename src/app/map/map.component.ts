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
  /*   this.map = L.map('map', {
      center: [ -30.889332, -55.557966 ],
      zoom: 3
    }); */

    this.map = L.map('map').setView([-30.889332, -55.557966], 13);
    
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(this.map);
  
  L.marker([-30.889332, -55.557966]).addTo(this.map)
      .bindPopup('A pretty CSS popup.<br> Easily customizable.')
      .openPopup();
  }

  constructor() { }

  ngAfterViewInit(): void {
    this.initMap();
  }

}
