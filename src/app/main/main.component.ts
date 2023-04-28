import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { EventsService } from '../services/events.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  selectedOptions: string[] = [];

  eventsData: Event[] = [];
  dataSource = new MatTableDataSource<Event>();

  constructor(private eventsService: EventsService){}

  ngOnInit(): void {
    this.getAllEvents();
  }

  onSelectionChanged (selectedFilters: string[]) :void {
    this.selectedOptions = selectedFilters;
    if(!selectedFilters.length){
      this.getAllEvents();
      return;
    }
    this.eventsService.getFilteredEvents(selectedFilters).subscribe(res => {
      this.eventsData = [...res];
      this.dataSource = new MatTableDataSource<Event>(this.eventsData);
    })
  }

  private getAllEvents(): void {
    this.eventsService.getAllEvents().subscribe(res => {
      this.eventsData = [...res];
      this.dataSource = new MatTableDataSource<Event>(this.eventsData);
    })
  }
}
