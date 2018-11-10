export interface IComponentProps {
    template?: string;
    childs?: HTMLElement[];
    tag: string;
    attrs?: {
        [key: string]: string;
    };
    [key: string]: any;
}
export interface IAffinityComponent {
    (props: IComponentProps): any;
}
