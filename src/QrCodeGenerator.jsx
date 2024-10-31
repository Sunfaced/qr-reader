import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import "./qrGenerator.css";

export const QrCodeGenerator = () => {
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");

  const onClickHandler = (event) => {
    setResult(value);
    setValue("");
  };

  const onChangeHandler = (event) => {
    setValue(event.target.value);
    setResult("");
  };

  return (
    <div className="container">
      <input
        type="text"
        value={value}
        placeholder="Add text here..."
        onChange={onChangeHandler}
        className="input"
      />
      <button type="button" className="button" onClick={onClickHandler}>
        Generate QR
      </button>
      {result !== "" && (
        <div className="qrWrapper">
          <QRCodeSVG value={result} size={200}/>
        </div>
      )}
    </div>
  );
};
