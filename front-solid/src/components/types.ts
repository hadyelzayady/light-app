import { JSX } from "solid-js/jsx-runtime";

export interface ElementProps<T> {
	onClick?: JSX.EventHandler<T, MouseEvent>;
	ref?: T;
  disabled?: boolean;
}

interface KeyValuePair<T> {
	[key: string]: T;
}
export type TreeData = KeyValuePair<TreeData>;
