import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule, Route } from "@angular/router";
import { BatchComponent } from "./batch.component";

const batchRoutes: Routes = [{path: '', component:BatchComponent}];
export const batchRouting: ModuleWithProviders<Route> = RouterModule.forChild(batchRoutes)