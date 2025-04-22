import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeCraftingComponent } from './employee-crafting.component';

describe('EmployeeCraftingComponent', () => {
  let component: EmployeeCraftingComponent;
  let fixture: ComponentFixture<EmployeeCraftingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeCraftingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeCraftingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
