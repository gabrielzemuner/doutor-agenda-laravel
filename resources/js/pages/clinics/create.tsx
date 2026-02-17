import { Form } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AppLayout from '@/layouts/app-layout';
import { store } from '@/routes/clinics';

export default function Create() {
  return (
    <AppLayout breadcrumbs={[]}>
      <Dialog open>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Adicionar clínica</DialogTitle>
            <DialogDescription>
              Adicione uma clínica para continuar
            </DialogDescription>
          </DialogHeader>
          <Form
            {...store.form()}
            // resetOnSuccess={['password', 'password_confirmation']}
            disableWhileProcessing
            className="flex flex-col gap-6"
          >
            {({ processing, errors }) => (
              <>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Nome</Label>
                    <Input
                      id="name"
                      type="text"
                      // required
                      autoFocus
                      name="name"
                      placeholder="Digite o nome da clínica"
                    />
                    <InputError message={errors.name} className="mt-2" />
                  </div>

                  <DialogFooter>
                    <Button type="submit" disabled={processing}>
                      {processing && <Spinner />}
                      Criar clínica
                    </Button>
                  </DialogFooter>
                </div>
              </>
            )}
          </Form>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
}
