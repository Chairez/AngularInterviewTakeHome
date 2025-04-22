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
  @Output() savedEmployee = new EventEmitter<any>();
  @Output() removedEmployee = new EventEmitter<any>();
  employeeForm: FormGroup;
  positions: any;
  states: any;

  constructor(private fb: FormBuilder) {
    this.employeeForm = this.fb.group({
      employeeId: [null], // Optional
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      positionId: ['', Validators.required],
      phoneNumber: ['',
        [
          Validators.required,
          Validators.pattern(/^\d{10}$/) // Format: 1234567890
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
    // subscribe to employeeBoolean
    this.employeeService.getEmployeeChangeObservable().subscribe((value: Boolean) => {
      if (value) {
        this.employeeForm.reset();
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
    const updatedEmployee = this.employeeForm.value;
    this.savedEmployee.emit(updatedEmployee);
    this.employeeService.addEmployeeChangeObservable(true);
  }

  remove() {
    if (this.employee !== null) {
      this.removedEmployee.emit(this.employee);
      this.employeeForm.reset();
    }
  }
}
