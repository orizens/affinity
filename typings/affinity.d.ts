export declare const component: (comp: any) => any;
export declare const app: (target: any, node: any) => any;
export declare const clean: (target: any) => void;
export declare const store: (store?: {}) => {
    dispatch(key: any, value: any): void;
    select(key: any): any;
    connect(_fn: any): void;
};
export declare const use: (component: any) => void;
