import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { formatTime, weekDays } from '@/helpers/available-values';
import { formatCurrencyInCents } from '@/helpers/currency';
import { useInitials } from '@/hooks/use-initials';
import type { Doctor } from '@/types/models';
import { CalendarIcon, ClockIcon, DollarSignIcon } from 'lucide-react';
import { useState } from 'react';
import UpsertDoctorForm from './upsert-doctor-form';

export default function DoctorCard({ doctor }: { doctor: Doctor }) {
  const getInitials = useInitials();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Avatar className="h-10 w-10">
            <AvatarFallback>{getInitials(doctor.name)}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-sm font-medium">{doctor.name}</h3>
            <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
          </div>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="flex flex-col gap-2">
        <Badge variant="outline">
          <CalendarIcon className="mr-1" />
          {
            weekDays.find(
              (day) => day.value === String(doctor.available_from_week_day),
            )?.label
          }{' '}
          a{' '}
          {
            weekDays.find(
              (day) => day.value === String(doctor.available_to_week_day),
            )?.label
          }
        </Badge>
        <Badge variant="outline">
          <ClockIcon className="mr-1" />
          Das {formatTime(doctor.available_from_time)} as{' '}
          {formatTime(doctor.available_to_time)}
        </Badge>
        <Badge variant="outline">
          <DollarSignIcon className="mr-1" />
          {formatCurrencyInCents(doctor.appointment_price_in_cents)}
        </Badge>
      </CardContent>
      <Separator />
      <CardFooter className="flex flex-col gap-2">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="w-full">Ver detalhes</Button>
          </DialogTrigger>
          <UpsertDoctorForm
            doctor={doctor}
            onSuccess={() => setIsOpen(false)}
          />
        </Dialog>
      </CardFooter>
    </Card>
  );
}
