import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableTrainingTermsDialogComponent } from './available-training-terms-dialog.component';

describe('AvailableTrainingTermsDialogComponent', () => {
  let component: AvailableTrainingTermsDialogComponent;
  let fixture: ComponentFixture<AvailableTrainingTermsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvailableTrainingTermsDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AvailableTrainingTermsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
