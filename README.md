# Timeline CMS Component [![Static Badge](https://img.shields.io/badge/Built_using-compo_to_repo-blue)](https://github.com/kash-pram/compo-to-repo-tool)


A modern, responsive timeline component for Angular 20+ with an integrated Content Management System (CMS) for managing timeline events.

**Live Demo**: [Timeline CMS](https://kash-pram.github.io/angular20-timeline-cms-sample/)

**This is a standalone Angular component that can be easily integrated into any existing Angular project without any module configuration.**

## Features

- ✨ **Modern UI Design** - Clean, gradient-based design with smooth animations
- 📱 **Fully Responsive** - Works seamlessly on desktop, tablet, and mobile devices
- 🎯 **Integrated CMS** - Easy-to-use interface for managing timeline events
- 📅 **Flexible Date Formats** - Supports YYYY, MM/YYYY, and DD/MM/YYYY formats
- 💾 **Local Storage** - Events persist across browser sessions
- 🔄 **Real-time Updates** - Timeline updates immediately when events are added/edited
- ⚡ **Standalone Component** - No module configuration required, drop-in ready
- 🎨 **Uni-spaced Timeline** - Equal spacing between all events regardless of year gaps
- 🔌 **Zero Dependencies** - Only requires Angular core and forms

## Prerequisites

- Angular 20 or higher
- Node.js 18+ and npm
- Angular CLI installed globally (`npm install -g @angular/cli`)

## Installation & Setup

### Method 1: Clone the Repository (Recommended)

```bash
# Clone the repository
git clone https://github.com/kash-pram/timeline-cms.git

# Navigate to project directory
cd timeline-cms

# Install dependencies
npm install

# Run the development server
ng serve

# Open browser and navigate to
http://localhost:4200
```

### Method 2: Integrate into Existing Angular Project

If you want to add this component to your existing Angular project:

#### Step 1: Copy the Component Files

The component consists of three files:

```
timeline-cms/
├── timeline-cms.component.ts   # Component logic
├── timeline-cms.component.html # Template
└── timeline-cms.component.css  # Styles
```

Copy all three files to your project's component directory:

```bash
# Create directory (if needed)
mkdir -p src/app/components/timeline-cms

# Copy all component files
cp timeline-cms.component.ts src/app/components/timeline-cms/
cp timeline-cms.component.html src/app/components/timeline-cms/
cp timeline-cms.component.css src/app/components/timeline-cms/
```

#### Step 2: Verify File Structure

Ensure your files are organized like this:

```
src/app/components/timeline-cms/
├── timeline-cms.component.ts
├── timeline-cms.component.html
└── timeline-cms.component.css
```

#### Step 3: Import the Component

In any component where you want to use the timeline, import it:

**Option A: In a Standalone Component**

```typescript
// app.component.ts or any other standalone component
import { Component } from '@angular/core';
import { TimelineCmsComponent } from './components/timeline-cms/timeline-cms.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TimelineCmsComponent], // Add here
  template: `
    <div class="app-container">
      <app-timeline-cms></app-timeline-cms>
    </div>
  `
})
export class AppComponent {}
```

**Option B: In a Module-based Component**

```typescript
// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TimelineCmsComponent } from './components/timeline-cms/timeline-cms.component';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    TimelineCmsComponent // Add here (standalone components can be imported in modules)
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

#### Step 4: Use in Template

```html
<!-- app.component.html or any other template -->
<app-timeline-cms></app-timeline-cms>
```

#### Step 5: Run Your Application

```bash
ng serve
```

Navigate to `http://localhost:4200` in your browser.

## Project Structure

```
timeline-cms/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   └── timeline-cms/
│   │   │       ├── timeline-cms.component.ts
│   │   │       ├── timeline-cms.component.html
│   │   │       └── timeline-cms.component.css
│   │   ├── app.component.ts
│   │   └── app.config.ts
│   ├── index.html
│   └── main.ts
├── angular.json
├── package.json
├── tsconfig.json
└── README.md
```

## Component Files Overview

### timeline-cms.component.ts
Contains the component logic:
- Event management (add, edit, delete)
- Date parsing for multiple formats
- Local storage integration
- Event sorting by date

### timeline-cms.component.html
Contains the template:
- CMS panel with form
- Event list management
- Timeline visualization
- Responsive layout structure

### timeline-cms.component.css
Contains all styles:
- Timeline styling
- CMS panel styling
- Responsive breakpoints
- Animations and transitions

## Building for Production

```bash
# Build the project
ng build

# Build with production optimization
ng build --configuration production

# Output will be in dist/ directory
```

## Usage Guide

### Adding Timeline Events

1. Click the **"Manage Events"** button in the top-right corner
2. Fill in the form:
   - **Date**: Enter in any of these formats:
     - `2020` (year only)
     - `03/2020` (month/year)
     - `15/03/2020` (day/month/year)
   - **Title**: Event title (required)
   - **Description**: Event description (optional)
3. Click **"Add Event"** to save

### Editing Events

1. In the CMS panel, click the ✏️ (edit) icon next to any event
2. Modify the fields as needed
3. Click **"Update Event"** to save changes
4. Click **"Cancel"** to discard changes

### Deleting Events

1. In the CMS panel, click the 🗑️ (delete) icon next to any event
2. Confirm the deletion in the popup dialog

### Viewing the Timeline

1. Click **"View Timeline"** button to switch to timeline view
2. Events are displayed in chronological order
3. **Desktop**: alternating left-right layout with year markers
4. **Mobile**: vertical left-aligned layout

## Date Format Details

The component accepts three date formats:

| Format | Example | Description | Display on Timeline |
|--------|---------|-------------|---------------------|
| YYYY | `2020` | Year only | 2020 |
| MM/YYYY | `03/2020` | Month and year | 2020 |
| DD/MM/YYYY | `15/03/2020` | Full date | 2020 |

**Note**: The timeline marker shows only the year for clean visualization, but the full date is displayed within the event card.

## Component API

### Component Selector

```html
<app-timeline-cms></app-timeline-cms>
```

### No Inputs or Outputs

This component is self-contained and manages its own state. It doesn't require any `@Input()` or `@Output()` properties.

### Data Storage Interface

```typescript
interface TimelineEvent {
  id: string;          // Unique identifier (timestamp)
  date: string;        // Original date string as entered
  parsedDate: Date;    // Parsed Date object for sorting
  year: number;        // Extracted year for display
  title: string;       // Event title
  description: string; // Event description
}
```

## Data Persistence

Events are automatically saved to the browser's `localStorage` under the key `timeline-events`.

### Viewing Stored Data

Open browser DevTools (F12) → Console tab:

```javascript
// View all events
JSON.parse(localStorage.getItem('timeline-events'))

// Clear all events
localStorage.removeItem('timeline-events')

// Refresh the page after clearing
location.reload()
```

## Browser Support

| Browser | Minimum Version |
|---------|----------------|
| Chrome | 90+ |
| Firefox | 88+ |
| Safari | 14+ |
| Edge | 90+ |

## Troubleshooting

### Component Not Displaying

**Issue**: Component selector not recognized

**Solution**: 
1. Ensure `TimelineCmsComponent` is imported in your component's `imports` array
2. Check that the selector `<app-timeline-cms>` is spelled correctly
3. Verify all three component files (.ts, .html, .css) are in the same directory
4. Check the file paths in `templateUrl` and `styleUrls` in the .ts file

### Template/Style Not Found Errors

**Issue**: Angular can't find the HTML or CSS files

**Solution**:
```typescript
// In timeline-cms.component.ts, verify these paths are correct:
@Component({
  selector: 'app-timeline-cms',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './timeline-cms.component.html',  // Check this path
  styleUrls: ['./timeline-cms.component.css']   // Check this path
})
```

### Events Not Saving

**Issue**: Events disappear after page refresh

**Solution**: 
1. Check if localStorage is enabled in your browser
2. Some private/incognito modes disable localStorage
3. Check browser console for errors

### Date Validation Errors

**Issue**: Valid dates being rejected

**Solution**: Ensure date format matches exactly:
- ✅ `2020`, `03/2020`, `15/03/2020`
- ❌ `2020-03-15`, `March 2020`, `3/2020` (must be two digits for month)

### Build Errors

**Issue**: `Cannot find module` errors

**Solution**:
```bash
# Clear node modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Angular cache
ng cache clean

# Rebuild
ng build
```

### Layout Issues on Mobile

**Issue**: Horizontal scrollbar or cut-off content

**Solution**: 
1. Ensure parent container has no fixed width
2. Add to parent container: `max-width: 100%; overflow-x: hidden;`

### Missing Icons in CMS Panel

**Issue**: Edit/Delete buttons show wrong characters

**Solution**: This is an encoding issue. The HTML file uses emojis (✏️ 🗑️). Ensure your editor saves the file with UTF-8 encoding.

## Development

### Run Development Server

```bash
ng serve
# or with specific port
ng serve --port 4300

# or with open browser
ng serve --open
```

### Run Tests

```bash
ng test
```

### Build

```bash
# Development build
ng build

# Production build
ng build --configuration production
```

### Code Linting

```bash
ng lint
```

## Known Limitations

1. **Local Storage Only** - Data is stored in browser localStorage (not synced across devices)
2. **Single User** - No authentication or multi-user support
3. **No Backend** - All data is client-side only
4. **No Export** - Cannot export timeline to PDF/PNG/CSV
5. **Browser Dependent** - Each browser maintains separate storage

## Future Enhancements

Planned features for future versions:

- [ ] Backend integration (Firebase/API)
- [ ] Export to PDF/PNG/CSV
- [ ] Import events from CSV/JSON
- [ ] Search and filter functionality
- [ ] Custom color themes via configuration
- [ ] Event categories/tags
- [ ] Drag-and-drop event reordering
- [ ] Multi-language support (i18n)
- [ ] Image attachments for events
- [ ] Shareable timeline links
- [ ] Dark mode support

## Technology Stack

- **Angular**: 20+
- **TypeScript**: 5+
- **CSS3**: Custom styling with gradients and animations
- **LocalStorage API**: Client-side data persistence
- **FormsModule**: Two-way data binding

## File Dependencies

```typescript
// timeline-cms.component.ts imports:
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
```

No external dependencies required beyond Angular core modules.

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit changes: `git commit -m "Add my feature"`
4. Push to branch: `git push origin feature/my-feature`
5. Open a Pull Request

### Contribution Guidelines

- Follow Angular style guide
- Maintain existing code structure (separate .ts, .html, .css files)
- Test on multiple browsers and screen sizes
- Update README if adding new features

## License

MIT License - Free to use in personal and commercial projects.

## Support

For issues or questions:
1. Check the **Troubleshooting** section above
2. Review the component code and comments
3. Open an issue on GitHub with:
   - Description of the problem
   - Steps to reproduce
   - Screenshots (if applicable)
   - Angular version and browser details
   - Console error messages

## Changelog

### Version 1.0.0 (Current)
- ✅ Initial release
- ✅ Standalone component architecture
- ✅ Separated component files (.ts, .html, .css)
- ✅ Timeline with alternating layout
- ✅ Integrated CMS functionality
- ✅ Responsive design for all devices
- ✅ Local storage persistence
- ✅ Three date format support (YYYY, MM/YYYY, DD/MM/YYYY)
- ✅ Add, edit, delete event operations
- ✅ Real-time sorting by date
- ✅ Year markers on timeline
- ✅ Custom styled CMS panel

---

**Built with Angular 20+ and ❤️**