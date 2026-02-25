import { Component } from '@angular/core';
import { Breadcrumb } from "../../components/breadcrumb/breadcrumb";
import { TabsModule } from 'primeng/tabs';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-configuration',
  imports: [Breadcrumb, TabsModule, ButtonModule],
  templateUrl: './configuration.html',
  styleUrl: './configuration.scss',
})
export class Configuration {

}
