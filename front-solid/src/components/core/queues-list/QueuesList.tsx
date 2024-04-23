import { createQuery } from "@tanstack/solid-query";
import { QueueResourceDto } from "../../../types/dtos/QueueResourceDto";
import { mapQueueResourceToDto } from "../../../mappers/resourceMapper";
import { lqsApi } from "../../../api/light";

interface Props {
	onSelect: (queue?: QueueResourceDto) => void;
}
export function QueuesList(props: Props) {
	const query = createQuery<QueueResourceDto[]>(() => {
		return {
			queryKey: ["queues"],
			queryFn: async () => {
				const resp = await lqsApi.get<QueueResourceDto[]>(`/api/queues/all`);
				return resp.data.map(mapQueueResourceToDto);
			},
		};
	});

	console.log("outisd3");
	function onSelect(e: Event & { target: HTMLSelectElement; currentTarget: HTMLSelectElement }) {
		const queue = query.data?.find((q) => q.id === e.target.value);
		props.onSelect(queue);
	}
	return (
		<select class="select select-primary w-full max-w-xs" onchange={onSelect}>
			<option disabled selected>
				Select Queue
			</option>
			{query.data?.map((queue) => {
				return <option value={queue.id}>{queue.name}</option>;
			})}
		</select>
	);
}
