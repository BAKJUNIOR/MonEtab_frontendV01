import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {environmentProd} from '../../../../../../environements/environment.prod';
import {BaseService} from '../../../../../core/services/base-services/base.service';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import {Teacher} from '../../../../../domain/models/Teacher.model';

@Component({
  selector: 'app-teacher',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf,
    DatePipe,
    NgIf
  ],
  templateUrl: './teacher.component.html',
  styleUrl: './teacher.component.css'
})
export class TeacherComponent {
  teachers: Teacher[] = [];
  successMessage: string = '';

  constructor(
    private baseService: BaseService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadTeachers();
  }

  loadTeachers(): void {
    this.baseService.getAll(environmentProd.endPoint.teachers.getAll).subscribe(
      (response) => {
        this.teachers = response;
      },
      (error) => {
        console.error('Erreur lors de la récupération des enseignants :', error);
      }
    );
  }

  supprimerTeacher(teacher: Teacher) {
    if (!teacher.id_person) {
      return;
    }

    let conf = confirm("Êtes-vous sûr de vouloir supprimer cet enseignant ?");
    if (conf) {
      this.baseService.delete(environmentProd.endPoint.teachers.delete, teacher.id_person).subscribe({
        next: (response) => {
          console.log("Réponse du serveur :", response);
          this.successMessage = response;
          this.loadTeachers();

          setTimeout(() => {
            this.successMessage = '';
          }, 3000);
        },
        error: (error) => {
          console.error("Erreur lors de la suppression :", error);
        }
      });
    }
  }
  }
