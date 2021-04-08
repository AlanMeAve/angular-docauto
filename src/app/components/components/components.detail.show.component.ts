import { Component, ViewChild  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Query } from '../../models/query';
import { QueryService } from '../../services/query.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-components-show-detail',
  templateUrl: './components.detail.show.component.html',
  styleUrls: ['./components.detail.show.component.css']
})
export class ComponentsDetailShowComponent {

  component?: Query;
  detailComponent: MatTableDataSource<Query> = new MatTableDataSource();
  displayedColumns: string[] = ['product', 'format', 'download'];

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  constructor(
    private activatedRoute: ActivatedRoute,
    private queryService: QueryService
  ) {

    this.activatedRoute.paramMap.subscribe(params => {
      let componentParam = params.get('component');
      if(componentParam && componentParam.length > 0){
          this.queryService.getDetailComponentById(componentParam).subscribe(detail => {
          this.component = detail.component as Query;
          this.detailComponent = new MatTableDataSource(detail.detail as Query[]);
          this.detailComponent.paginator = this.paginator || null;
          this.detailComponent.sort = this.sort || null;
        });
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.detailComponent.filter = filterValue.trim().toLowerCase();
    if(this.detailComponent && this.detailComponent.paginator){
      this.detailComponent.paginator.firstPage();
    }   
  }

  downloadFile(query: Query){
    console.log('row: ', query);
    this.queryService.getFileByQuery(query).subscribe(file => {
      var downloadURL = window.URL.createObjectURL(file);
      var link = document.createElement('a');
      link.href = downloadURL;
      link.download = "help.pdf";
      link.click();
    });
  }

}
