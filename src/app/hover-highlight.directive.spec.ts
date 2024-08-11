import { HoverHighlightDirective } from './hover-highlight.directive';
import { ElementRef } from '@angular/core';

describe('HoverHighlightDirective', () => {
  it('should create an instance', () => {
    const elementRef = new ElementRef(document.createElement('div'));
    const directive = new HoverHighlightDirective(elementRef);
    expect(directive).toBeTruthy();
  });

  it('should remove highlight color on mouse leave', () => {
    const elementRef = new ElementRef(document.createElement('div'));
    const directive = new HoverHighlightDirective(elementRef);

    directive.highlightColor = '#00E5FF';
    directive.onMouseEnter(); // Set the color first
    directive.onMouseLeave(); // Now remove it

    expect(elementRef.nativeElement.style.backgroundColor).toBe('');
  });

  it('should apply the default highlight color on mouse enter', () => {
    const elementRef = new ElementRef(document.createElement('div'));
    const directive = new HoverHighlightDirective(elementRef);

    directive.onMouseEnter();

    expect(elementRef.nativeElement.style.backgroundColor).toBe('#00E5FF');
  });

  it('should not change background color with an invalid highlight color', () => {
    const elementRef = new ElementRef(document.createElement('div'));
    const directive = new HoverHighlightDirective(elementRef);

    directive.highlightColor = 'invalidColor';
    directive.onMouseEnter();

    expect(elementRef.nativeElement.style.backgroundColor).toBe('');
  });

  it('should throw an error if ElementRef is not provided', () => {
    expect(() => new HoverHighlightDirective(null as any)).toThrow();
  });
});
