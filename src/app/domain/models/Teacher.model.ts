export interface Teacher {
  id_person: number;
  firstName: string;
  lastName: string;
  available: boolean;
  specialty: string;
  gender: string;
  dateOfBirth: Date;
  numbers: string;
  address: {
    city: string;
    country: string;
    street: string;
  };
}
