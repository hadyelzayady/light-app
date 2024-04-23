import { DependencyTopSort } from "../../components/core/dependency-topsort/dependencyTopSort";
import { Header } from "../../components/shared/headers/Header";

export function TopSortPage() {
	return (
		<div>
			<Header.h2>Dependency Top Sort</Header.h2>
			<DependencyTopSort />
		</div>
	);
}
