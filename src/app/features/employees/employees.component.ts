import { Component, inject, OnInit } from '@angular/core';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeCraftingComponent } from './employee-crafting/employee-crafting.component';
import { MatSidenavContainer } from '@angular/material/sidenav';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/common/models/Employee.model';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
})
export class EmployeesComponent implements OnInit {

  onEmployeeRemoved($event: any) {
    this.employeeService.removeEmployee($event);
    this.selectedEmployee = null; // Close the crafting component after removing
  }


  employeeService = inject(EmployeeService);
  selectedEmployee: Employee | null = null;
  employees: Employee[] = [];

  constructor() {
    this.employees = this.employeeService.employees;
  }

  ngOnInit(): void {
  }

  onEmployeeSelected(employee: Employee) {
    this.selectedEmployee = employee;
  }

  onEmployeeSaved(employee: Employee) {
    this.employeeService.updateEmployee(employee);
    this.selectedEmployee = null; // Close the crafting component after saving
  }

}
