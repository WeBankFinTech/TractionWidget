import { noop } from './utils';
import type { App, Component, Plugin } from 'vue';
import type { FObjectDirective } from './interface';

export function withInstall<T extends Plugin> (
    main: T,
    extra?: Record<string, Component>,
    directives?: FObjectDirective[]
): T {
    const _main = main as any;
    _main.install = (app: App) => {
        for (const comp of [main, ...Object.values(extra ?? {})]) { app.component((comp as any).name, comp); }

        if (directives != null) {
            for (const directive of directives) { app.directive(directive.name, directive); }
        }
    };
    if (extra != null) {
        for (const [key, comp] of Object.entries(extra)) { _main[key] = comp; }
    }
    return _main as T;
}

export function withNoopInstall<T extends Plugin> (component: T): object {
    const _main = component;
    _main.install = noop;

    return _main;
}
