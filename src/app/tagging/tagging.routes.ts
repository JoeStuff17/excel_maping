import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule, Route } from "@angular/router";
import { TaggingComponent } from "./tagging.component";

const taggingRoutes: Routes = [{path: '', component:TaggingComponent}];
export const taggingRouting: ModuleWithProviders<Route> = RouterModule.forChild(taggingRoutes)