import { JSX } from "solid-js";
import { lightApi, lqsApi } from "../../../api/light";
import styles from "./LightQsPlayground.module.css";
interface Props {
	queueId?: string;
}
export function LightQsPlayground(props: Props) {
	const onKeyPress: JSX.EventHandler<HTMLInputElement, KeyboardEvent> = (e) => {
		console.log("eeee", e);
		if (e.key === "Enter") {
			lqsApi.post("/api/messages/produce", {
				queueId: props.queueId,
				body: e.currentTarget.value,
			});
		}
	};

	function consume() {
		console.log("quue", props.queueId);
		lqsApi.post("/api/messages/consume", {
			queueId: props.queueId,
		});
	}

	function deleteMessages() {
		lqsApi.delete(`/api/messages/${props.queueId}/delete`);
	}

	return (
		<div class={`grid ${styles.container}`}>
			<input
				onkeypress={onKeyPress}
				type="text"
				placeholder="message payload"
				class="input input-bordered w-full max-w-xs"
			/>
			<button class="btn" onClick={consume}>
				Consume
			</button>
			<button class="btn" onClick={deleteMessages}>
				Delete
			</button>
		</div>
	);
}
