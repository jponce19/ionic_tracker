
import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { UsuarioProvider } from "../usuario/usuario";

@Injectable()
export class UbicacionProvider {


  taxista:AngularFirestoreDocument<any>;
  

  constructor( private dbFireStore: AngularFirestore,
               private geolocation: Geolocation ,
               public _usuarioProv: UsuarioProvider) {

    this.taxista = dbFireStore.doc(`/usuarios/${_usuarioProv.clave}`)
  }
  
  iniciarGeolocalizaion(){

    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude

      this.taxista.update({
            lat: resp.coords.latitude,
            lng: resp.coords.longitude,
            clave: this._usuarioProv.clave
      });

      let watch = this.geolocation.watchPosition();
      watch.subscribe((data) => {
       // data can be a set of coordinates, or an error (if an error occurred).
       // data.coords.latitude
       // data.coords.longitude
       this.taxista.update({
            lat: data.coords.latitude,
            lng: data.coords.longitude,
            clave: this._usuarioProv.clave
        });

      });


     }).catch((error) => {
       console.log('Error getting location', error);
     });    

  }
}
