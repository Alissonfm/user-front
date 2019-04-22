import { TypeAddress } from './type-address.model';

export class Address {
    id: number;
    name: string;
    active: boolean;
    streetName: string;
    number: number;
    description: string;
    complement: string;
    typeAddress: TypeAddress
} 