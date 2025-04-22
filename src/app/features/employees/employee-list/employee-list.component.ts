import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { Employee } from 'src/app/common/models/Employee.model';
import { DataService } from 'src/app/services/data.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
})
export class EmployeeListComponent implements OnInit {
  selectedEmployee: Employee | null = null;

  dataService = inject(DataService);
  employeeService = inject(EmployeeService);
  @Input() employees: any[] = [];

  constructor() { }

  ngOnInit(): void {
  } 

  select(empParam: any) {
    this.selectedEmployee = empParam;
    this.employeeService.changeSelectedEmployee(empParam);
  }

  getPositionName(positionId: string) {
    return this.dataService.getPositionName(positionId);
  }

  addEmployee() {
    this.selectedEmployee = null;
    this.employeeService.changeAddEmployee(true);    
  }
}
