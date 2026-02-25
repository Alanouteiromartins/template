import { Routes } from '@angular/router';
import { Menu1 } from './pages/menu1/menu1';
import { Menu2 } from './pages/menu2/menu2';
import { Submenu1 } from './pages/menu2/submenu1/submenu1';
import { authGuard } from './guards/auth.guard';
import { Login } from './pages/login/login';
import { Profile } from './pages/profile/profile';
import { Configuration } from './pages/configuration/configuration';

export const routes: Routes = [
    { path: '', redirectTo: 'menu1', pathMatch: 'full' },
    { path: 'login', component: Login, title: 'Login' },
    { path: 'menu1', component: Menu1, title: 'Menu 1', canActivate: [authGuard] },
    {
        path: 'menu2', component: Menu2, title: 'Menu 2', canActivate: [authGuard], children: [
            { path: 'submenu1', component: Submenu1, title: 'Submenu 1', data: {breadcrumb: 'submenu1'} }
        ], data: {breadcrumb: 'menu2'}
    },
    { path: 'perfil', component: Profile, title: 'Perfil', canActivate: [authGuard], data: {breadcrumb: 'perfil'} },
    { path: 'config', component: Configuration, title: 'Configurações', canActivate: [authGuard], data: {breadcrumb: 'configurações'} },
    { path: '**', redirectTo: 'menu1' }
];
