const net = require('net');

let client = null;
let isConnected = false;

const connectBtn = document.getElementById('connect');
const sendBtn = document.getElementById('send');

connectBtn.addEventListener('click', () => {
  if (!isConnected) {
    const ip = document.getElementById('ip').value;
    const port = parseInt(document.getElementById('port').value, 10);

    client = new net.Socket();

    client.connect(port, ip, () => {
      logStatus(`Connected to ${ip}:${port}`);
      isConnected = true;
      connectBtn.textContent = 'Disconnect';
    });

    client.on('data', data => {
      logStatus(`Received: ${data}`);
    });

    client.on('close', () => {
      logStatus('Connection closed');
      isConnected = false;
      connectBtn.textContent = 'Connect';
      client = null;
    });

    client.on('error', err => {
      logStatus(`Error: ${err.message}`);
    });

  } else {
    // Disconnect
    client.end();
    client.destroy(); // Sørg for den er lukket
    logStatus('Disconnected from server');
    isConnected = false;
    connectBtn.textContent = 'Connect';
    client = null;
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
