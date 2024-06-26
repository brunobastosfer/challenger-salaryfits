export class Medicine {
  id: string;
  name: string;
  type:
    | 'fitoterapico'
    | 'Alopatico'
    | 'homeopatico'
    | 'similar'
    | 'generico'
    | 'referencia'
    | 'manipulado';
  price: number;
  description: string;
}
