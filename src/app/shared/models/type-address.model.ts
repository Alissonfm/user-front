export class TypeAddress {
    id: number;
    name: string;
    active: boolean;

    get getStatus() {
        if(this.active){
            return "Ativo";
        }
        return "Desativado";
    }
}