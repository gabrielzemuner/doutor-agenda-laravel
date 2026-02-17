import InputError from '@/components/input-error';
import { Form, Head } from '@inertiajs/react';
// import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
// import AuthLayout from '@/layouts/auth-layout';
import LoginLayout from '@/layouts/login-layout';
// import { login } from '@/routes';
import { store } from '@/routes/register';

export default function Register() {
  return (
    <LoginLayout
      title="Criar uma conta"
      description="Preencha seus dados para criar uma nova conta"
    >
      <Head title="Cadastrar" />
      <Form
        {...store.form()}
        resetOnSuccess={['password', 'password_confirmation']}
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
                  required
                  autoFocus
                  tabIndex={1}
                  autoComplete="name"
                  name="name"
                  placeholder="Nome completo"
                />
                <InputError message={errors.name} className="mt-2" />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  tabIndex={2}
                  autoComplete="email"
                  name="email"
                  placeholder="Digite seu e-mail"
                />
                <InputError message={errors.email} />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  tabIndex={3}
                  autoComplete="new-password"
                  name="password"
                  placeholder="Digite sua senha"
                />
                <InputError message={errors.password} />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password_confirmation">Confirmar senha</Label>
                <Input
                  id="password_confirmation"
                  type="password"
                  required
                  tabIndex={4}
                  autoComplete="new-password"
                  name="password_confirmation"
                  placeholder="Confirme sua senha"
                />
                <InputError message={errors.password_confirmation} />
              </div>

              <Button
                type="submit"
                className="w-full"
                tabIndex={5}
                data-test="register-user-button"
              >
                {processing && <Spinner />}
                Criar conta
              </Button>
            </div>

            {/* <div className="text-center text-sm text-muted-foreground">
              Já tem uma conta?{' '}
              <TextLink href={login()} tabIndex={6}>
                Entrar
              </TextLink>
            </div> */}
          </>
        )}
      </Form>
    </LoginLayout>
  );
}
