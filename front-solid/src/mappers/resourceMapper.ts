import { QueueMessageDto } from "../types/dtos/QueueMessageDto";
import { QueueResourceDto } from "../types/dtos/QueueResourceDto";
import { QueueMessageResource } from "../types/resources/QueueMessageResource";
import { QueueResource } from "../types/resources/QueueResource";

export function mapQueueMessageResourceToDto(resource: QueueMessageResource): QueueMessageDto {
	return {
		id: resource.id,
		body: resource.body,
		status: resource.status,
	};
}

export function mapQueueResourceToDto(resource: QueueResource): QueueResourceDto {
	return {
		id: resource.id,
		name: resource.name,
	};
}
