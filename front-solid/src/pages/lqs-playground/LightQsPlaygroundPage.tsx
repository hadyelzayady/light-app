import { createEffect, createSignal } from "solid-js";
import { LightQsPlayground } from "../../components/core/lightqs-playground/LightQsPlayground";
import { QueueGeometry } from "../../components/core/queue-geometry/QueueGeometry";
import { QueuesList } from "../../components/core/queues-list/QueuesList";
import { QueueResourceDto } from "../../types/dtos/QueueResourceDto";
import styles from "./LightQsPlaygroundPage.module.css";
import { createQuery } from "@tanstack/solid-query";
import { lqsApi } from "../../api/light";
import { QueueMessageResource } from "../../types/resources/QueueMessageResource";
import { mapQueueMessageResourceToDto } from "../../mappers/resourceMapper";

export function LightQsPlaygroundPage() {
	let [currentQueue, setCurrentQueue] = createSignal<QueueResourceDto | undefined>(undefined);

	const query = createQuery(() => ({
		queryKey: ["queue"],
		queryFn: async (): Promise<QueueMessageResource[]> => {
			if (!currentQueue()?.id) {
				console.warn("QueueId is empty");
				return [];
			}
			const resp = await lqsApi.get(`/api/queues/${currentQueue()?.id}/messages`);
			console.log("data", resp.data);
			return resp.data.map(mapQueueMessageResourceToDto);
		},
		refetchInterval: 3000,
	}));
	function onDelete(messageId: string) {
		lqsApi.delete(`/api/messages/${messageId}/delete`);
	}

	return (
		<div class={styles.container}>
			<QueuesList
				onSelect={(queue) => {
					setCurrentQueue(queue);
					query.refetch();
				}}
			/>
			{currentQueue() && (
				<>
					<LightQsPlayground queueId={currentQueue()?.id} />
				</>
			)}
			<div class={styles.data}>
				<div>
					<span>Queue Messages</span>
					<QueueGeometry items={query.data} onDelete={onDelete} />
				</div>
				<div>
					<span>Consuming (in progress)</span>
					<QueueGeometry onDelete={onDelete} items={query.data?.filter((m) => m.status === "IN_PROCESS")} />
				</div>
			</div>
		</div>
	);
}
