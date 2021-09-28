import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { PageableDTO } from "../dto/pageable.dto";
import { TripStatisticDeletedDTO } from "../dto/tripStatisticDeleted.dto";
import { CityStop } from "../model/cityStop.model";

const API_URL = environment.API_URL;

@Injectable({
    providedIn:'root'
})
export class TripStatisticDeletedService{

    constructor(private http: HttpClient){}

    public getFullStatisticsForUser(page: number, size: number): Observable<PageableDTO<TripStatisticDeletedDTO>>{
        let params = new HttpParams();
        params = params.append("page", page.toString())
                        .append("size", size.toString());
        return this.http.get<PageableDTO<TripStatisticDeletedDTO>>(`${API_URL}trip-deleted-statistic/get-statistics`, {params: params});
    }

    public getStatisticsDetails(id: number):Observable<CityStop[]>{
        return this.http.get<CityStop[]>(`${API_URL}trip-deleted-statistic/get-statistics-details/${id}`);
    }

}