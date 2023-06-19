import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { DragComponent } from './drag.component';

@NgModule({ 
  declarations:[ DragComponent ],
  exports:[ DragComponent ],
  imports: [ CommonModule ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class DragModule {}
