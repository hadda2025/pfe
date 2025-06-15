// angular import
import { Component } from '@angular/core';
import { CardComponent } from 'src/app/theme/shared/components/card/card.component';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [SharedModule,CardComponent],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export default class ButtonComponent {}
