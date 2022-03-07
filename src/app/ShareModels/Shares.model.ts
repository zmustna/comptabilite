import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PrimeuiModule } from "../primeui/primeui.module";
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
@NgModule({
    declarations: [],
    imports: [PrimeuiModule, CommonModule, PrimeuiModule,  ReactiveFormsModule, FormsModule, MatCardModule, MatInputModule],
    exports: [PrimeuiModule, CommonModule, FormsModule, ReactiveFormsModule, PrimeuiModule, MatCardModule, MatInputModule]
})
export class SharesModule { }
