
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Platform } from 'ionic-angular'
import { Storage } from '@ionic/storage';

@Injectable()
export class UsuarioProvider {

  // declaracion de variables

  clave:string;
  user:any = {};

  constructor(private dbfirebase: AngularFirestore,
              private _platform: Platform,
              private _Storage:Storage
    ) {
    console.log('Hello UsuarioProvider Provider');
  }

  verificaUsuario( clave:string){
    
        clave = clave.toLocaleLowerCase();
        return new Promise ( (resolve, reject) =>{

          this.dbfirebase.doc(`/usuarios/${clave}`)
              .valueChanges().subscribe( data => {
                  console.log(data);

                  if (data){
                      // correcto
                      this.user = data;
                      this.clave = clave;
                      this.guardarStorage();
                      resolve(true);  
                  }else{
                    // respuesta incorrecta
                      resolve(false); 
                  }
                  
              }) ;


        });
  }

  guardarStorage(){

    if (this._platform.is("cordova")){
       // celular
      this._Storage.set('clave', this.clave);

    }else{
      // escritorio
      localStorage.setItem('clave',this.clave);

    }
  }

  cargarStorage(){

    return new Promise( (resolve,reject) =>{

      if (this._platform.is("cordova")){
        // celular
        this._Storage.get("clave").then( val =>{

            if (val){
              this.clave = val;  
              resolve(true);
            }else{
              resolve(false);
            }

        })
      
      }else{
        // escritorio
        if (localStorage.getItem("clave")){
          this.clave = localStorage.getItem("clave"); 
          resolve(true);
        }else{
          resolve(false);
        }
      }


    });
  }

}
