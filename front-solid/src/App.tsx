import { type Component } from "solid-js";

import { Router, Routes, Route } from "@solidjs/router";
import { Layout } from "./layouts/Layout";
import { HomePage } from "./pages/home/HomePage";
import { TopSortPage } from "./pages/top-sort/TopSortPage";
import { FibCalcPage } from "./pages/fib-calc/FibCalcPage";
import { QueryClient, QueryClientProvider } from "@tanstack/solid-query";
import { LightQSPage } from "./pages/light-qs/LightQSPage";
import { LightQsPlaygroundPage } from "./pages/lqs-playground/LightQsPlaygroundPage";
import { BStar } from "./components/core/b-start/BStar";

const queryClient = new QueryClient();
const App: Component = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<Router>
				<Layout>
					<Routes>
						<Route path="/" component={HomePage} />
						<Route path="/algorithms/top-sort" component={TopSortPage} />
						<Route path="/algorithms/fib-calc" component={FibCalcPage} />
						<Route path="/cloud/lqs" component={LightQSPage} />
						<Route path="/algorithms/b-star" component={BStar} />
						<Route path="/cloud/lqs-playground" component={LightQsPlaygroundPage} />
					</Routes>
				</Layout>
			</Router>
		</QueryClientProvider>
	);
};

export default App;
