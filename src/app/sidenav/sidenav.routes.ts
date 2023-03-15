import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule, Route } from "@angular/router";
import { SidenavComponent } from "./sidenav.component";

const sidenavRoutes: Routes = [{path: '', component:SidenavComponent}];
export const sidenaveRouting: ModuleWithProviders<Route> = RouterModule.forChild(sidenavRoutes)