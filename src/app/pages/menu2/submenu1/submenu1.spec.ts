import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Submenu1 } from './submenu1';

describe('Submenu1', () => {
  let component: Submenu1;
  let fixture: ComponentFixture<Submenu1>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Submenu1]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Submenu1);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
