import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantPaymentsDialogComponent } from './tenant-payments-dialog.component';

describe('TenantPaymentsDialogComponent', () => {
  let component: TenantPaymentsDialogComponent;
  let fixture: ComponentFixture<TenantPaymentsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TenantPaymentsDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TenantPaymentsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
