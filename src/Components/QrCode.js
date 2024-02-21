import React,{useState} from 'react';
import "../Components/QrCode.css";

const QrCode = () => {
  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(false);
  const [qrData, setQrData] = useState("https://www.linkedin.com/in/ravi-chandran-r/");
  const [qrSize, setQrSize] = useState("150");
  const generateQr = async() => {
    setLoading(true);
    try{
      const url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(qrData)}`;
      setImg(url);
    } catch(error){
      console.log("Error generating QR Code", error);
    } finally{
      setLoading(false);
    }
  }
  const downloadQr = () => {
    fetch(img)
    .then(response => response.blob())
    .then((blob) => {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "qrcode.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }).catch((error) => {
      console.error("Error downloading QR Code", error);
    })
  }
  return (
    <div className='qr-code-container'>
      <h1>QR Code Generator</h1>
      {img && <img src={img} className='qr-code-img'/>}
      {loading && <p style={{textAlign: 'center', fontSize: 18}}>Please wait...</p>}
      <label htmlFor='dataInput' className='input-label'>Data for QR Code:</label>
      <input type='text' value={qrData} onChange={(e) => setQrData(e.target.value)} placeholder='Enter data for QR Code' id="dataInput"/>
      <label htmlFor='sizeInput' className='input-label'>Image Size (e.g., 150):</label>
      <input type='text' value={qrSize} onChange={(e) => setQrSize(e.target.value)} placeholder='Enter Image Size' id="sizeInput"/>
      <button className='generate-button' disabled={loading} onClick={generateQr}>Generate QR Code</button>
      <button className='download-button' onClick={downloadQr}>Download QR Code</button>
    </div>
  )
}

export default QrCode;