import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  constructor(private alertController: AlertController) {}

  public async presentAlert(header: string, message: string, confirmHandler?: () => void, cancelHandler?: () => void) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            if (cancelHandler) cancelHandler();
          }
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            if (confirmHandler) confirmHandler();
          }
        }
      ]
    });

    await alert.present();

    // Capture the dismiss event
    const { role } = await alert.onDidDismiss();
    this.setResult({ detail: { role } } as CustomEvent);
  }

  private setResult(event: CustomEvent) {
    console.log(`Dismissed with role: ${event.detail.role}`);
  }
}
