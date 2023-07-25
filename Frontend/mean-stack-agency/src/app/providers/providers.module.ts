import { NgModule } from "@angular/core";
import { ProvidersComponent } from "./providers.component";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { AddProvidersComponent } from './add-providers/add-providers.component';
import { EditProvidersComponent } from './edit-providers/edit-providers.component';
import { DeleteProvidersComponent } from './delete-providers/delete-providers.component';
import { DetailsProvidersComponent } from './details-providers/details-providers.component';

@NgModule({
    declarations: [ProvidersComponent, AddProvidersComponent, EditProvidersComponent, DeleteProvidersComponent, DetailsProvidersComponent],
    imports: [
        CommonModule, RouterModule, ReactiveFormsModule
    ],
    exports: [
        ProvidersComponent,ReactiveFormsModule, AddProvidersComponent, EditProvidersComponent, DeleteProvidersComponent, DetailsProvidersComponent
    ]
})
export class ProvidersModule { }