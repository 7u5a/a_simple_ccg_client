const net = require('net');

let client = null;
let isConnected = false;

const buttonON = document.querySelector('.buttonON');
const buttonOFF = document.querySelector('.buttonOFF');
const buttonText = document.querySelector('.buttonText');
const connectBtn = document.getElementById('connect');
const sendBtn = document.getElementById('send');

updateConnectionStatus(false); // ← her

connectBtn.addEventListener('click', () => {
  if (!isConnected) {
    const ip = document.getElementById('ip').value;
    const port = parseInt(document.getElementById('port').value, 10);

    client = new net.Socket();

    client.connect(port, ip, () => {
      logStatus(`Connected to ${ip}:${port}`);
      isConnected = true;
      connectBtn.textContent = 'Disconnect';
      updateConnectionStatus(true); // ← her
    });

    client.on('data', data => {
      logStatus(`Received: ${data}`);
    });

    client.on('close', () => {
      logStatus('Connection closed');
      isConnected = false;
      connectBtn.textContent = 'Connect';
      client = null;
      updateConnectionStatus(false); // ← her
    });

    client.on('error', err => {
      logStatus(`Error: ${err.message}`);
      updateConnectionStatus(false); // ← her
    });

  } else {
    // Disconnect
    client.end();
    client.destroy(); // Sørg for den er lukket
    logStatus('Disconnected from server');
    isConnected = false;
    connectBtn.textContent = 'Connect';
    client = null;
    updateConnectionStatus(false); // ← her
  }
});

sendBtn.addEventListener('click', () => {
  const cmd = document.getElementById('command').value;
  if (client && isConnected) {
    client.write(cmd + '\r\n');
    logStatus(`Sent: ${cmd}`);
  } else {
    logStatus('Not connected.');
  }
});

function logStatus(message) {
  const status = document.getElementById('status');
  status.value += message + '\n';
  status.scrollTop = status.scrollHeight;
}

function updateConnectionStatus(connected) {
  if (connected) {
    buttonON.style.display = 'inline-block';
    buttonOFF.style.display = 'none';
    buttonText.textContent = 'Connected';
  } else {
    buttonON.style.display = 'none';
    buttonOFF.style.display = 'inline-block';
    buttonText.textContent = 'Disconnected';
  }
}
