import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../service/token-storage.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  public showAuthLinks: boolean;
  constructor(private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.showAuthLinks = this.tokenStorageService.getUser();
    
  }

  public signOut(){
    this.tokenStorageService.signOut();
  }
}
