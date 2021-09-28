import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PageableDTO } from '../dto/pageable.dto';
import { Pagination } from '../model/pagination.model';
import { PageableService } from '../service/pageable.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Output("changePage") changePageEvent: EventEmitter<number> = new EventEmitter();

  public pageable: PageableDTO<any>;
  public isShowLastPage: boolean = true;
  public isShowFirstPage: boolean = true;
  public pager: Pagination;

  private maxPages: number = 4;

  constructor(private pageableService: PageableService) { }

  ngOnInit(): void {
    this.getPageableModel();
  }

  private getPageableModel(){
    this.pageableService.pageableModel.subscribe(
      res=>{
        if(res != null && this.pageable == null){;
          this.pageable = res;
         this.setPage(res.currentPage);
        }
      }
    );
  }


  public setPage(currenPage: number){
    this.pager = this.paginate(currenPage);
    this.changePageEvent.emit(currenPage);
    
  }


  private paginate(currentPage: number): Pagination{
    let totalPages = this.pageable.totalPages;
  if (currentPage < 1) { 
    currentPage = 1; 
  } else if (currentPage > totalPages) { 
    currentPage = totalPages; 
  }

  let startPage: number;
  let endPage: number;
  if (totalPages <= this.maxPages) {
    startPage = 1;
    endPage = totalPages;
  } else {
    let maxPagesBeforeCurrentPage = Math.floor(this.maxPages / 2);
    let maxPagesAfterCurrentPage = Math.ceil(this.maxPages / 2) - 1;
    if (currentPage <= maxPagesBeforeCurrentPage) {
      startPage = 1;
      endPage = this.maxPages;
    } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
      startPage = totalPages - this.maxPages + 1;
      endPage = totalPages;
    } else {
      startPage = currentPage - maxPagesBeforeCurrentPage;
      endPage = currentPage + maxPagesAfterCurrentPage;
    }
  }
  let pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);
  this.isShowLastPage = !pages.includes(this.pageable.totalPages); 
  this.isShowFirstPage = !pages.includes(1);
  return new Pagination(this.pageable.totalElements, currentPage, totalPages, startPage, endPage, pages);
  }
}
