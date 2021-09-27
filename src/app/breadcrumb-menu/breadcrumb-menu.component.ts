import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Breadcrumb } from '../model/breadcrumb.model';
import { BreadcrumbService } from '../service/breadcrumb.service';

@Component({
  selector: 'app-breadcrumb-menu',
  templateUrl: './breadcrumb-menu.component.html',
  styleUrls: ['./breadcrumb-menu.component.scss']
})
export class BreadcrumbMenuComponent implements OnInit {
  public breadcrumbs: Breadcrumb[] = [];

  constructor(private breadcrumbService: BreadcrumbService){}

  ngOnInit(){
    this.breadcrumbService.breadcrumbs.subscribe(
      res=>{
        this.breadcrumbs = res;       
      }
    );
  }
}
