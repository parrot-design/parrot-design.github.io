import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'; 

import { AppModule } from './app/app.module';

const app = platformBrowserDynamic()

app.bootstrapModule(AppModule)
  .catch((err: any) => console.error(err));
  