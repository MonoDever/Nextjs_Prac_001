import { useState } from "react"

export default function landing() {
    const [selectedFile, setSelectedFile] = useState(null)
    const [base64Data, setBase64Data] = useState(null)

    const handleChange = async (event) => {
        const file = event.target.files[0]
        const size = file.size // แสดงเป็น bytes

        console.log(`size`, size)

        // กำหนดให้ size ใหญ่ไม่เกิน 1Mb
        if (size / 1024 > 5000) {
            alert("ไฟล์ขนาดใหญ่เกิน 5 Mb")
            return
        }
        const rawBase64 = await toBase64(event.target.files[0])
        setBase64Data(rawBase64)
        setSelectedFile(event.target.files[0])
    }

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
    });

    const b64toBlob = (b64Data, contentType = '', sliceSize = 512) => {
        const parts = b64Data.split(';base64,');
        const byteCharacters = window.atob(parts[1]);
        const byteArrays = [];

        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            const slice = byteCharacters.slice(offset, offset + sliceSize);

            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }

        const blob = new Blob(byteArrays, { type: 'application/pdf' });
        return blob;
    }

    const openPdf = async () => {
        const blob = b64toBlob(base64Data, 'application/pdf');
        const blobUrl = URL.createObjectURL(blob);
        window.open(`${blobUrl}`,'_blank')
        // window.location.href = `${blobUrl}`;
    }
    return (
        <>
            <h1>Wellcome</h1>
            <button onClick={() => openPdf()}>open</button>
            <br></br>
            <br></br>
            <input type="file" accept=".pdf" onChange={handleChange} />
        </>
    )
}