import { loadRemoteModule } from '@angular-architects/module-federation';
import {
  startsWith,
  WebComponentWrapper,
  WebComponentWrapperOptions,
} from '@angular-architects/module-federation-tools';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorHandlingGuard } from './core/guards/error-handling-remote.guard';
import { ErrorPageComponent } from './components/error-page/error-page.component';

const APP_ROUTES: Routes = [
  {
    path: 'mfe1-angular',
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4201/remoteEntry.js',
        exposedModule: './Module',
      })
        .then((m) => m.RemoteEntryModule)
        .catch((error) => {
          console.error('Erro ao carregar mfe1-angular:', error);
          return import('./components/error-page/error.module').then(
            (m) => m.ErrorModule
          );
        }),
  },
  {
    path: 'mfe2-angular13',
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4202/remoteEntry.js',
        exposedModule: './Module',
      })
        .then((m) => m.RemoteEntryModule)
        .catch((error) => {
          console.error('Erro ao carregar mfe1-angular:', error);
          return import('./components/error-page/error.module').then(
            (m) => m.ErrorModule
          );
        }),
  },
  {
    matcher: startsWith('mfe3-react'),
    component: WebComponentWrapper,
    data: {
      remoteEntry: 'http://localhost:4203/remoteEntry.js',
      remoteName: 'mfe3_react',
      exposedModule: './App',
      elementName: 'mfe3_react-element',
    } as WebComponentWrapperOptions,
    canActivate: [ErrorHandlingGuard],
    children: [
      {
        path: '**',
        component: WebComponentWrapper,
      },
    ],
  },
  {
    matcher: startsWith('mfe4-vue'),
    component: WebComponentWrapper,
    data: {
      remoteEntry: 'http://localhost:4204/remoteEntry.js',
      remoteName: 'mfe4_vue',
      exposedModule: './App',
      elementName: 'mfe4_vue-element',
    } as WebComponentWrapperOptions,
    canActivate: [ErrorHandlingGuard],
    children: [
      {
        path: '**',
        component: WebComponentWrapper,
      },
    ],
  },
  {
    path: 'error',
    component: ErrorPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
