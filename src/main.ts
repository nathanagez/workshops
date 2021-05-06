import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

// Uncomment this if you want to add locales.
// import fr from '@angular/common/locales/fr';
// import { registerLocaleData } from '@angular/common';
// registerLocaleData(fr);

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
