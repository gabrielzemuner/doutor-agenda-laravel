import DeleteButton from '@/components/delete-button';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinner';
import { medicalSpecialties } from '@/constants/specialties';
import { availableHours, weekDays } from '@/helpers/available-values';
import { destroy, store, update } from '@/routes/doctors';
import type { Doctor } from '@/types/models';
import { Head, useForm } from '@inertiajs/react';
import { NumericFormat } from 'react-number-format';

interface UpsertDoctorFormProps {
  doctor?: Doctor;
  onSuccess?: () => void;
}

export default function UpsertDoctorForm({ doctor, onSuccess }: UpsertDoctorFormProps) {
  const { data, setData, processing, errors, submit, reset } = useForm<Doctor>({
    name: doctor?.name ?? '',
    specialty: doctor?.specialty ?? '',
    appointment_price_in_cents: doctor?.appointment_price_in_cents ?? 0,
    available_from_week_day: doctor?.available_from_week_day.toString() ?? '1',
    available_to_week_day: doctor?.available_to_week_day.toString() ?? '5',
    available_from_time: doctor?.available_from_time ?? '',
    available_to_time: doctor?.available_to_time ?? '',
  });

  const route = doctor ? update({ id: String(doctor.id) }) : store();

  return (
    <DialogContent onCloseAutoFocus={() => reset()}>
      <Head title={doctor ? 'Editar Médico' : 'Adicionar Médico'} />

      <DialogHeader>
        <DialogTitle>{doctor ? doctor.name : 'Adicionar médico'}</DialogTitle>
        <DialogDescription>{doctor ? 'Edite as informações desse médico.' : 'Adicione um novo médico.'}</DialogDescription>
      </DialogHeader>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit(route.method, route.url, { onSuccess });
        }}
        className="space-y-4"
      >
        {/* Nome */}
        <div className="grid gap-2">
          <Label htmlFor="name">Nome</Label>
          <Input id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} />
          <InputError message={errors.name} />
        </div>

        {/* Especialidade */}
        <div className="grid gap-2">
          <Label htmlFor="specialty">Especialidade</Label>
          <Select value={data.specialty} onValueChange={(value) => setData('specialty', value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione uma especialidade" />
            </SelectTrigger>
            <SelectContent>
              {medicalSpecialties.map((specialty) => (
                <SelectItem key={specialty.value} value={specialty.value}>
                  {specialty.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <InputError message={errors.specialty} />
        </div>

        {/* Preço */}
        <div className="grid gap-2">
          <Label htmlFor="appointment_price_in_cents">Preço da consulta</Label>
          <NumericFormat
            id="appointment_price_in_cents"
            value={data.appointment_price_in_cents / 100}
            onValueChange={(values) => {
              setData('appointment_price_in_cents', Math.round((values.floatValue ?? 0) * 100));
            }}
            decimalScale={2}
            fixedDecimalScale
            decimalSeparator=","
            allowNegative={false}
            allowLeadingZeros={false}
            thousandSeparator="."
            customInput={Input}
            prefix="R$"
            onFocus={(e) => e.target.select()} // seleciona tudo ao focar
          />
          <InputError message={errors.appointment_price_in_cents} />
        </div>

        {/* Dias e horários */}
        <div className="grid gap-2">
          <Label>Dia inicial de disponibilidade</Label>
          <Select value={data.available_from_week_day} onValueChange={(value) => setData('available_from_week_day', value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione um dia" />
            </SelectTrigger>
            <SelectContent>
              {weekDays.map(({ value, label }) => (
                <SelectItem value={value}>{label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <InputError message={errors.available_from_week_day} />
        </div>

        {/* Dia final de disponibilidade */}
        <div className="grid gap-2">
          <Label>Dia final de disponibilidade</Label>
          <Select value={data.available_to_week_day} onValueChange={(value) => setData('available_to_week_day', value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione um dia" />
            </SelectTrigger>
            <SelectContent>
              {weekDays.map(({ value, label }) => (
                <SelectItem value={value}>{label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <InputError message={errors.available_to_week_day} />
        </div>

        {/* Horário inicial de disponibilidade */}
        <div className="grid gap-2">
          <Label>Horário inicial de disponibilidade</Label>
          <Select value={data.available_from_time} onValueChange={(value) => setData('available_from_time', value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione um horário" />
            </SelectTrigger>
            <SelectContent>
              {availableHours.map((section) => (
                <SelectGroup key={section.group}>
                  <SelectLabel>{section.group}</SelectLabel>
                  {section.items.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              ))}
            </SelectContent>
          </Select>
          <InputError message={errors.available_from_time} />
        </div>

        {/* Horário final de disponibilidade */}
        <div className="grid gap-2">
          <Label>Horário final de disponibilidade</Label>
          <Select value={data.available_to_time} onValueChange={(value) => setData('available_to_time', value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione um horário" />
            </SelectTrigger>
            <SelectContent>
              {availableHours.map((section) => (
                <SelectGroup key={section.group}>
                  <SelectLabel>{section.group}</SelectLabel>
                  {section.items.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              ))}
            </SelectContent>
          </Select>
          <InputError message={errors.available_to_time} />
        </div>

        <DialogFooter>
          {doctor && (
            <DeleteButton
              deleteUrl={destroy({ doctor: String(doctor?.id) }).url}
              title="Tem certeza que deseja deletar esse médico?"
              description="Essa ação não pode ser revertida. Isso irá deletar o médico e todas as consultas agendadas."
            />
          )}
          <Button type="submit" disabled={processing}>
            {processing && <Spinner />}
            {doctor ? 'Salvar' : 'Adicionar'}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
