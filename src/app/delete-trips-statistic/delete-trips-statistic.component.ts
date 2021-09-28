import { Component, OnInit } from '@angular/core';
import { TripStatisticDeletedDTO } from '../dto/tripStatisticDeleted.dto';
import { CityStop } from '../model/cityStop.model';
import { PageableService } from '../service/pageable.service';
import { TripStatisticDeletedService } from '../service/tripStatisticDeleted.service';

@Component({
  selector: 'app-delete-trips-statistic',
  templateUrl: './delete-trips-statistic.component.html',
  styleUrls: ['./delete-trips-statistic.component.scss']
})
export class DeleteTripsStatisticComponent implements OnInit {

  public deletedTrips: TripStatisticDeletedDTO[];
  public stops: CityStop[];
  public currentDeleteTrip: number;

  private currentPage: number = 1;

  constructor(private tripStatisticDeletedService: TripStatisticDeletedService,
              private pageableService: PageableService) { }

  ngOnInit(): void {
    this.getFullStatistics(this.currentPage);
  }

  public getFullStatistics(page: number){
    this.tripStatisticDeletedService.getFullStatisticsForUser(page, 5).subscribe(
      res=>{
        this.deletedTrips = res.model;
        this.pageableService.pageableModel.next(res);
      }
    );
  }

  public showAditionalInformation(id: number){
    this.tripStatisticDeletedService.getStatisticsDetails(id).subscribe(
      res=>{
        this.currentDeleteTrip = id;
        this.stops = res;
      }
    );
  }

}
