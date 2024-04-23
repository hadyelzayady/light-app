import { Accessor, JSX } from "solid-js";

interface Props extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
	loading?: boolean;
	children: string;
}
export function Button(props: Props) {
	if (props.loading)
		return (
			<button class="btn">
				<span class="loading loading-spinner"></span>
				loading
			</button>
		);

	return (
		<button class="btn btn-primary btn-sm ml-2 mt-2" disabled={props.loading} {...props}>
			{props.children}
		</button>
	);
}
