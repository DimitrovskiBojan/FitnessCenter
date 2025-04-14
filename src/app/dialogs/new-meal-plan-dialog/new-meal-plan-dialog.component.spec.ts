import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMealPlanDialogComponent } from './new-meal-plan-dialog.component';

describe('NewMealPlanDialogComponent', () => {
  let component: NewMealPlanDialogComponent;
  let fixture: ComponentFixture<NewMealPlanDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewMealPlanDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewMealPlanDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
