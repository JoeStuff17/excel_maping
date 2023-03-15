import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule, Route } from "@angular/router";
import { BatchdetailsComponent } from "./batchdetails.component";

const batchdetailsRoutes: Routes = [{path: '', component:BatchdetailsComponent}];
export const batchdetailsRouting: ModuleWithProviders<Route> = RouterModule.forChild(batchdetailsRoutes)