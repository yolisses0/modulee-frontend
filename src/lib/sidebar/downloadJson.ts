export function downloadJson(data: unknown, fileName: string) {
	// Convert the JSON object to a string
	const jsonString = JSON.stringify(data);

	// Create a Blob with the JSON data
	const blob = new Blob([jsonString], { type: 'application/json' });

	// Create a link element
	const link = document.createElement('a');
	link.href = URL.createObjectURL(blob);

	// Set the name of the file to be downloaded
	link.download = fileName;

	// Append the link to the body (required for Firefox)
	document.body.appendChild(link);

	// Programmatically click the link to trigger the download
	link.click();

	// Remove the link from the document
	document.body.removeChild(link);
}
