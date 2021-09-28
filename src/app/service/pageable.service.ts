import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { PageableDTO } from "../dto/pageable.dto";

@Injectable({
    providedIn: 'root'
})
export class PageableService{

    public pageableModel: BehaviorSubject<PageableDTO<any>> = new BehaviorSubject(null); 

    constructor(){

    }

}