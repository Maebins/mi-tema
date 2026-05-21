import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ThemeWidgetComponent } from '../common/theme/theme-widget.component';

@Component({
  selector: 'app-layout-empty',
  imports: [RouterModule, ThemeWidgetComponent],
  templateUrl: './layout-empty.component.html',
  styleUrl: './layout-empty.component.scss',
})
export class LayoutEmptyComponent {

}
