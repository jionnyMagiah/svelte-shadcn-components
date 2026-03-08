import type { Doc } from '$content/index';
import {
    Blocks,
    Component as ComponentIcon,
    House,
    Package,
    Puzzle,
    Route,
    Wrench
} from '@lucide/svelte';
import type { Component } from 'svelte';
import { getAllDocs } from './doc-utils';

function getIcon(group: Groups): Component {
    switch (group) {
        case 'Getting Started':
            return Route;
        case 'Components':
            return Puzzle;
        case 'Blocks':
            return Blocks;
        case 'Patterns':
            return ComponentIcon;
        case 'Packages':
            return Package;
        case 'Utils':
            return Wrench;
        default:
            return House;
    }
}

function groupDocs(docs: Doc[]): Navigation {
    return docs.reduce<Navigation>((acc, doc) => {
        const { group, section } = doc;

        acc[group] ??= {
            icon: getIcon(group),
            sections: {} as Record<Sections, Doc[]>
        };

        acc[group].sections[section] ??= [];
        acc[group].sections[section].push(doc);

        return acc;
    }, {} as Navigation);
}
const allDocs = getAllDocs();

export type Groups = (typeof allDocs)[number]['group'];
export type Sections = (typeof allDocs)[number]['section'];
export type Navigation = Record<
    Groups,
    {
        icon: Component;
        sections: Record<Sections, Doc[]>;
    }
>;
export const navigation: Navigation = groupDocs(allDocs);
