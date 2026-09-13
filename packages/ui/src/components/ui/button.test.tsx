import { describe, expect, it } from 'vitest';
import { Button } from './button';

describe('Button', () => {
  it('provides a touch-friendly default control', () => {
    const view = Button({ children: 'Continue' });

    expect(view.props.className).toContain('min-h-11');
    expect(view.type).toBe('button');
  });
});
