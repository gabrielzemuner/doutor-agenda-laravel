import { Form, Head, usePage } from '@inertiajs/react';

import { useState } from 'react';
import { redirect } from '@/actions/App/Http/Controllers/SocialiteController';
import GoogleButton from '@/components/google-button';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
// import AuthLayout from '@/layouts/auth-layout';
import LoginLayout from '@/layouts/login-layout';
// import { register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';

type Props = {
  status?: string;
  canResetPassword: boolean;
  // canRegister: boolean;
};

export default function Login({
  status,
  canResetPassword,
  // canRegister,
}: Props) {
  const { errors: pageErrors } = usePage().props;

  // useEffect(() => {
  //   if (errors.email) toast.error(errors.email);
  //   if (errors.password) toast.error(errors.password);
  // }, [errors]);

  const [googleLoading, setGoogleLoading] = useState(false);

  return (
    <LoginLayout
      title="Login"
      description="Digite seu e-mail e senha para continuar"
    >
      <Head title="Login" />

      <Form
        {...store.form()}
        resetOnSuccess={['password']}
        className="flex flex-col gap-6"
      >
        {({ processing, errors }) => (
          <>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  required
                  autoFocus
                  tabIndex={1}
                  autoComplete="email"
                  placeholder="Digite seu e-mail"
                />
                <InputError message={errors.email} />
              </div>

              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Senha</Label>
                  {canResetPassword && (
                    <TextLink
                      href={request()}
                      className="ml-auto text-sm"
                      tabIndex={5}
                    >
                      Esqueci minha senha
                    </TextLink>
                  )}
                </div>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  required
                  tabIndex={2}
                  autoComplete="current-password"
                  placeholder="Digite sua senha"
                />
                <InputError message={errors.password} />
              </div>

              <div className="flex items-center space-x-3">
                <Checkbox id="remember" name="remember" tabIndex={3} />
                <Label htmlFor="remember">Lembrar-me</Label>
              </div>

              <Button
                type="submit"
                className="w-full"
                tabIndex={4}
                disabled={processing}
                data-test="login-button"
              >
                {processing && <Spinner />}
                Entrar
              </Button>
              <Button
                variant="outline"
                className="w-full"
                type="button"
                disabled={googleLoading}
                onClick={() => {
                  setGoogleLoading(true);
                  window.location.href = redirect().url;
                }}
              >
                {googleLoading && <Spinner />}{' '}
                <GoogleButton text="Entrar com Google" />
              </Button>
              <InputError message={pageErrors.google} />
            </div>

            {/* {canRegister && (
              <div className="text-center text-sm text-muted-foreground">
                Não tem uma conta?{' '}
                <TextLink href={register()} tabIndex={5}>
                  Cadastre-se
                </TextLink>
              </div>
            )} */}
          </>
        )}
      </Form>

      {status && (
        <div className="mb-4 text-center text-sm font-medium text-green-600">
          {status}
        </div>
      )}
    </LoginLayout>
  );
}
