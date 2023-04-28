import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';

const GET_EVENTS_API = 'http://localhost:8000/events-json';
const GET_FILTERED_EVENTS_API = 'http://localhost:8000/filtered-events-json';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private http: HttpClient) { }

  getAllEvents () {
    return this.http.get<Event[]>(`${GET_EVENTS_API}`);
  }

  getFilteredEvents (filters: string[]) {
    let params = new HttpParams();
    params = params.append('filters', filters.join(', '))
    return this.http.get<Event[]>(`${GET_FILTERED_EVENTS_API}`, { params: params});
  }
}
