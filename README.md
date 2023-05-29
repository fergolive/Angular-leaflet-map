# Integration Angular - Leaflet

Js docs

- https://leafletjs.com/

### Angular tutorial 

- https://www.digitalocean.com/community/tutorials/angular-angular-and-leaflet


### How to use:

- clone this repo
- npm install
- ng serve

### Notes

# Leaflet maps

Js docs

- https://leafletjs.com/

## Angular tutorial

### Part 1
https://www.digitalocean.com/community/tutorials/angular-angular-and-leaflet
### Part 2
https://www.digitalocean.com/community/tutorials/angular-angular-and-leaflet-marker-service

Examples

- https://leafletjs.com/examples.html


## Tiles layers
https://leaflet-extras.github.io/leaflet-providers/preview/

## Marker

svg icons
https://www.svgrepo.com/vectors/marker/

### create marker
```js
 addMarker(){
    L.marker([-30.889332, -55.557966]).addTo(this.map)
    .bindPopup('A pretty CSS popup.<br> Easily customizable.')
    .openPopup();
  }
```


### get position and new create marker
```js
 this.map.on('click',  ($event:any)=> {
      let lat=$event.latlng.lat;
      let lng=$event.latlng.lng;
    
      L.marker([lat,lng],{draggable:true,icon: myIcon}).addTo(this.map)
      
    });
```


Properties

- https://leafletjs.com/reference.html#marker

- https://docs.eegeo.com/eegeo.js/v0.1.780/docs/leaflet/L.DivIcon/