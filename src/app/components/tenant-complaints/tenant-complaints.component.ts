import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MaterialModule } from '../../material/src/public-api';

@Component({
  selector: 'app-tenant-complaints',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  template: ` <p>tenant-complaints works!</p> `,
  styles: ``,
})
export class TenantComplaintsComponent {}
