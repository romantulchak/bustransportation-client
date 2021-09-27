import { Injectable } from "@angular/core";
import { ActivationEnd, NavigationEnd, Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { filter } from "rxjs/operators";
import { Breadcrumb } from "../model/breadcrumb.model";

@Injectable({
    providedIn:'root'
})
export class BreadcrumbService{
    
    public breadcrumbs: BehaviorSubject<Breadcrumb[]> = new BehaviorSubject(null);

    private events: ActivationEnd[] = [];
  
    constructor(private router: Router) { 
       this.router.events.subscribe(
            event => {
              if (event instanceof ActivationEnd) {
                    this.events.unshift(event);
                    this.initRoutes();
              }
              if(event instanceof NavigationEnd){
                  this.events = [];
              } 
            }
          );
    }
  
     private initRoutes(): void{
        let breadcrumbs: Breadcrumb[] = [];
        this.events.forEach((event, index) => {
            this.addBreadcrumb(event, index, breadcrumbs);
        });
        this.breadcrumbs.next(breadcrumbs);
     }
   
     private addBreadcrumb(event: ActivationEnd, index:number, breadcrumbs: Breadcrumb[]): void {
       if(event.snapshot.data.breadcrumb){
        let previousEvents = this.events.map(x=> x.snapshot.routeConfig.path).slice(0, index);
        let breadcrumb = new Breadcrumb(event.snapshot.data.breadcrumb, this.getUrl(event, previousEvents));
        breadcrumbs.push(breadcrumb);
       }
    }
  
    private getUrl(event: ActivationEnd, previousEvents: string[]):string{
      previousEvents.push(event.snapshot.routeConfig.path);
      return previousEvents.join("/");
    }
}