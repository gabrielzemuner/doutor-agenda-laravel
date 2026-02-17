import { Head } from '@inertiajs/react';
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
import AddDoctorButton from './add-doctor-button';

export default function Index() {
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
          {/* <div className="grid grid-cols-3 gap-6">
            {doctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div> */}
          <h1>Médicos</h1>
        </PageContent>
      </PageContainer>
    </AppLayout>
  );
}
