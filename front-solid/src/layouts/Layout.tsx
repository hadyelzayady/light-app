import { JSX, onMount } from "solid-js";
import { Navbar } from "../components/core/navbar/Navbar";
import { useNavigate } from "@solidjs/router";

interface Props {
	children: JSX.Element;
}
export function Layout(props: Props) {
	return (
		<div>
			<Navbar />
			<div class="p-4">{props.children}</div>
		</div>
	);
}
