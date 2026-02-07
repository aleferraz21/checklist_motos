document.addEventListener('DOMContentLoaded', () => {
    const html5QrCode = new Html5Qrcode("reader");
    const startButton = document.getElementById('qr-code'); //pega o elemento com o id "qr-code"
    const readerDiv = document.getElementById('reader'); //pega o elemento com o id "reader"
    const resultDiv = document.getElementById('result');

    startButton.addEventListener('click', () => {
        readerDiv.style.display = 'block';
        resultDiv.innerText = "Aguardando leitura...";

        const qrCodeSuccessCallback = (decodedText) => {
            // 1. Extrai a informação e exibe na tela
            resultDiv.innerHTML = `<strong>Moto Identificada:</strong><br>${decodedText}`;
            
            // 2. Fecha a câmera automaticamente
            html5QrCode.stop().then(() => {
                readerDiv.style.display = 'none';
                console.log("Câmera encerrada após leitura.");
                
                // 3. Validação e continuidade
                validarMoto(decodedText);
            });
        };

        const config = { fps: 10, qrbox: { width: 250, height: 250 } };
        html5QrCode.start({ facingMode: { ideal: "environment" } }, config, qrCodeSuccessCallback)
        .catch(err => alert("Erro: " + err));
    });

    function validarMoto(dados) {
        // Aqui você pode verificar se os dados contêm o que você precisa
        if (dados.includes("Placa")) {
            alert("Moto validada com sucesso! Você já pode iniciar o checklist.");
            // Aqui você pode liberar o botão do checklist ou redirecionar
            // window.location.href = "aba_de_checklist.html";
        } else {
            alert("QR Code inválido. Certifique-se de estar lendo o código da moto.");
        }
    }
});