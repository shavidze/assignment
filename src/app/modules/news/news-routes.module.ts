import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { NewsListComponent } from "./pages/news-list/news-list.component";
import { AddNewsComponent } from "./pages/add-news/add-news-component";
import { NewsComponent } from "./pages/news/news.component";

const routes: Routes = [
  {
    path: "news",
    component: NewsComponent,
    children: [
      {
        path: "",
        component: NewsListComponent
      },
      {
        path: "add",
        component: AddNewsComponent
      },
      {
        path: "edit/:id",
        component: AddNewsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsRoutesModule {}
