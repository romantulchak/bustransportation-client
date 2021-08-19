import { Component, OnInit } from '@angular/core';
import { BookingService } from '../service/booking.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit {

  constructor(private bookingService: BookingService) { }

  ngOnInit(): void {
    this.getUserTickets();
  }

  private getUserTickets(){
    this.bookingService.getUserTickets().subscribe(
      res=>{
        console.log(res);
        
      }
    );
  }

}
