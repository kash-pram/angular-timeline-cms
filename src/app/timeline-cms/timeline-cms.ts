// timeline-cms.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface TimelineEvent {
  id: string;
  date: string;
  parsedDate: Date;
  year: number;
  title: string;
  description: string;
}

@Component({
  selector: 'app-timeline-cms',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './timeline-cms.html',
  styleUrls: ['./timeline-cms.css']
})
export class TimelineCmsComponent implements OnInit {
  events: TimelineEvent[] = [];
  sortedEvents: TimelineEvent[] = [];
  showCMS = false;
  editingId: string | null = null;
  formData = {
    date: '',
    title: '',
    description: ''
  };

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {
    const stored = localStorage.getItem('timeline-events');
    if (stored) {
      try {
        this.events = JSON.parse(stored).map((event: any) => ({
          ...event,
          parsedDate: new Date(event.parsedDate)
        }));
        this.updateSortedEvents();
      } catch (error) {
        console.error('Error loading events:', error);
        this.events = [];
      }
    }
  }

  saveToStorage() {
    localStorage.setItem('timeline-events', JSON.stringify(this.events));
    this.updateSortedEvents();
  }

  updateSortedEvents() {
    this.sortedEvents = [...this.events].sort((a, b) => {
      const timeA = a.parsedDate instanceof Date ? a.parsedDate.getTime() : 0;
      const timeB = b.parsedDate instanceof Date ? b.parsedDate.getTime() : 0;
      return timeA - timeB;
    });
  }

  parseDate(dateStr: string): { parsedDate: Date; year: number } | null {
    // Handle yyyy format
    const yyyyMatch = dateStr.match(/^\d{4}$/);
    if (yyyyMatch) {
      const year = parseInt(dateStr);
      return {
        parsedDate: new Date(year, 0, 1),
        year: year
      };
    }

    // Handle mm/yyyy format
    const mmyyyyMatch = dateStr.match(/^(\d{1,2})\/(\d{4})$/);
    if (mmyyyyMatch) {
      const month = parseInt(mmyyyyMatch[1]) - 1;
      const year = parseInt(mmyyyyMatch[2]);
      if (month >= 0 && month < 12) {
        return {
          parsedDate: new Date(year, month, 1),
          year: year
        };
      }
    }

    // Handle dd/mm/yyyy format
    const ddmmyyyyMatch = dateStr.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
    if (ddmmyyyyMatch) {
      const day = parseInt(ddmmyyyyMatch[1]);
      const month = parseInt(ddmmyyyyMatch[2]) - 1;
      const year = parseInt(ddmmyyyyMatch[3]);
      if (month >= 0 && month < 12 && day >= 1 && day <= 31) {
        return {
          parsedDate: new Date(year, month, day),
          year: year
        };
      }
    }

    return null;
  }

  saveEvent() {
    if (!this.formData.date || !this.formData.title) {
      alert('Please fill in date and title');
      return;
    }

    const parsed = this.parseDate(this.formData.date);
    if (!parsed) {
      alert('Invalid date format. Use YYYY, MM/YYYY or DD/MM/YYYY');
      return;
    }

    if (this.editingId) {
      // Update existing event
      const index = this.events.findIndex(e => e.id === this.editingId);
      if (index !== -1) {
        this.events[index] = {
          ...this.events[index],
          date: this.formData.date,
          parsedDate: parsed.parsedDate,
          year: parsed.year,
          title: this.formData.title,
          description: this.formData.description
        };
      }
    } else {
      // Add new event
      const newEvent: TimelineEvent = {
        id: Date.now().toString(),
        date: this.formData.date,
        parsedDate: parsed.parsedDate,
        year: parsed.year,
        title: this.formData.title,
        description: this.formData.description
      };
      this.events.push(newEvent);
    }

    this.saveToStorage();
    this.resetForm();
  }

  editEvent(event: TimelineEvent) {
    this.editingId = event.id;
    this.formData = {
      date: event.date,
      title: event.title,
      description: event.description
    };
  }

  deleteEvent(id: string) {
    if (confirm('Are you sure you want to delete this event?')) {
      this.events = this.events.filter(e => e.id !== id);
      this.saveToStorage();
    }
  }

  cancelEdit() {
    this.resetForm();
  }

  resetForm() {
    this.formData = {
      date: '',
      title: '',
      description: ''
    };
    this.editingId = null;
  }
}