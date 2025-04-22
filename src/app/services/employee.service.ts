import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Employee } from '../common/models/Employee.model';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {


  employees = [
    {
      employeeId: 1,
      firstName: "Jerry",
      lastName: "Wright",
      email: "jw@dvnext.com",
      positionId: "1",
      phoneNumber: "770-543-2333",
      jobRequirements: "Design things",
      address1: "324 Wyles Rd.",
      city: 'Atlanta',
      state: 'GA',
      zip: '30314'
    },
    {
      employeeId: 2,
      firstName: "Amy",
      lastName: "Jones",
      email: "aj@dvnext.com",
      positionId: "4",
      phoneNumber: "770-983-1462",
      jobRequirements: "Manage things",
      address1: "6555 Lincoln Rd.",
      city: 'Atlanta',
      state: 'GA',
      zip: '30303'
    },
    {
      employeeId: 3,
      firstName: "James",
      lastName: "Smith",
      email: "js@dvnext.com",
      positionId: "2",
      phoneNumber: "404-524-1122",
      jobRequirements: "Talk about things",
      address1: "623 Washington Dr.",
      city: 'Atlanta',
      state: 'GA',
      zip: '30317'
    },
    {
      employeeId: 4,
      firstName: "Shannon",
      lastName: "Phillips",
      email: "sp@dvnext.com",
      positionId: "3",
      phoneNumber: "678-231-9924",
      jobRequirements: "Break things",
      address1: "1112 Wade Rd.",
      city: 'Atlanta',
      state: 'GA',
      zip: '30314'
    },
  ];

  private addNewEmployee$ = new BehaviorSubject<Boolean>(false);
  private currentEmployee$ = new BehaviorSubject<any>(null);
  private employees$ = new BehaviorSubject<any[]>(this.employees);

  changeAddEmployee(value: Boolean) {
    this.addNewEmployee$.next(value);
  }

  getAddEmployeeObservable() {
    return this.addNewEmployee$.asObservable();
  }

  getEmployeesList() {
    return this.employees$.asObservable();
  }

  updateList() {
    this.employees$.next(this.employees);
  }

  changeSelectedEmployee(employee: any) {
    if (employee) {
      employee.positionId = Number(employee.positionId);
      this.currentEmployee$.next(employee);
    }
  }

  getCurrentEmployee() {
    return this.currentEmployee$.asObservable();
  }

  removeEmployee($event: any) {
    const index = this.employees.findIndex(emp => emp.employeeId === $event.employeeId);
    if (index !== -1) {
      this.employees.splice(index, 1);
    }
    this.updateList();
  }

  updateEmployee(updatedEmployee: any) {
    const index = this.employees.findIndex(emp => emp.employeeId === updatedEmployee.employeeId);
    if (index !== -1) {
      this.employees[index] = updatedEmployee;
    }
    else {
      this.employees.push(updatedEmployee);
    }

    this.updateList();
  }

  constructor() { }

}
