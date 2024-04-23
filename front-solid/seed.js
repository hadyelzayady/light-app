async function seed() {
	const controls = document.getElementById("AlgorithmSpecificControls").getElementsByTagName("td");
	const insertInput = controls[0].getElementsByTagName("input")[0];
	const insertButton = controls[1].getElementsByTagName("input")[0];

	for (let i = 1; i <= 25; i++) {
		insertInput.value = i.toString();
		insertButton.click();
		await new Promise((r) => setTimeout(r, 1000));
	}
}

seed();
