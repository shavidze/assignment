import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NewsListComponent } from "./pages/news-list/news-list.component";
import { NewsRoutesModule } from "./news-routes.module";
import { NewsTableComponent } from "./components/news-table/news-table.component";
import { EffectsModule } from "@ngrx/effects";
import { NewsEffects } from "./store/effects/news.effects";
import { StoreModule } from "@ngrx/store";
import { reducers } from "./store/reducers";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { AddNewsComponent } from "./pages/add-news/add-news-component";
import { NewsComponent } from "./pages/news/news.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    NewsListComponent,
    NewsTableComponent,
    AddNewsComponent,
    NewsComponent
  ],
  imports: [
    CommonModule,
    NewsRoutesModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature("news", reducers),
    EffectsModule.forFeature([NewsEffects]),
    FontAwesomeModule
  ],
  providers: []
})
export class NewsModule {}
