import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetUsersComplaintsComponent } from './get-users-complaints.component';

describe('GetUsersComplaintsComponent', () => {
  let component: GetUsersComplaintsComponent;
  let fixture: ComponentFixture<GetUsersComplaintsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetUsersComplaintsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GetUsersComplaintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
