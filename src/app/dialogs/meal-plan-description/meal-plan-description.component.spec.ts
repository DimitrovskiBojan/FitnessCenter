import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealPlanDescriptionComponent } from './meal-plan-description.component';

describe('MealPlanDescriptionComponent', () => {
  let component: MealPlanDescriptionComponent;
  let fixture: ComponentFixture<MealPlanDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MealPlanDescriptionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MealPlanDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
