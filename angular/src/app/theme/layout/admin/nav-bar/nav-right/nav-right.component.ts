// angular import
import { Component, OnInit } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';

// bootstrap import
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ChatUserListComponent } from './chat-user-list/chat-user-list.component';
import { ChatMsgComponent } from './chat-msg/chat-msg.component';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav-right',
  imports: [SharedModule, ChatUserListComponent, RouterLink],
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss'],
  providers: [NgbDropdownConfig],
  animations: [
    trigger('slideInOutLeft', [
      transition(':enter', [style({ transform: 'translateX(100%)' }), animate('300ms ease-in', style({ transform: 'translateX(0%)' }))]),
      transition(':leave', [animate('300ms ease-in', style({ transform: 'translateX(100%)' }))])
    ]),
    trigger('slideInOutRight', [
      transition(':enter', [style({ transform: 'translateX(-100%)' }), animate('300ms ease-in', style({ transform: 'translateX(0%)' }))]),
      transition(':leave', [animate('300ms ease-in', style({ transform: 'translateX(-100%)' }))])
    ])
  ]
})
export  class NavRightComponent implements OnInit {
  userConnected = false;
  // public props
  visibleUserList: boolean;
  chatMessage: boolean;
  friendId!: number;


  // constructor
  constructor( private router:Router) {
    this.visibleUserList = false;
    this.chatMessage = false;
   
  }
  ngOnInit(): void {
  
      const user = localStorage.getItem('user');
  this.userConnected = !!user;
  }
onLogin() {
  this.router.navigate(['/auth/signin']); // ou tout autre logique de connexion
    this.userConnected = true;
  
}
  // public method
  // eslint-disable-next-line
  onChatToggle(friendID: any) {
    this.friendId = friendID;
    this.chatMessage = !this.chatMessage;
  }
  logout(){ 
    localStorage.removeItem('user'),
      this.router.navigate(['/auth/signin']); // ou tout autre logique de connexion
    console.log('logout')
 
  this.userConnected = false;

  }
 
}
