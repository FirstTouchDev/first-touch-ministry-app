import { Component, OnInit } from '@angular/core';
import { IonicModule, NavController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { chevronBack } from 'ionicons/icons';

@Component({
  selector: 'app-custom-back-button',
  standalone: true,
  imports: [
    IonicModule
  ],
  templateUrl: './custom-back-button.component.html',
  styleUrls: ['./custom-back-button.component.scss'],
})
export class CustomBackButtonComponent  implements OnInit {

  constructor(
    private navCtrl: NavController,
  ) { 
    addIcons ( {chevronBack, } );
  }

  ngOnInit() {}

  public back(): void{
    this.navCtrl.back();
  }

}
