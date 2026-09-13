import React from 'react';
import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { describe, expect, it, vi } from 'vitest';
import messages from '../../messages/en.json';
import { getHealth } from '../../lib/api/client';
import { PlatformStatus } from './platform-status';

vi.mock('../../lib/api/client', () => ({ getHealth: vi.fn() }));

const renderStatus = () =>
  render(
    <NextIntlClientProvider locale="en" messages={messages}>
      <PlatformStatus />
    </NextIntlClientProvider>,
  );

describe('PlatformStatus', () => {
  it('renders loading state', () => {
    vi.mocked(getHealth).mockReturnValue(new Promise(() => {}));
    renderStatus();
    expect(screen.getByText('Checking connection…')).toBeTruthy();
  });

  it('shows an accessible error state when the API is unavailable', async () => {
    vi.mocked(getHealth).mockRejectedValue(new Error('offline'));
    renderStatus();
    expect((await screen.findByRole('alert')).textContent).toBe('API is unavailable');
  });
});
