import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantsComplaintsDialogComponent } from './tenants-complaints-dialog.component';

describe('TenantsComplaintsDialogComponent', () => {
  let component: TenantsComplaintsDialogComponent;
  let fixture: ComponentFixture<TenantsComplaintsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TenantsComplaintsDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TenantsComplaintsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
