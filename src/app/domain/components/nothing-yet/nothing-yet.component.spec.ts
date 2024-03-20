import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NothingYetComponent } from './nothing-yet.component';

describe('NothingYetComponent', () => {
  let component: NothingYetComponent;
  let fixture: ComponentFixture<NothingYetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NothingYetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NothingYetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
