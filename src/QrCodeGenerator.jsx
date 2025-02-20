import { useState, useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import "./qrGenerator.css";

export const QrCodeGenerator = () => {
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");
  const qrRef = useRef();

  const generateQR = () => {
    if (value.trim()) {
      setResult(value);
      setValue("");
    }
  };

  const onChangeHandler = (event) => {
    setValue(event.target.value);
    setResult("");
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      generateQR();
    }
  };

  const downloadQRCode = () => {
    // Создаем временный canvas
    const canvas = document.createElement("canvas");
    const svg = qrRef.current.querySelector("svg");
    const svgData = new XMLSerializer().serializeToString(svg);
    const img = new Image();
    
    // Конвертируем SVG в base64
    const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      
      // Создаем ссылку для скачивания
      const link = document.createElement("a");
      link.download = "qr-code.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
      
      // Очищаем временные ресурсы
      URL.revokeObjectURL(url);
    };
    
    img.src = url;
  };

  return (
    <div className="container">
      <input
        type="text"
        value={value}
        placeholder="Add text here..."
        onChange={onChangeHandler}
        onKeyPress={handleKeyPress}
        className="input"
      />
      <button 
        type="button" 
        className="button" 
        onClick={generateQR}
      >
        Generate QR
      </button>
      {result !== "" && (
        <div className="qrWrapper" ref={qrRef}>
          <QRCodeSVG value={result} size={200}/>
          <button 
            type="button" 
            className="download-button"
            onClick={downloadQRCode}
          >
            Download QR Code
          </button>
        </div>
      )}
    </div>
  );
};

