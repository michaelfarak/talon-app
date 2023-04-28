import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-event-table',
  templateUrl: './event-table.component.html',
  styleUrls: ['./event-table.component.scss']
})
export class EventTableComponent implements OnInit, AfterViewInit, OnChanges{
  @Input() dataSource: MatTableDataSource<Event> = new MatTableDataSource<Event>()
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;

  displayedColumns: string[] = ['eventType', 'severity', 'user', 'date'];

  constructor(){}

  ngOnInit(): void {
    this.paginator._intl.itemsPerPageLabel="Rows per Page";
  }

  ngAfterViewInit(): void {
   setTimeout(()=> this.dataSource.paginator = this.paginator)
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource.paginator = this.paginator;
    console.log(changes);
  }

  getSeverityColor(severity: string): string {
    switch (severity) {
      case 'low':
        return '#3A90E5'
      case 'medium':
        return '#FFB547'
      case 'high':
        return '#F06161'
      default: return '#FFFF'
    }
  }

}
