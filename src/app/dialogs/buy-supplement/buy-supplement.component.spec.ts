import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuySupplementComponent } from './buy-supplement.component';

describe('BuySupplementComponent', () => {
  let component: BuySupplementComponent;
  let fixture: ComponentFixture<BuySupplementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuySupplementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BuySupplementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
