import { Component, OnInit } from '@angular/core';
import { Platform } from '../../models/platform';
import { PlatformService } from '../../services/platform.service';
import { SystemService } from '../../services/system.service';
import { ClassService } from '../../services/class.service';
import { LibraryService } from '../../services/library.service';
import { Query } from '../../models/query'; 
import { System } from '../../models/system';
import { Class } from '../../models/class';
import { Library } from '../../models/library';
import { QueryService } from '../../services/query.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-components',
  templateUrl: './components.component.html',
  styleUrls: ['./components.component.css']
})
export class ComponentsComponent implements OnInit {

  platforms: Platform[] = [];
  systems: System[] = [];
  classes: Class[] = [];
  libraries: Library[] = [];

  query: Query = new Query();

  constructor(
    private platformService: PlatformService,
    private systemService: SystemService,
    private classService: ClassService,
    private libraryService: LibraryService,
    private queryService: QueryService,
    private router: Router
  ) {
    
    this.query.platform = new Platform();
    this.query.system = new System();
    this.query.clazz = new Class();
    this.query.library = new Library();
    this.query.component = '';

  }

  ngOnInit(): void {

    this.platformService.getPlatfroms().subscribe(platforms => {
      this.platforms = platforms;
    });

    this.systemService.getSystems().subscribe(systems => {
      this.systems = systems;
    });

    this.classService.getClasses().subscribe(classes => {
      this.classes = classes;
    });
    this.libraryService.getLibraries().subscribe(libraries => {
      this.libraries = libraries;
    });

  }

  changePlatform(id: string){
    this.queryService.getSystemsByPlatformId(id).subscribe(systems => {
      this.systems = systems;
    });
  }

  changeSystem(id: string){
    this.queryService.getClasessBySystemId(id).subscribe(classes => {
      this.classes = classes;
    });  
  }

  changeClass(id: string){
    this.queryService.getLibrariesByClassId(id).subscribe(libraries => {
      this.libraries = libraries;
    });  
  }

  search(): void {
    this.router.navigate(['/components/detail', { filter : JSON.stringify(this.query) }]);
  }

}
