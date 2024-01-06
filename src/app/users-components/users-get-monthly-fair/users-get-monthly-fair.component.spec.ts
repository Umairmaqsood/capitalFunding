import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersGetMonthlyFairComponent } from './users-get-monthly-fair.component';

describe('UsersGetMonthlyFairComponent', () => {
  let component: UsersGetMonthlyFairComponent;
  let fixture: ComponentFixture<UsersGetMonthlyFairComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersGetMonthlyFairComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsersGetMonthlyFairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
