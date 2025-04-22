import { Component, EventEmitter, inject, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-crafting',
  templateUrl: './employee-crafting.component.html',
  styleUrls: ['./employee-crafting.component.scss'],
})
export class EmployeeCraftingComponent implements OnInit {

  dataService = inject(DataService);
  employeeService = inject(EmployeeService);
  @Input() employee: any;

  employeeForm: FormGroup;
  positions: any;
  states: any;

  constructor(private fb: FormBuilder) {
    this.employeeForm = this.fb.group({
      employeeId: [null], // Optional
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      positionId: [0, Validators.required],
      phoneNumber: ['',
        [
          Validators.required,
          Validators.pattern(/^\d{3}-\d{3}-\d{4}$/) // Format: 123-456-7890
        ]
      ],
      jobRequirements: [''],
      address1: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['',
        [
          Validators.required,
          Validators.pattern(/^\d{5}$/) // 5-digit zip
        ]
      ]
    });

    this.positions = this.dataService.getPositions();
    this.states = this.dataService.getStates();
  }

  ngOnInit(): void {

    this.employeeService.getAddEmployeeObservable().subscribe((value: Boolean) => {
      if (value) {
        this.employeeForm.reset();
      }
    }
    );

    this.employeeService.getCurrentEmployee().subscribe((employee: any) => {
      if (employee) {
        this.employeeForm.patchValue(employee);
        this.employee = employee;
      }
    }
    );
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['employee'] && this.employee) {
      this.employeeForm.patchValue(this.employee);
    }
  }

  save() {
    if (this.employeeForm.invalid) {
      return;
    }

    this.employeeService.updateEmployee(this.employeeForm.value);
    this.cleanForm();
  }


  remove() {
    if (this.employee != null) {
      this.employeeService.removeEmployee(this.employee);
      this.cleanForm();
    }
  }

  private cleanForm() {
    this.employeeForm.reset();
    this.employeeService.changeAddEmployee(false);
    this.employeeService.changeSelectedEmployee(null);
    this.employee = null;
  }
}
