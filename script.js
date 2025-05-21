async function convertPDF() {
    const fileInput = document.getElementById('pdf-upload');
    const output = document.getElementById('output-text');
    output.value = '';

    if (!fileInput.files.length) {
        alert('Please upload a PDF file.');
        return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = async function () {
        const typedArray = new Uint8Array(this.result);
        const pdf = await pdfjsLib.getDocument(typedArray).promise;
        let textContent = '';

        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
            const page = await pdf.getPage(pageNum);
            const content = await page.getTextContent();
            const strings = content.items.map(item => item.str);
            textContent += strings.join(' ') + '\n\n';
        }

        output.value = textContent;
    };

    reader.readAsArrayBuffer(file);
}
