import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersGetPaymentHistoryComponent } from './users-get-payment-history.component';

describe('UsersGetPaymentHistoryComponent', () => {
  let component: UsersGetPaymentHistoryComponent;
  let fixture: ComponentFixture<UsersGetPaymentHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersGetPaymentHistoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsersGetPaymentHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
