import type {
    HTMLAnchorAttributes,
    HTMLAttributes,
    HTMLButtonAttributes,
    SVGAttributes
} from 'svelte/elements';

export type Primitive<T, U extends HTMLElement = HTMLElement> = T & {
    ref?: U | null;
};

export type PrimitiveAttributes<T extends HTMLElement = HTMLElement> =
    Primitive<HTMLAttributes<T>>;
export type PrimitiveDivAttributes = PrimitiveAttributes<HTMLDivElement>;
export type PrimitiveAnchorAttributes = Primitive<
    HTMLAnchorAttributes,
    HTMLAnchorElement
>;
export type PrimitiveButtonAttributes = Primitive<
    HTMLButtonAttributes,
    HTMLButtonElement
>;
export type PrimitiveHeadingAttributes =
    PrimitiveAttributes<HTMLHeadingElement>;
export type PrimitiveSVGAttributes = Primitive<SVGAttributes<SVGElement>>;

export type TOCEntry = {
    title: string;
    url: string;
    items?: TOCEntry[];
};
