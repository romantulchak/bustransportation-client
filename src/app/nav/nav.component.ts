import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { TokenStorageService } from '../service/token-storage.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  public showAuthLinks: boolean;
  constructor(private tokenStorageService: TokenStorageService, 
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.showAuthLinks = this.tokenStorageService.getUser();
    
  }

  public signOut(){
    this.tokenStorageService.signOut();
  }

  public login(){
    this.dialog.open(LoginComponent);
  }

  public registration(){
    this.dialog.open(RegisterComponent, {panelClass: 'registration__dialog'});
  }
}
