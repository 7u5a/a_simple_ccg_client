# A Simple CasparCG Client – CasparCG Control App

Et simpelt Electron-baseret CasparCG TCP kontrolværktøj. Appen tillader dig at oprette forbindelse til en CasparCG server og sende manuelle kommandoer.

---

## 🖥 Funktioner

- Forbind til en CasparCG server via TCP
- Send manuelle kommandoer
- Se svar direkte i grænsefladen
- Appen kan pakkes til Windows, macOS og Linux

---

## 📦 Installation (Udvikling)

1. **Klon projektet**

```bash
git clone https://github.com/7u5a/a_simple_ccg_client.git
cd a_simple_ccg_client
```

2. **Installer afhængigheder**
```bash
npm install
```

3. **Start appen i udviklingstilstand**
```bash
npm start
```

## 🛠 Byg som en app

Sørg for at Electron Builder er installeret globalt (eller via 'devDependencies').
```bash
npm run dist
```
Output findet i 'dist/'-mappen
