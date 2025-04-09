import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideIonicAngular({}),
    provideIonicAngular({ mode: 'ios' }), 
    provideFirebaseApp(() => initializeApp({ 
      projectId: "first-touch-ministry-app", 
      appId: "1:121435323579:web:75196a9beb8a32dca8fd9e", 
      storageBucket: "first-touch-ministry-app.firebasestorage.app", 
      apiKey: "AIzaSyBdUVH4vz183BCUXgZPR7ULMFBemE2baiQ", 
      authDomain: "first-touch-ministry-app.firebaseapp.com",
      messagingSenderId: "121435323579" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), provideDatabase(() => getDatabase()),
  ]
};
