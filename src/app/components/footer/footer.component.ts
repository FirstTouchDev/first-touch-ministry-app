import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { personCircle, home, apps, create, trash, musicalNotes } from 'ionicons/icons'

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  standalone: true,
  imports: [
    IonicModule
  ],
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent  implements OnInit {

  constructor() { 
    addIcons( { apps, create, trash, home, personCircle });
  }

  ngOnInit() {}

}
