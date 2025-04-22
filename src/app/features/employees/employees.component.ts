import { Component, inject, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/common/models/Employee.model';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
})
export class EmployeesComponent implements OnInit {

  employeeService = inject(EmployeeService);
  employees: Employee[] = [];

  constructor() {
  }

  ngOnInit(): void {
    this.employeeService.getEmployeesList().subscribe((employees) => {
      this.employees = employees;
    }
    );
  }


}
