
import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { UsuarioProvider } from "../usuario/usuario";
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class UbicacionProvider {


  taxista:AngularFirestoreDocument<any>;
  private watch: Subscription;
  

  constructor( private dbFireStore: AngularFirestore,
               private geolocation: Geolocation ,
               public _usuarioProv: UsuarioProvider) {

    // quei elimina esta linea de codigo xq se inicializa solo una vez =>se agrega  inicializarTaxista
    // para ser inicializada desde home.          
    //this.taxista = dbFireStore.doc(`/usuarios/${_usuarioProv.clave}`)
  }
  
  inicializarTaxista(){
    this.taxista = this.dbFireStore.doc(`/usuarios/${ this._usuarioProv.clave}`)
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

      this.watch = this.geolocation.watchPosition()
      .subscribe((data) => {
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

  detenerUbicaion(){
    try {
      this.watch.unsubscribe();
    } catch (error) {
      console.log(JSON.stringify(error));
    }

      
  }
}
