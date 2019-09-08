
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable()
export class UsuarioProvider {

  // declaracion de variables

  clave:string;
  user:any = {};

  constructor(private dbfirebase: AngularFirestore
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
                      resolve(true);  
                  }else{
                    // respuesta incorrecta
                      resolve(false); 
                  }
                  
              }) ;


        });
  }

  guardarStorage(){
    
  }

}
