export class Address {
    id: number;
    name: string;
    active: boolean;
    streetName: string;
    number: number;
    description: string;
    complement: string;

    toString(){
        return this.name+": "+this.streetName+", "+this.number;
    }
} 