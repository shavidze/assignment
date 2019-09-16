import {NgModule, Optional, SkipSelf} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

// ===== Services =====
import {httpInterceptorProviders} from './interceptors';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule
  ],
  declarations: [],
  exports: [
    HttpClientModule
  ],
  providers: [
    httpInterceptorProviders
  ]
})

export class CoreModule {
}
