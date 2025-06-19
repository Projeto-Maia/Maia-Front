import { Routes } from '@angular/router';
import { QuizPageComponent } from './quiz-page/quiz-page.component';
import { ResultsPageComponent } from './results-page/results-page.component';
import { MapPageComponent } from '../map/map-page/map-page.component';
export const quizRoutes: Routes = [
  { path: '', component: QuizPageComponent },
  { path: 'resultado', component: ResultsPageComponent }, 
  { path: 'mapa', component: MapPageComponent },    
];
