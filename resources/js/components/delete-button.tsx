import { useForm } from '@inertiajs/react';
import { TrashIcon } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog';
import { Button } from './ui/button';
import { Spinner } from './ui/spinner';

type DeleteButtonProps = {
  deleteUrl: string;
  title?: string;
  description?: string;
};

export default function DeleteButton({
  deleteUrl,
  title = 'Tem certeza que deseja deletar este registro?',
  description = 'Você não poderá reverter esta ação.',
}: DeleteButtonProps) {
  const { delete: destroy, processing } = useForm();

  const handleDelete = () => {
    destroy(deleteUrl);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" disabled={processing}>
          {processing ? <Spinner /> : <TrashIcon />}
          Apagar
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Apagar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
