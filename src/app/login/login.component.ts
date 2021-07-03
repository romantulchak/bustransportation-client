import { Component, OnInit } from '@angular/core';
import { LoginRequest } from '../request/login.request';
import { AuthService } from '../service/auth.service';
import { TokenStorageService } from '../service/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginRequest: LoginRequest = new LoginRequest();

  constructor(private authService: AuthService,
              private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
  }

  public login(){
    this.authService.login(this.loginRequest).subscribe(
      res=>{
        this.tokenStorageService.saveToken(res.token);
        this.tokenStorageService.saveUser(res);
        window.location.href = "/";
      }
    );
  }

}
