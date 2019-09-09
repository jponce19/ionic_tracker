import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UbicacionProvider } from "../../providers/ubicacion/ubicacion";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  vuser:any ={};

  constructor(public navCtrl: NavController, 
              public _ServiceGeo: UbicacionProvider) {


                this._ServiceGeo.iniciarGeolocalizaion();

                this._ServiceGeo.taxista.valueChanges()
                .subscribe( data =>{
                  this.vuser = data;

                });

  }

}
