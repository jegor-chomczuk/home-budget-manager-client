import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-january',
  templateUrl: './january.component.html',
  styleUrls: ['./january.component.css']
})
export class JanuaryComponent implements OnInit {
  monthName: string;
  
  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router
  ) { 
    this.monthName = this.activeRoute.snapshot.params['monthName'];
    this.activeRoute.paramMap.subscribe(params => {
      // window.location.reload();
      this.ngOnInit();
  });
  }

  ngOnInit(): void {
  }

  reloadView():void {
    
    window.location.reload();
  }
}
