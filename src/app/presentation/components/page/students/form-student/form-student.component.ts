import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BaseService } from '../../../../../core/services/base-services/base.service';
import { environmentProd } from '../../../../../../environements/environment.prod';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-form-student',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgClass
  ],
  templateUrl: './form-student.component.html',
  styleUrls: ['./form-student.component.css']
})
export class FormStudentComponent implements OnInit {

  studentForm!: FormGroup;

  constructor(private baseService: BaseService) {}

  ngOnInit(): void {
    this.studentForm = new FormGroup({
      prenom: new FormControl('', Validators.required),
      nom: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      dateNaissance: new FormControl('', Validators.required),
      telephone: new FormControl('', Validators.required),
      street: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      matricule: new FormControl('', Validators.required),
      telephoneParent: new FormControl('', Validators.required)
    });
  }

  isInvalidInput(input: AbstractControl): boolean {
    return input.invalid && (input.dirty || input.touched);
  }

  saveStudent() :void {
    console.log(this.studentForm.value)
    // this.baseService.create(environmentProd.endPoint.students.create, this.studentForm.value)
  }
}
