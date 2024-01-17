import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardHeaderCardComponent } from './dashboard-header-card.component';

describe('DashboardHeaderCardComponent', () => {
  let component: DashboardHeaderCardComponent;
  let fixture: ComponentFixture<DashboardHeaderCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardHeaderCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardHeaderCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
