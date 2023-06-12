import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import 'reactivity'

import { AppModule } from './app/app.module';

const app = platformBrowserDynamic()

app.bootstrapModule(AppModule)
  .catch(err => console.error(err));
  