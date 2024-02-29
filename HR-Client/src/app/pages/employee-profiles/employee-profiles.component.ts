import { Component, OnInit } from '@angular/core';

const TEST_SUMMARY = {
  firstName: 'Alice',
  middleName: 'B',
  lastName: 'Cooper',
  SSN: '123-45-6789',
  workAuthTitle: 'OPT',
  phoneNumber: '123-456-7893',
  email: 'user1@mail.com',
};
interface ProfileSummary {
  firstName: string;
  middleName: string;
  lastName: string;
  SSN: string;
  workAuthTitle: string;
  phoneNumber: string;
  email: string;
}

@Component({
  selector: 'app-employee-profiles',
  templateUrl: './employee-profiles.component.html',
  styleUrls: ['./employee-profiles.component.css'],
})
export class EmployeeProfilesComponent implements OnInit {
  profileSummaries: ProfileSummary[] = [TEST_SUMMARY];

  constructor() {}

  ngOnInit(): void {}
}
