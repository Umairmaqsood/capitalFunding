import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUsersComplaintsComponent } from './create-users-complaints.component';

describe('CreateUsersComplaintsComponent', () => {
  let component: CreateUsersComplaintsComponent;
  let fixture: ComponentFixture<CreateUsersComplaintsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateUsersComplaintsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateUsersComplaintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
