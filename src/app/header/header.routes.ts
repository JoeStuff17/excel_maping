import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule, Route } from "@angular/router";
import { HeaderComponent } from "./header.component";

const headerRoutes: Routes = [{path: '', component:HeaderComponent}];
export const headerRouting: ModuleWithProviders<Route> = RouterModule.forChild(headerRoutes)