import { User } from '@modules/auth/models/auth.model';
import { AuthService } from './../../services/auth.service';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';


@Component({
    selector: 'sb-register',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './register.component.html',
    styleUrls: ['register.component.scss'],
})
export class RegisterComponent implements OnInit {

    user2: User[] = []; 
    //user = new User();

    constructor(private regUser: AuthService) {}
    ngOnInit() {
        
    }

    refreshUser() {
        this.regUser.getUser()
          .subscribe(data => {
            console.log(data)
            this.user2=data;
          })      
     
      }

    // onClick() {
    //        this.regUser.addUser()
    //        .subscribe(data => {
    //         console.log(data)
    //         this.refreshUser();
    //       })      
    // }  
}
