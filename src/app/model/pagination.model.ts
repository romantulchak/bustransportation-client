export class Pagination{
    public totalItems: number;
    public currentPage: number;
    public totalPages: number;
    public startPage: number;
    public endPage: number;
    public pages: number[];

    constructor(totalItems: number, currentPage: number, totalPages: number, startPage: number, endPage: number, pages: number[]){
        this.totalItems = totalItems;
        this.currentPage = currentPage;
        this.totalPages = totalPages;
        this.startPage = startPage;
        this.endPage = endPage;
        this.pages = pages;
    }
}