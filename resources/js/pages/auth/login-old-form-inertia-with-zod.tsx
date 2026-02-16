import { Head, useForm } from '@inertiajs/react';
import { toast } from 'sonner';
import z from 'zod';
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

const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: 'E-mail é obrigatório' })
    .email({ message: 'E-mail inválido' }),
  password: z
    .string()
    .trim()
    .min(8, { message: 'A senha deve ter pelo menos 8 caracteres' }),
});

export default function Login({
  status,
  canResetPassword,
  // canRegister,
}: Props) {
  const { data, setData, post, processing, errors, setError } = useForm({
    email: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = loginSchema.safeParse(data);

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof typeof data, string>> = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof typeof data;
        if (field) fieldErrors[field] = issue.message;
      });
      setError(fieldErrors as Record<keyof typeof data, string>);
      return;
    }

    post(store().url, {
      onError: (serverErrors) => {
        Object.values(serverErrors).forEach((msg) => toast.error(msg));
        // Limpa pra não aparecer no InputError
        Object.keys(serverErrors).forEach((field) => {
          setError(field as keyof typeof data, '');
        });
      },
    });
  };

  // useEffect(() => {
  //   if (errors.email) toast.error(errors.email);
  //   if (errors.password) toast.error(errors.password);
  // }, [errors]);

  return (
    <LoginLayout
      title="Login"
      description="Digite seu e-mail e senha para continuar"
    >
      <Head title="Login" />

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              name="email"
              // required
              autoFocus
              tabIndex={1}
              autoComplete="email"
              placeholder="Digite seu e-mail"
              value={data.email}
              onChange={(e) => setData('email', e.target.value)}
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
              // required
              tabIndex={2}
              autoComplete="current-password"
              placeholder="Digite sua senha"
              value={data.password}
              onChange={(e) => setData('password', e.target.value)}
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
        </div>
      </form>

      {status && (
        <div className="mb-4 text-center text-sm font-medium text-green-600">
          {status}
        </div>
      )}
    </LoginLayout>
  );
}
