import {
  PageActions,
  PageContainer,
  PageContent,
  PageDescription,
  PageHeader,
  PageHeaderContent,
  PageTitle,
} from '@/components/ui/page-container';
import AppLayout from '@/layouts/app-layout';
import type { Doctor } from '@/types/models';
import { Head } from '@inertiajs/react';
import AddDoctorButton from './add-doctor-button';
import DoctorCard from './doctor-card';

export default function Index({ doctors }: { doctors: Doctor[] }) {
  return (
    <AppLayout breadcrumbs={[]}>
      <Head title="Médicos" />
      <PageContainer>
        <PageHeader>
          <PageHeaderContent>
            <PageTitle>Médicos</PageTitle>
            <PageDescription>
              Gerencie os médicos da sua clínica
            </PageDescription>
          </PageHeaderContent>
          <PageActions>
            <AddDoctorButton />
          </PageActions>
        </PageHeader>
        <PageContent>
          <div className="grid grid-cols-3 gap-6">
            {doctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        </PageContent>
      </PageContainer>
    </AppLayout>
  );
}
