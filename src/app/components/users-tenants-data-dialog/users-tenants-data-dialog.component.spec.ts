import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersTenantsDataDialogComponent } from './users-tenants-data-dialog.component';

describe('UsersTenantsDataDialogComponent', () => {
  let component: UsersTenantsDataDialogComponent;
  let fixture: ComponentFixture<UsersTenantsDataDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersTenantsDataDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsersTenantsDataDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
