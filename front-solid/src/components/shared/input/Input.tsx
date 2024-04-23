import { JSX } from "solid-js";

interface Props extends JSX.InputHTMLAttributes<HTMLInputElement> {}
export function Input(props: Props) {
	return <input class="input" />;
}
