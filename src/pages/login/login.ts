import { Component } from '@angular/core';
import { NavController, NavParams , Slides, AlertController, LoadingController } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { UsuarioProvider} from "../../providers/usuario/usuario";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  @ViewChild(Slides) slides: Slides;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public alertCtrl: AlertController,
              public loadingCtrl : LoadingController
             ,public serviceUsuProvider: UsuarioProvider
              ) { 
  }

  ionViewDidLoad() {
    this.slides.paginationType = 'progress';
    this.slides.lockSwipes(true);
    this.slides.freeMode = false;
  }

  mostrarInput(){

      
    this.alertCtrl.create({

      title:"Ingrese el usuario",
      
      inputs:[{
        name:'username',
        placeholder:'Username'
      }],

      buttons:[{
        text:'Cancelar',
        role:'cancel'
      },{
        text:'Ingresar',
        handler: data =>{
          console.log(data);
          this.verificar_user( data.username )
        }
      }]
    }).present();
  }


  verificar_user(clave:string){

      let loading = this.loadingCtrl.create({
            content :"Verificando..."
      });

      loading.present();

      this.serviceUsuProvider.verificaUsuario(clave)
      .then( existe =>{

        loading.dismiss();

        if (existe){
          // desbloquemos los slides
          this.slides.lockSwipes(false);
          this.slides.freeMode = true;
          this.slides.slideNext();
          // volvemos a bloquear
          this.slides.lockSwipes(true); 
          this.slides.freeMode = false;
        }else{
          this.alertCtrl.create({
            title:"Usuario incorrecto",
            subTitle:"Intente de nuevo o contacte al admin",
            buttons:['Acepatar']  
          }).present();          
        }

      });
  }

}
