import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CommonModule } from "@angular/common";

// ===== Components =====
import { RouterModule } from "@angular/router";
import { HeaderComponent } from "./components/header/header.component";

@NgModule({
  imports: [BrowserAnimationsModule, CommonModule, RouterModule],
  exports: [BrowserAnimationsModule, RouterModule, HeaderComponent],
  declarations: [HeaderComponent]
})
export class SharedModule {}
