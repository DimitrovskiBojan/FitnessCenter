import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealPlanBuyConfirmationComponent } from './meal-plan-buy-confirmation.component';

describe('MealPlanBuyConfirmationComponent', () => {
  let component: MealPlanBuyConfirmationComponent;
  let fixture: ComponentFixture<MealPlanBuyConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MealPlanBuyConfirmationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MealPlanBuyConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
