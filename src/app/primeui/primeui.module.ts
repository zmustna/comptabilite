import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DialogModule } from "primeng/dialog";
import { TableModule } from "primeng/table";
import { DropdownModule } from "primeng/dropdown";
import { CalendarModule } from "primeng/calendar";
import { PanelModule } from "primeng/panel";
import { FileUploadModule } from "primeng/fileupload";
import { ProgressSpinnerModule} from "primeng/progressspinner";
import { ListboxModule } from "primeng/listbox";
import { DragDropModule } from "primeng/dragdrop";
import { SplitButtonModule } from "primeng/splitbutton";
import { ChartModule } from "primeng/chart";
import { TieredMenuModule } from "primeng/tieredmenu";
import { MenuModule } from "primeng/menu";
import { CheckboxModule } from "primeng/checkbox";
import { TabViewModule } from "primeng/tabview";
import { PaginatorModule } from "primeng/paginator";
import { ToastModule } from "primeng/toast";
import { MessageService } from 'primeng/api';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputTextModule } from 'primeng/inputtext';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ButtonModule } from "primeng/button";
import {MatMenuModule} from '@angular/material/menu';
import {SidebarModule} from 'primeng/sidebar';
import 'chart.js/dist/Chart.min.js';
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from '@angular/material/form-field';
@NgModule({
  declarations: [],
  imports: [
      CommonModule, InputTextModule, InputSwitchModule,ButtonModule,
    DialogModule,MatInputModule,MatFormFieldModule,
    TableModule,SidebarModule,
    DropdownModule,MatMenuModule,
    CalendarModule,
      PanelModule, ToastModule, RadioButtonModule,
    FileUploadModule, ListboxModule, ProgressSpinnerModule, DragDropModule,
    PanelModule,  SplitButtonModule, CommonModule,  DropdownModule, TableModule,
    PaginatorModule,  DialogModule, CalendarModule, ChartModule, TieredMenuModule, MenuModule, CheckboxModule, TabViewModule
  ],
  exports: [
      DialogModule, ToastModule, InputTextModule, InputSwitchModule,ButtonModule,
     TableModule,SidebarModule,MatInputModule,MatFormFieldModule,
    DropdownModule,
    CalendarModule,MatMenuModule,
      PanelModule, RadioButtonModule,
    FileUploadModule, ListboxModule, ProgressSpinnerModule, DragDropModule,
    PanelModule,  SplitButtonModule, CommonModule,  DropdownModule, TableModule,
    PaginatorModule,  DialogModule, CalendarModule, ChartModule, TieredMenuModule, MenuModule, CheckboxModule, TabViewModule
  ],
  providers: [MessageService],
})
export class PrimeuiModule {}
