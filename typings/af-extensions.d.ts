export declare const componentsRegistration: {
    ids: {};
    has(component: any): boolean;
    register(component: any): void;
    getComponent(tag: any): any;
    getAll(): string[];
};
export declare const extensions: ((view: any, el: any, comp: any) => void)[];
