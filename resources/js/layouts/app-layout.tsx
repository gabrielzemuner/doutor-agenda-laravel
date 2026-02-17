import AlertSooner from '@/components/alert-sooner';
import { Toaster } from '@/components/ui/sonner';
import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import type { AppLayoutProps } from '@/types';

export default ({ children, breadcrumbs, ...props }: AppLayoutProps) => (
  <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
    {children}
    <Toaster position="bottom-center" richColors theme="light" />
    <AlertSooner />
  </AppLayoutTemplate>
);
