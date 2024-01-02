import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantsDetailsResidencyDialogComponent } from './tenants-details-residency-dialog.component';

describe('TenantsDetailsResidencyDialogComponent', () => {
  let component: TenantsDetailsResidencyDialogComponent;
  let fixture: ComponentFixture<TenantsDetailsResidencyDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TenantsDetailsResidencyDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TenantsDetailsResidencyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
