import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PageNotFoundComponentComponent } from "./shared/components/page-not-found-component/page-not-found-component.component";
import { NewsListComponent } from "./modules/news/pages/news-list/news-list.component";

const routes: Routes = [
  { path: "", redirectTo: "/news", pathMatch: "full" },
  { path: "notFound", component: PageNotFoundComponentComponent },
  { path: "**", component: PageNotFoundComponentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
