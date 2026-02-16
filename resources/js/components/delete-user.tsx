import { Form, usePage } from '@inertiajs/react';
import { useRef } from 'react';
import ProfileController from '@/actions/App/Http/Controllers/Settings/ProfileController';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function DeleteUser() {
  const inputRef = useRef<HTMLInputElement>(null);
  const { auth } = usePage().props;
  const isGoogle = auth.user.is_google_user;

  return (
    <div className="space-y-6">
      <Heading
        variant="small"
        title="Excluir conta"
        description="Exclua sua conta e todos os seus dados"
      />
      <div className="space-y-4 rounded-lg border border-red-100 bg-red-50 p-4 dark:border-red-200/10 dark:bg-red-700/10">
        <div className="relative space-y-0.5 text-red-600 dark:text-red-100">
          <p className="font-medium">Atenção</p>
          <p className="text-sm">Esta ação não pode ser desfeita.</p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="destructive" data-test="delete-user-button">
              Excluir conta
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Tem certeza que deseja excluir sua conta?</DialogTitle>
            <DialogDescription>
              {isGoogle
                ? 'Digite seu e-mail para confirmar a exclusão permanente da sua conta.'
                : 'Digite sua senha para confirmar a exclusão permanente da sua conta.'}
            </DialogDescription>

            <Form
              {...ProfileController.destroy.form()}
              options={{
                preserveScroll: true,
              }}
              onError={() => inputRef.current?.focus()}
              resetOnSuccess
              className="space-y-6"
            >
              {({ resetAndClearErrors, processing, errors }) => (
                <>
                  <div className="grid gap-2">
                    {isGoogle ? (
                      <>
                        <Label htmlFor="email" className="sr-only">
                          E-mail
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          name="email"
                          ref={inputRef}
                          placeholder="Digite seu e-mail"
                          autoComplete="email"
                        />
                        <InputError message={errors.email} />
                      </>
                    ) : (
                      <>
                        <Label htmlFor="password" className="sr-only">
                          Senha
                        </Label>
                        <Input
                          id="password"
                          type="password"
                          name="password"
                          ref={inputRef}
                          placeholder="Digite sua senha"
                          autoComplete="current-password"
                        />
                        <InputError message={errors.password} />
                      </>
                    )}
                  </div>

                  <DialogFooter className="gap-2">
                    <DialogClose asChild>
                      <Button
                        variant="secondary"
                        onClick={() => resetAndClearErrors()}
                      >
                        Cancelar
                      </Button>
                    </DialogClose>

                    <Button variant="destructive" disabled={processing} asChild>
                      <button
                        type="submit"
                        data-test="confirm-delete-user-button"
                      >
                        Excluir conta
                      </button>
                    </Button>
                  </DialogFooter>
                </>
              )}
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
