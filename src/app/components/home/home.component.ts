import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { eye, create, trash, musicalNotes } from 'ionicons/icons'
import { addIcons } from 'ionicons';
import { FooterComponent } from "../footer/footer.component";
import { HeaderMenuComponent } from "../header-menu/header-menu.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    IonicModule,
    FooterComponent,
    HeaderMenuComponent
],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent  implements OnInit {

  constructor() { 

    addIcons( { musicalNotes, create, trash });
  }

  ngOnInit() {}

}
