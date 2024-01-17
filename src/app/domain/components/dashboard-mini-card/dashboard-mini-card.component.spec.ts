import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardMiniCardComponent } from './dashboard-mini-card.component';

describe('DashboardMiniCardComponent', () => {
  let component: DashboardMiniCardComponent;
  let fixture: ComponentFixture<DashboardMiniCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardMiniCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardMiniCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
