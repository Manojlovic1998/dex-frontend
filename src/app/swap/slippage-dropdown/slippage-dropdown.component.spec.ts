import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlippageDropdownComponent } from './slippage-dropdown.component';

describe('SlippageDropdownComponent', () => {
  let component: SlippageDropdownComponent;
  let fixture: ComponentFixture<SlippageDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SlippageDropdownComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SlippageDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
