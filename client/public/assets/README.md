# Assets Directory

This directory contains static assets for the Cultural Competency Workshop Facilitator. All assets are optimized for web delivery and follow accessibility guidelines.

## Directory Structure

```
assets/
├── images/           - Workshop-related images and diagrams
│   ├── workshop-flow.svg   - Main workshop flow diagram
│   └── backgrounds/        - UI background patterns
├── audio/            - Audio notifications and system sounds
│   ├── notification.wav    - General notification sound
│   ├── start-recording.wav - Recording start indicator
│   └── stop-recording.wav  - Recording stop indicator
└── icons/            - UI icons and visual elements
    └── mic-on.svg          - Microphone active indicator
```

## Asset Guidelines

### Images
- Format Requirements:
  - SVG preferred for diagrams and icons
  - WebP format for photographs (with PNG fallback)
  - Maintain aspect ratios: 16:9 or 4:3 for content images

- Optimization:
  - SVGs: Optimize using SVGO
  - Raster images: Compress using WebP at quality 80
  - Maximum dimensions: 1920x1080 for full-width images

- Accessibility:
  - Include aria-labels in SVGs
  - Maintain color contrast ratio ≥ 4.5:1
  - Provide text alternatives for informational images

### Audio
- Format Specifications:
  - Primary format: WAV
  - Sampling rate: 44.1kHz
  - Bit depth: 16-bit

- Size Constraints:
  - Notification sounds: ≤ 100KB
  - UI feedback sounds: ≤ 50KB
  - Maximum duration: 3 seconds

- Usage Guidelines:
  - Short, distinct sounds for different actions
  - Consistent volume levels across all audio
  - Include silent periods at start/end (10ms)

### Icons
- Technical Requirements:
  - Format: SVG
  - Viewbox: 24x24 grid
  - Stroke width: 2px
  - Round caps and joins

- Style Guidelines:
  - Monochrome design
  - Consistent stroke width
  - Clear silhouette
  - Minimum detail size: 2px

## Implementation Notes

### Image Loading
```javascript
// Responsive image loading
<img 
  src="/assets/images/workshop-flow.svg"
  alt="Workshop process flow diagram"
  width="800"
  height="600"
  loading="lazy"
/>
```

### Audio Implementation
```javascript
// Audio playback
const notification = new Audio('/assets/audio/notification.wav');
await notification.play();
```

### SVG Icons
```javascript
// Icon component usage
<Icon
  src="/assets/icons/mic-on.svg"
  aria-label="Microphone active"
  className="w-6 h-6"
/>
```

## Contribution Guidelines

1. Asset Naming:
   - Use kebab-case for filenames
   - Include dimensions in filename if relevant
   - Prefix with type for special assets (e.g., bg-pattern-1.svg)

2. Version Control:
   - Commit compressed assets only
   - Include source files in `/src/assets` if needed
   - Document any third-party assets and licenses

3. Quality Assurance:
   - Test assets across different devices/browsers
   - Verify accessibility compliance
   - Check file size optimization

## License Information

All custom assets are licensed under the project's MIT license.
Third-party assets (if any) maintain their original licenses.
