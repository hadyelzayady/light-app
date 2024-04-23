import { JSX } from "solid-js";

export const Header = {
	h1: (props: JSX.HTMLAttributes<HTMLHeadingElement>) => <h1 class="mb-6 text-5xl font-bold" {...props} />,
	h2: (props: JSX.HTMLAttributes<HTMLHeadingElement>) => <h2 class="mb-6 text-3xl font-bold" {...props} />,
	h3: (props: JSX.HTMLAttributes<HTMLHeadingElement>) => <h3 class="mb-6 text-2xl font-bold" {...props} />,
};
