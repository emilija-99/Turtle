import { Routes } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { HabitsComponent } from './pages/habits/habits.component';

export const routes: Routes = [
    { path: '', redirectTo: '/habits', pathMatch: 'full' },
    { path: 'habits', component: HabitsComponent },
];
