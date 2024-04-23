import { For, JSX } from "solid-js";
import { QueueMessageDto } from "../../../types/dtos/QueueMessageDto";

export function QueueGeometry(props: { items?: QueueMessageDto[]; onDelete?: (id: string) => void }): JSX.Element {
	console.log(props);
	return (
		<div>
			<For each={props.items}>
				{(item) => (
					<div class="flex justify-between">
						{item.body}
						{props.onDelete ? <button onClick={() => props.onDelete?.(item.id)}>Delete</button> : null}
					</div>
				)}
			</For>
		</div>
	);
}
