import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MaterialModule } from '../../material/src/public-api';
import { AsyncSpinnerComponent } from '../async-spinner/async-spinner.component';

@Component({
  selector: 'app-tenant-complaints',
  standalone: true,
  imports: [CommonModule, MaterialModule, AsyncSpinnerComponent],
  template: ` <p>tenant-complaints works!</p> `,
  styles: ``,
})
export class TenantComplaintsComponent {
  isAsyncCall = false;
}
