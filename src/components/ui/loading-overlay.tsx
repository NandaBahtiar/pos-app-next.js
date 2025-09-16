'use client';

import { Spinner } from "./spinner";

export function LoadingOverlay({ isActive }: { isActive: boolean }) {
  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <Spinner size="large" />
    </div>
  );
}
