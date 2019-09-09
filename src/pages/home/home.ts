import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UbicacionProvider } from "../../providers/ubicacion/ubicacion";
import { LoginPage } from '../login/login';
import { UsuarioProvider } from '../../providers/usuario/usuario';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  vuser:any ={};

  constructor(public navCtrl: NavController, 
              public _ServiceGeo: UbicacionProvider,
              public _ServiceUsu: UsuarioProvider) {


                this._ServiceGeo.iniciarGeolocalizaion();
                this._ServiceGeo.inicializarTaxista();

                this._ServiceGeo.taxista.valueChanges()
                .subscribe( data =>{
                  this.vuser = data;

                });

  }

  salir(){

    this._ServiceGeo.detenerUbicaion();  
    this.navCtrl.setRoot( LoginPage);
    this._ServiceUsu.borrarUsuarioLogin();
  }

}
