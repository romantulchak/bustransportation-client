import { Component, OnInit } from '@angular/core';
import { RegistrationRequest } from '../request/registration.request';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public registrationRequest: RegistrationRequest = new RegistrationRequest();

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  public registration(){
    this.authService.register(this.registrationRequest).subscribe(
      res=>{
        console.log("Ok");
      }
    );
  }
}
