import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { User } from '@modules/auth/models/auth.model';
import { AuthService } from './../../services/auth.service';


@Component({
    selector: 'sb-register',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './register.component.html',
    styleUrls: ['register.component.scss'],
})
export class RegisterComponent implements OnInit {

    user2: User[] = [];
    // user = new User();

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
    //         console.log(data)
    //         this.refreshUser();
    //       }

}
