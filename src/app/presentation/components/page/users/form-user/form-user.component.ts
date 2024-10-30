import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { BaseService } from '../../../../../core/services/base-services/base.service';
import { environmentProd } from '../../../../../../environements/environment.prod';
import { NgClass, NgIf } from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-form-user',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgClass,
    RouterLink
  ],
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.css']
})
export class FormUserComponent implements OnInit {

  userForm!: FormGroup;

  constructor(private baseService: BaseService) {}

  ngOnInit(): void {
    this.userForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      role: new FormControl('', Validators.required)
    });
  }


  isInvalidInput(input: AbstractControl): boolean {
    return input.invalid && (input.dirty || input.touched);
  }

  saveUser() {
      this.baseService.create(environmentProd.endPoint.users.create, this.userForm.value)

  }
}
