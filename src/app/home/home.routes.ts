import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule, Route } from "@angular/router";
import { HomeComponent } from "./home.component";

const homeRoutes: Routes = [{path: '', component:HomeComponent}];
export const homeRouting: ModuleWithProviders<Route> = RouterModule.forChild(homeRoutes)