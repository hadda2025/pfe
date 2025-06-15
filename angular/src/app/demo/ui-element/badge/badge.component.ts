// angular import
import { Component } from '@angular/core';
import { CardComponent } from 'src/app/theme/shared/components/card/card.component';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [SharedModule,CardComponent],
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss']
})
export default class BadgeComponent {}
