import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass, NgIf } from '@angular/common';
import { BaseService } from '../../../../../core/services/base-services/base.service';
import { environmentProd } from '../../../../../../environements/environment.prod';
import {ActivatedRoute, Router} from '@angular/router';
import {Teacher} from '../../../../../domain/models/Teacher.model';

@Component({
  selector: 'app-form-teacher',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgClass
  ],
  templateUrl: './form-teacher.component.html',
  styleUrls: ['./form-teacher.component.css']
})
export class FormTeacherComponent {
  teacherForm!: FormGroup;
  successMessage: string = '';
  teacherId: number | null = null;

  constructor(
    private baseService: BaseService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.teacherId = this.route.snapshot.paramMap.get('id') ? Number(this.route.snapshot.paramMap.get('id')) : null;

    this.teacherForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      dateOfBirth: new FormControl('', Validators.required),
      numbers: new FormControl('', [Validators.required, Validators.pattern(/^\d+$/)]),
      urlPicture: new FormControl('', [Validators.required, Validators.pattern(/(https?:\/\/.*\.(?:png|jpg|svg))/i)]),
      address: new FormGroup({
        country: new FormControl('', Validators.required),
        city: new FormControl('', Validators.required),
        street: new FormControl('', Validators.required)
      }),
      specialty: new FormControl('', Validators.required),
      available: new FormControl(false, Validators.required)
    });

    if (this.teacherId) {
      this.loadTeacherData(this.teacherId);
    }
  }

  loadTeacherData(id: number): void {
    this.baseService.getById(environmentProd.endPoint.teachers.getById, id).subscribe(
      (teacher: Teacher) => {
        this.teacherForm.patchValue(teacher);
      },
      error => {
        console.error('Erreur lors du chargement des données de l\'enseignant :', error);
      }
    );
  }

  isInvalidInput(input: AbstractControl | null): boolean {
    return input ? input.invalid && (input.dirty || input.touched) : false;
  }

  saveTeacher() {
    if (this.teacherForm.valid) {
      if (this.teacherId) {
        this.baseService.update(environmentProd.endPoint.teachers.update, this.teacherForm.value, this.teacherId).subscribe(
          response => {
            this.successMessage = 'Mise à jour réussie';

            setTimeout(() => {
              this.successMessage = '';
              this.router.navigate(['/teacher']);
            }, 3000);
          },
          error => {
            console.error('Erreur lors de la mise à jour :', error);
          }
        );
      } else {
        this.baseService.create(environmentProd.endPoint.teachers.create, this.teacherForm.value).subscribe(
          response => {
            this.successMessage = 'Enregistrement réussi';

            setTimeout(() => {
              this.successMessage = '';
              this.router.navigate(['/teacher']);
            }, 3000);
          },
          error => {
            console.error('Erreur lors de l\'enregistrement :', error);
          }
        );
      }
    } else {
      console.log("Formulaire invalide !");
    }
  }
}
