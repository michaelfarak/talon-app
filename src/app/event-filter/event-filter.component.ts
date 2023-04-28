import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-event-filter',
  templateUrl: './event-filter.component.html',
  styleUrls: ['./event-filter.component.scss']
})
export class EventFilterComponent {
  @Output() selectionChanged: EventEmitter<string[]> = new EventEmitter<string[]>();

  eventTypesControl = new FormControl([]);
  eventTypes = [
    {value: 'login', label: 'Login'},
    {value: 'loginFail', label: 'Login Fail'},
    {value: 'logout', label: 'Logout'},
    {value: 'openBrowser', label: 'Open Browser'},
    {value: 'fileDownload', label: 'File Download'},
    {value: 'fileUpload', label: 'File Upload'},
  ];

  triggeredEventTypes: string[]= [];  // for manual triggering (bug with selectionChanged event)

  onEventTypeRemoved(eventType: string) {
    const eventTypes: never[] = this.eventTypesControl.value as never[];
    this.removeFirst(eventTypes, eventType);
    this.eventTypesControl.setValue(eventTypes);
    this.triggeredEventTypes = eventTypes;
  }

  onSelectionChange(event: any): void {
    this.selectionChanged.emit(this.getEventTypeValuesList(event.value));
  }

  removeClick(): void {
    this.selectionChanged.emit(this.getEventTypeValuesList(this.triggeredEventTypes))
  }

  private removeFirst(array: any[], toRemove: any): void {
    const index = array.indexOf(toRemove);
    if (index !== -1) {
      array.splice(index, 1);
    }
  }

  private getEventTypeValue(eventLabel: string): string {
    let eventValue =''
    for (const eventType of this.eventTypes) {
      if (eventLabel === eventType.label) {
        eventValue = eventType.value;
      }
    }
    return eventValue;
  }

  private getEventTypeValuesList(eventTypeLabels: string[]): string[] {
    const eventTypeValues: string[] = [];
    for (const label of eventTypeLabels) {
      eventTypeValues.push(this.getEventTypeValue(label));
    }
    return eventTypeValues;
  }

}
