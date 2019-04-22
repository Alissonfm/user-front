export class TypeAddress {
    id: number;
    name: string;
    active: boolean;

    getStatus(){
        if(this.active){
            return "Ativo";
        }
        return "Desativado";
    }
}