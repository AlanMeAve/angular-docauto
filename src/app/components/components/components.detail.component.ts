import { Component, ViewChild  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Query } from '../../models/query';
import { QueryService } from '../../services/query.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-components-detail',
  templateUrl: './components.detail.component.html',
  styleUrls: ['./components.detail.component.css']
})
export class ComponentsDetailComponent {

  query: Query = new Query();
  components: MatTableDataSource<Query> = new MatTableDataSource();
  displayedColumns: string[] = ['platform', 'system', 'library', 'class', 'component', 'show'];

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  constructor(
    private activatedRoute: ActivatedRoute,
    private queryService: QueryService,
    private router: Router
  ) {

    this.activatedRoute.paramMap.subscribe(params => {
      let filter = params.get('filter');
      if(filter && filter.length > 0){
        this.query = JSON.parse(filter) as Query;
        this.queryService.getAllFiltered(this.query).subscribe(components => {
          this.components = new MatTableDataSource(components);
          console.log('this.components: ', this.components);
          this.components.paginator = this.paginator || null;
          this.components.sort = this.sort || null;
        });
      }
    });
    console.log('this.query: ', this.query); 

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.components.filter = filterValue.trim().toLowerCase();
    if(this.components && this.components.paginator){
      this.components.paginator.firstPage();
    }   
  }

}
