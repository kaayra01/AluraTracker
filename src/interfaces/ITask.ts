import IProject from "./IProject";

export default interface ITask {
    push(tarefa: ITask): unknown;
    findIndex(arg0: (tar: any) => boolean): unknown;
    id: number,
    duracaoEmSegundos: number,
    descricao: string,
    projeto: IProject
}