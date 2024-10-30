import { Component } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {environmentProd} from '../../../../../../environements/environment.prod';
import {NgClass, NgIf} from '@angular/common';
import {BaseService} from '../../../../../core/services/base-services/base.service';
import {HttpClientModule} from '@angular/common/http';

@Component({
  selector: 'app-form-teacher',
  standalone: true,
  imports: [
    HttpClientModule, // Importez HttpClientModule ici
    ReactiveFormsModule,
    NgIf,
    NgClass
  ],
  templateUrl: './form-teacher.component.html',
  styleUrl: './form-teacher.component.css'
})
export class FormTeacherComponent {

  teacherForm!: FormGroup;

  constructor(private baseService: BaseService) {}


  ngOnInit(): void {
    this.teacherForm = new FormGroup({
      prenom: new FormControl('', Validators.required),
      nom: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      dateNaissance: new FormControl('', Validators.required),
      telephone: new FormControl('', Validators.required),
      street: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      prochainCours: new FormControl(''),
      vacant: new FormControl('', Validators.required)
    });
  }

  isInvalidInput(input: AbstractControl): boolean {
    return input.invalid && (input.dirty || input.touched);
  }

  saveTeacher() {
      this.baseService.create(environmentProd.endPoint.teachers.create, {})
    }

}
