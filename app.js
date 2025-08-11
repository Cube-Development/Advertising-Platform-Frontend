const express = require('express');
const forge = require('node-forge');
const fs = require('fs');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const pfxData = fs.readFileSync('C:\\DSKEYS\\DS325079768600160003.pfx');
const password = '';
const p12 = forge.pkcs12.pkcs12FromAsn1(forge.asn1.fromDer(pfxData.toString('binary')), password);


// const keyObj = p12.getBags({bagType: forge.pki.oids.pkcs8ShroudedKeyBag})[forge.pki.oids.pkcs8ShroudedKeyBag][0];
const keyBags = p12.getBags({ bagType: forge.pki.oids.pkcs8ShroudedKeyBag });
const keyObj = keyBags[forge.pki.oids.pkcs8ShroudedKeyBag]?.[0];
const certObj = p12.getBags({bagType: forge.pki.oids.certBag})[forge.pki.oids.certBag][0];
const privateKey = keyObj.key;
const certificate = certObj.cert;

console.log(keyObj)
console.log(privateKey)

app.post('/sign', (req, res) => {
  try {
    const { documentBase64 } = req.body;
    const documentBytes = forge.util.decode64(documentBase64);

    const p7 = forge.pkcs7.createSignedData();
    p7.content = forge.util.createBuffer(documentBytes);
    p7.addCertificate(certificate);
    p7.addSigner({
      key: privateKey,
      certificate: certificate,
      digestAlgorithm: forge.pki.oids.sha256,
    });
    p7.sign();

    // Получение сериал-номера сертификата
    const signerSerialNumber = certificate.serialNumber;

    // Получение подписи в HEX
    const signatureHex = forge.util.bytesToHex(p7.rawCapture.signature);

    // PKCS#7 в base64
    const pkcs7Base64 = forge.util.encode64(forge.asn1.toDer(p7.toAsn1()).getBytes());

    res.json({
      pkcs7_64: pkcs7Base64,
      signer_serial_number: signerSerialNumber,
      signature_hex: signatureHex,
      success: true
    });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

app.listen(3001, () => {
  console.log('Sign server running on http://localhost:3001');
});


1. Получение документа
js
Копировать
Редактировать
const { documentBase64 } = req.body;
Клиент отправляет base64-кодированный документ через POST /sign.

2. Декодирование
js
Копировать
Редактировать
const documentBytes = forge.util.decode64(documentBase64);
Base64-документ декодируется обратно в байтовое представление.

3. Создание объекта подписанных данных
js
Копировать
Редактировать
const p7 = forge.pkcs7.createSignedData();
p7.content = forge.util.createBuffer(documentBytes);
Создаётся объект PKCS#7 и в него кладётся исходный документ.

4. Добавление сертификата и подписанта
js
Копировать
Редактировать
p7.addCertificate(certificate);
p7.addSigner({
  key: privateKey,
  certificate: certificate,
  digestAlgorithm: forge.pki.oids.sha256,
});
Добавляется:

сам сертификат,

подписант (ключ + сертификат),

указание, что используется алгоритм SHA-256.

5. Подписание
js
Копировать
Редактировать
p7.sign();
Формируется цифровая подпись.

6. Извлечение данных для клиента
js
Копировать
Редактировать
const signerSerialNumber = certificate.serialNumber;
const signatureHex = forge.util.bytesToHex(p7.rawCapture.signature);
const pkcs7Base64 = forge.util.encode64(forge.asn1.toDer(p7.toAsn1()).getBytes());
signerSerialNumber: серийный номер сертификата подписанта.

signatureHex: сама подпись в hex-формате (удобно для анализа).

pkcs7Base64: финальная подпись в PKCS#7, кодированная в base64.

7. Ответ клиенту
js
Копировать
Редактировать
res.json({
  pkcs7_64: pkcs7Base64,
  signer_serial_number: signerSerialNumber,
  signature_hex: signatureHex,
  success: true
});