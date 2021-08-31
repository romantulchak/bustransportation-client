import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../service/auth.service';
@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.scss']
})
export class ActivateAccountComponent implements OnInit {

  public isActivated = false;

  constructor(private route: ActivatedRoute,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params=>{
      const token = params['token'];
      if(token){
        this.activateAccount(token);
      }
    });
  }

  private activateAccount(token: string){
    this.authService.activateAccount(token).subscribe(
      res=>{
          this.isActivated = res;
      }
    );
  }

}
