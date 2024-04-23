import { createSignal } from "solid-js";
import { Button } from "../../shared/button/Button";
import { createQuery } from "@tanstack/solid-query";
export function FibCalc() {
	const [fibResult, setFibResult] = createSignal<number | null>(null);
	const [loading, setLoading] = createSignal(false);
	const [enabled, setEnabled] = createSignal(false);
	let inputRef: HTMLInputElement | undefined;
	const query = createQuery(() => ({
		queryKey: ["todos"],
		queryFn: async () => {
			const resp = await fetch(`http://localhost:8001/api/fib/${inputRef?.value}`);
			const result = await resp.json();
			if (result?.result) {
				console.log("fasle");
				setEnabled(false);
			}
			return result;
		},
		refetchInterval: 1000,
		get enabled() {
			return enabled();
		},
	}));
	async function fetchFibResult() {
		if (!inputRef?.value) {
			return;
		}
		await fetch(`http://localhost:8001/api/fib/${inputRef.value}`, { method: "post" });
		setEnabled(true);
		// const value: { result: number } = await result.json();
		// setFibResult(value.result);
	}
	return (
		<div>
			<input ref={inputRef} />
			<Button onclick={fetchFibResult} class="btn btn-primary btn-sm ml-2 mt-2" loading={loading()}>
				Fetch Fib Result
			</Button>
			<div>result: {query.data?.result}</div>
		</div>
	);
}
