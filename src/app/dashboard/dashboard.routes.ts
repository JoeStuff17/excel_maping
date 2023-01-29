import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule, Route } from "@angular/router";
import { DashboardComponent } from "./dashboard.component";

const dashboardRoutes: Routes = [{path: '', component:DashboardComponent}];
export const dashboardRouting: ModuleWithProviders<Route> = RouterModule.forChild(dashboardRoutes)