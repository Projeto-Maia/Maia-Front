import { Routes } from '@angular/router';
import { HomePageComponent } from './features/home/home-page/home-page.component';
import { MapPageComponent } from './features/map/map-page/map-page.component';


export const routes: Routes = [
  { path: '', component: HomePageComponent, pathMatch: 'full' },
  { path: 'mapa', component: MapPageComponent },                      
  {
    path: 'quiz',
    loadChildren: () =>
      import('./features/quiz/quiz-routing.module').then((m) => m.quizRoutes),
  },
  { path: '**', redirectTo: '' },
];
