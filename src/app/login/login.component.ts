import { Component, OnInit } from '@angular/core';
import { ErrorCode } from '../model/enum/errorCode.enum';
import { Error } from '../model/error.model';
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
  public errorMessage: Error;
  public errorMessages: string[];
  public errorEnum = ErrorCode;

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
      },
      error=>{
        this.errorMessages = null;
        if(error.error.errorCode === undefined){
          this.errorHandel(error.error);
        }else{
          this.errorMessage = error.error;
        }
      }
    );
  }

  public reSendActivationEmail(){
    this.authService.reSendActivationEmail(this.loginRequest.username).subscribe(
      res=>{
        console.log("Sended");
      }
    );
  }

  private errorHandel(error: any){
    this.errorMessages = Object.values(error);
  }

}
