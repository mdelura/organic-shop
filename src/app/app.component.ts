import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private auth: AuthService, router: Router, private route: ActivatedRoute, private userService: UserService) {
    auth.user$.subscribe(user => {
      if (user) {
        userService.save(user);

        const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
        router.navigateByUrl(returnUrl);
      }
    });
  }
}
