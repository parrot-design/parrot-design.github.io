import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';
import { DragModule } from './drag.module';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
