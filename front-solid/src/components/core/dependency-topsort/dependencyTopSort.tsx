import { lightApi } from "../../../api/light";
import { createSignal } from "solid-js";
import toast from "solid-toast";
import { Button } from "../../shared/button/Button";

export function DependencyTopSort() {
	const [treeData, setTreeData] = createSignal<string[]>([]);
	const [loading, setLoading] = createSignal(false);
	let inputRef: HTMLInputElement | undefined;
	async function fetchFibResult() {
		if (!inputRef?.value) {
			return;
		}
		try {
			setLoading(true);
			const result = await lightApi.get(`/?name=${inputRef.value}`);
			console.log("result", result.data, Object.keys(result.data));
			setTreeData(result.data);
		} catch (x) {
			toast(`error ${JSON.stringify(x)}`);
		} finally {
			setLoading(false);
		}
	}

	return (
		<div>
			<div class="form-control w-full max-w-xs">
				<label class="label">
					<span class="label-text">Enter Package Name</span>
				</label>
				<input ref={inputRef} type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs" />
			</div>
			<Button onclick={fetchFibResult} class="btn btn-primary btn-sm ml-2 mt-2" loading={loading()}>
				Fetch Package DependencyTopSort
			</Button>
			<ol>
				{treeData().map((key) => {
					return <li>{key}</li>;
				})}
			</ol>
		</div>
	);
}
