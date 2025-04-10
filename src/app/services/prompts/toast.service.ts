import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private toastController: ToastController) {}


  public async toast(message: string, duration: number = 2000, type: string): Promise<void>{
    const toast = await this.toastController.create({
        message: message, 
        duration: duration, 
        position: "top", 
        swipeGesture: "vertical", 
        color: type, 
        cssClass: "custom-toast-center-message"
        });
        toast.present();
    }
}