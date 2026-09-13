'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { Badge } from '@virtual-russia/ui/badge';
import { Alert } from '@virtual-russia/ui/alert';
import { Button } from '@virtual-russia/ui/button';
import { Card } from '@virtual-russia/ui/card';
import { Skeleton } from '@virtual-russia/ui/skeleton';
import { getHealth } from '../../lib/api/client';
import { useTranslations } from 'next-intl';
type State = 'loading' | 'success' | 'error';
export function PlatformStatus() {
  const t = useTranslations('Home');
  const [state, setState] = useState<State>('loading');
  const check = useCallback(async () => {
    setState('loading');
    try {
      await getHealth();
      setState('success');
    } catch {
      setState('error');
    }
  }, []);
  useEffect(() => {
    void check();
  }, [check]);
  return (
    <Card className="p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold">{t('statusTitle')}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{t('services')}</p>
        </div>
        {state === 'loading' && <Skeleton className="h-7 w-40" />}
        {state === 'success' && (
          <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200">
            {t('available')}
          </Badge>
        )}
        {state === 'error' && (
          <Badge className="bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-200">
            {t('unavailable')}
          </Badge>
        )}
      </div>
      <div className="mt-6">
        {state === 'loading' ? (
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <span className="text-sm text-muted-foreground">{t('checking')}</span>
          </div>
        ) : state === 'error' ? (
          <div className="space-y-3">
            <Alert>{t('unavailable')}</Alert>
            <Button variant="outline" onClick={() => void check()}>
              {t('retry')}
            </Button>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">GET /api/v1/health</p>
        )}
      </div>
    </Card>
  );
}
