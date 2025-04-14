import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTermDialogComponent } from './new-term-dialog.component';

describe('NewTermDialogComponent', () => {
  let component: NewTermDialogComponent;
  let fixture: ComponentFixture<NewTermDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewTermDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewTermDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
