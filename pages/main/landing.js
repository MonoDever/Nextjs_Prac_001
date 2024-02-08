import axios from "axios"
import { useState } from "react"
import {v1 as uuidv1} from "uuid"

export default function landing() {
    const [selectedFile, setSelectedFile] = useState(null)
    const [base64Data, setBase64Data] = useState(null)

    const handleChange = async (event) => {
        const file = event.target.files[0]
        const size = file.size // แสดงเป็น bytes

        console.log(`size`, size)
        console.log(`file`, file)

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

        // const blob = new Blob(byteArrays, { type: 'application/pdf' });
        const blob = new Blob(byteArrays, { type: contentType });
        return blob;
    }

    const openPdf = async () => {
        // const blob = b64toBlob(base64Data, 'application/pdf');
        const blob = b64toBlob(base64Data, 'application/pdf');
        console.log(blob)
        const blobUrl = URL.createObjectURL(blob);
        window.open(`${blobUrl}`,'_blank')
        // window.location.href = `${blobUrl}`;
    }

    const testRawPDF = async () =>{
        var rawpdf = await axios.get('https://do62001-smp-be-ptt-vbd-service-sit.apps.ocpdev.pttdigital.com/file/downloadGateway/24ad0d00-b9a4-11ee-a2bd-ab31b56eff45',
        {responseType:'blob',headers:{Authorization:'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaWQiOiJhMGJlNTljNS02YWE5LTRjZjItYTJiYy0yNzg2NGRmZTRkMzMiLCJzdWIiOiIwMTA1NTQ5MDc2NDk2IiwiYWNyIjoiQWNjb3VudFZNIiwidXNlcm5hbWUiOiIwMTA1NTQ5MDc2NDk2IiwibmFtZVRoIjoi4Lia4Lij4Li04Lip4Lix4LiXIOC4nuC4teC4l-C4teC4l-C4tSDguJTguLTguIjguLTguJXguK3guKUg4LmC4LiL4Lil4Li54LiK4Lix4LmI4LiZIOC4iOC4s-C4geC4seC4lCIsIm5hbWVFbmciOiJQVFQgRGlnaXRhbCBTb2x1dGlvbnMgQ29tcGFueSBMaW1pdGVkIiwicm9sZXMiOls1XSwidHhMb2dpbklkIjo1OTI1LCJ2bSI6eyJ2YXRSZWdpc3RyYXRpb25ObyI6IjAxMDU1NDkwNzY0OTYiLCJ2ZW5kb3JDb2RlIjoiUEYwMDE0IiwidmVuZG9yVHlwZSI6IjIiLCJlbWFpbCI6InZtdGVzdDEyMzQ1Njc4QGdtYWlsLmNvbSJ9LCJpYXQiOjE3MDY2NzM1NDcsImV4cCI6MTcwNjc1OTk0N30.dRORVqWrU2UE_QypYhnG3xBI9lMB4hWp-a4xSbsQjd8'}})
        const newBlob = new Blob([rawpdf.data], { type: 'application/pdf' })
        window.open(URL.createObjectURL(newBlob))
        
        /* ใช้งานได้
        const file = await blobToFile(rawpdf.data,'test1123.pdf');
        const rawBase64 = await toBase64(file);
        const blobb = await b64toBlob(rawBase64,'application/pdf');
        const blobUrl = URL.createObjectURL(blobb);
        window.open(blobUrl,'_blank')
        */
    }

    function blobToFile(theBlob, fileName){
        //A Blob() is almost a File() - it's just missing the two properties below which we will add
        theBlob.lastModifiedDate = new Date();
        theBlob.name = fileName;
        return theBlob;
      }

    const genUUIDv1 = () => {
        alert(uuidv1());
    }

    return (
        <>
            <h1>Wellcome</h1>
            <button onClick={() => openPdf()}>open</button>
            <br></br>
            <br></br>
            <input type="file" accept=".pdf" onChange={handleChange} />
            <br></br>
            <button onClick={() => testRawPDF()}>test</button>
            <br></br>
            <button onClick={() => genUUIDv1()}>genuuidv1</button>
        </>
    )
}