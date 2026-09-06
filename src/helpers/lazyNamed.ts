import { lazy, type ComponentType } from "react";

export function lazyNamed<Props, Name extends string>(
  load: () => Promise<Record<Name, ComponentType<Props>>>,
  name: Name,
) {
  return lazy(() => load().then((module) => ({ default: module[name] })));
}
