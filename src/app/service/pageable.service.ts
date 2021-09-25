import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { PagableDTO } from "../dto/pageable.dto";

@Injectable({
    providedIn: 'root'
})
export class PageableService{

    public pageableModel: BehaviorSubject<PagableDTO<any>> = new BehaviorSubject(null); 

    constructor(){

    }

}