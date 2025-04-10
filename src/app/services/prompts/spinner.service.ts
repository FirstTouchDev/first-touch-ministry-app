import { Injectable } from '@angular/core';
import { LoadingController, SpinnerTypes } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  private loading: HTMLIonLoadingElement | null = null;

  constructor(private loadingController: LoadingController) {}

  public async show(message: string = 'Loading...', spinnerType?: SpinnerTypes): Promise<void> {

    if (this.loading) return;

    this.loading = await this.loadingController.create({
      message,
      spinner: spinnerType,
      cssClass: 'custom-spinner'
    });

    await this.loading.present();
  }

  public async hide(): Promise<void> {
    if (this.loading) {
      await this.loading.dismiss();
      this.loading = null;
    }
  }
}