import {PageNotFoundComponentComponent} from './shared/components/page-not-found-component/page-not-found-component.component';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {NewsModule} from './modules/news/news.module';
import {CoreModule} from './core/core.module';
import {SharedModule} from './shared/shared.module';
import {reducers} from './reducers';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponentComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([]),
    CoreModule,
    NewsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
