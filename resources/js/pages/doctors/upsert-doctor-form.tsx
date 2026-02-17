import { Head, useForm } from '@inertiajs/react';
import { NumericFormat } from 'react-number-format';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinner';
import { store, update } from '@/routes/doctors';
import { type Doctor } from '@/types/models';
import { medicalSpecialties } from './constants';

interface UpsertDoctorFormProps {
  doctor?: Doctor;
  onSuccess?: () => void;
}

export default function UpsertDoctorForm({
  doctor,
  onSuccess,
}: UpsertDoctorFormProps) {
  const { data, setData, processing, errors, submit, reset } = useForm<Doctor>({
    name: doctor?.name ?? '',
    specialty: doctor?.specialty ?? '',
    appointment_price_in_cents: doctor?.appointment_price_in_cents ?? 0,
    available_from_week_day: doctor?.available_from_week_day ?? '1',
    available_to_week_day: doctor?.available_to_week_day ?? '5',
    available_from_time: doctor?.available_from_time ?? '',
    available_to_time: doctor?.available_to_time ?? '',
  });

  const route = doctor ? update({ id: String(doctor.id) }) : store();

  return (
    <DialogContent onCloseAutoFocus={() => reset()}>
      <Head title={doctor ? 'Editar Médico' : 'Adicionar Médico'} />

      <DialogHeader>
        <DialogTitle>{doctor ? doctor.name : 'Adicionar médico'}</DialogTitle>
        <DialogDescription>
          {doctor
            ? 'Edite as informações desse médico.'
            : 'Adicione um novo médico.'}
        </DialogDescription>
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
          <Input
            id="name"
            value={data.name}
            onChange={(e) => setData('name', e.target.value)}
          />
          <InputError message={errors.name} />
        </div>

        {/* Especialidade */}
        <div className="grid gap-2">
          <Label htmlFor="specialty">Especialidade</Label>
          <Select
            value={data.specialty}
            onValueChange={(value) => setData('specialty', value)}
          >
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

        {/* Preço - sem input hidden! */}
        <div className="grid gap-2">
          <Label htmlFor="appointment_price_in_cents">Preço da consulta</Label>
          <NumericFormat
            id="appointment_price_in_cents"
            value={data.appointment_price_in_cents / 100}
            onValueChange={(values) => {
              setData(
                'appointment_price_in_cents',
                Math.round((values.floatValue ?? 0) * 100),
              );
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

        {/* Dias e horários - usando onValueChange do Select */}
        <div className="grid gap-2">
          <Label>Dia inicial de disponibilidade</Label>
          <Select
            value={data.available_from_week_day}
            onValueChange={(value) => setData('available_from_week_day', value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione um dia" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">Domingo</SelectItem>
              <SelectItem value="1">Segunda</SelectItem>
              <SelectItem value="2">Terça</SelectItem>
              <SelectItem value="3">Quarta</SelectItem>
              <SelectItem value="4">Quinta</SelectItem>
              <SelectItem value="5">Sexta</SelectItem>
              <SelectItem value="6">Sábado</SelectItem>
            </SelectContent>
          </Select>
          <InputError message={errors.available_from_week_day} />
        </div>

        {/* Dia final de disponibilidade */}
        <div className="grid gap-2">
          <Label>Dia final de disponibilidade</Label>
          <Select
            value={data.available_to_week_day}
            onValueChange={(value) => setData('available_to_week_day', value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione um dia" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">Domingo</SelectItem>
              <SelectItem value="1">Segunda</SelectItem>
              <SelectItem value="2">Terça</SelectItem>
              <SelectItem value="3">Quarta</SelectItem>
              <SelectItem value="4">Quinta</SelectItem>
              <SelectItem value="5">Sexta</SelectItem>
              <SelectItem value="6">Sábado</SelectItem>
            </SelectContent>
          </Select>
          <InputError message={errors.available_to_week_day} />
        </div>

        {/* Horário inicial de disponibilidade */}
        <div className="grid gap-2">
          <Label>Horário inicial de disponibilidade</Label>
          <Select
            value={data.available_from_time}
            onValueChange={(value) => setData('available_from_time', value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione um horário" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Manhã</SelectLabel>
                <SelectItem value="05:00:00">05:00</SelectItem>
                <SelectItem value="05:30:00">05:30</SelectItem>
                <SelectItem value="06:00:00">06:00</SelectItem>
                <SelectItem value="06:30:00">06:30</SelectItem>
                <SelectItem value="07:00:00">07:00</SelectItem>
                <SelectItem value="07:30:00">07:30</SelectItem>
                <SelectItem value="08:00:00">08:00</SelectItem>
                <SelectItem value="08:30:00">08:30</SelectItem>
                <SelectItem value="09:00:00">09:00</SelectItem>
                <SelectItem value="09:30:00">09:30</SelectItem>
                <SelectItem value="10:00:00">10:00</SelectItem>
                <SelectItem value="10:30:00">10:30</SelectItem>
                <SelectItem value="11:00:00">11:00</SelectItem>
                <SelectItem value="11:30:00">11:30</SelectItem>
                <SelectItem value="12:00:00">12:00</SelectItem>
                <SelectItem value="12:30:00">12:30</SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectLabel>Tarde</SelectLabel>
                <SelectItem value="13:00:00">13:00</SelectItem>
                <SelectItem value="13:30:00">13:30</SelectItem>
                <SelectItem value="14:00:00">14:00</SelectItem>
                <SelectItem value="14:30:00">14:30</SelectItem>
                <SelectItem value="15:00:00">15:00</SelectItem>
                <SelectItem value="15:30:00">15:30</SelectItem>
                <SelectItem value="16:00:00">16:00</SelectItem>
                <SelectItem value="16:30:00">16:30</SelectItem>
                <SelectItem value="17:00:00">17:00</SelectItem>
                <SelectItem value="17:30:00">17:30</SelectItem>
                <SelectItem value="18:00:00">18:00</SelectItem>
                <SelectItem value="18:30:00">18:30</SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectLabel>Noite</SelectLabel>
                <SelectItem value="19:00:00">19:00</SelectItem>
                <SelectItem value="19:30:00">19:30</SelectItem>
                <SelectItem value="20:00:00">20:00</SelectItem>
                <SelectItem value="20:30:00">20:30</SelectItem>
                <SelectItem value="21:00:00">21:00</SelectItem>
                <SelectItem value="21:30:00">21:30</SelectItem>
                <SelectItem value="22:00:00">22:00</SelectItem>
                <SelectItem value="22:30:00">22:30</SelectItem>
                <SelectItem value="23:00:00">23:00</SelectItem>
                <SelectItem value="23:30:00">23:30</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <InputError message={errors.available_from_time} />
        </div>

        {/* Horário final de disponibilidade */}
        <div className="grid gap-2">
          <Label>Horário final de disponibilidade</Label>
          <Select
            value={data.available_to_time}
            onValueChange={(value) => setData('available_to_time', value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione um horário" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Manhã</SelectLabel>
                <SelectItem value="05:00:00">05:00</SelectItem>
                <SelectItem value="05:30:00">05:30</SelectItem>
                <SelectItem value="06:00:00">06:00</SelectItem>
                <SelectItem value="06:30:00">06:30</SelectItem>
                <SelectItem value="07:00:00">07:00</SelectItem>
                <SelectItem value="07:30:00">07:30</SelectItem>
                <SelectItem value="08:00:00">08:00</SelectItem>
                <SelectItem value="08:30:00">08:30</SelectItem>
                <SelectItem value="09:00:00">09:00</SelectItem>
                <SelectItem value="09:30:00">09:30</SelectItem>
                <SelectItem value="10:00:00">10:00</SelectItem>
                <SelectItem value="10:30:00">10:30</SelectItem>
                <SelectItem value="11:00:00">11:00</SelectItem>
                <SelectItem value="11:30:00">11:30</SelectItem>
                <SelectItem value="12:00:00">12:00</SelectItem>
                <SelectItem value="12:30:00">12:30</SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectLabel>Tarde</SelectLabel>
                <SelectItem value="13:00:00">13:00</SelectItem>
                <SelectItem value="13:30:00">13:30</SelectItem>
                <SelectItem value="14:00:00">14:00</SelectItem>
                <SelectItem value="14:30:00">14:30</SelectItem>
                <SelectItem value="15:00:00">15:00</SelectItem>
                <SelectItem value="15:30:00">15:30</SelectItem>
                <SelectItem value="16:00:00">16:00</SelectItem>
                <SelectItem value="16:30:00">16:30</SelectItem>
                <SelectItem value="17:00:00">17:00</SelectItem>
                <SelectItem value="17:30:00">17:30</SelectItem>
                <SelectItem value="18:00:00">18:00</SelectItem>
                <SelectItem value="18:30:00">18:30</SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectLabel>Noite</SelectLabel>
                <SelectItem value="19:00:00">19:00</SelectItem>
                <SelectItem value="19:30:00">19:30</SelectItem>
                <SelectItem value="20:00:00">20:00</SelectItem>
                <SelectItem value="20:30:00">20:30</SelectItem>
                <SelectItem value="21:00:00">21:00</SelectItem>
                <SelectItem value="21:30:00">21:30</SelectItem>
                <SelectItem value="22:00:00">22:00</SelectItem>
                <SelectItem value="22:30:00">22:30</SelectItem>
                <SelectItem value="23:00:00">23:00</SelectItem>
                <SelectItem value="23:30:00">23:30</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <InputError message={errors.available_to_time} />
        </div>

        <DialogFooter>
          <Button type="submit" disabled={processing}>
            {processing && <Spinner />}
            {doctor ? 'Salvar' : 'Adicionar'}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
