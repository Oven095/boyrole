const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// แยกสถานะของแต่ละปุ่ม
let systemStates = {
    upgradeEnabled: false,
    farmEnabled: false
};

// API สำหรับรับค่าปุ่มอัปเกรด
app.post('/toggle-upgrade', (req, res) => {
    if (typeof req.body.enabled === 'boolean') {
        systemStates.upgradeEnabled = req.body.enabled;
        console.log(`[STATUS] Stand Upgrade: ${systemStates.upgradeEnabled ? 'OPEN' : 'CLOSED'}`);
        res.json({ success: true, enabled: systemStates.upgradeEnabled });
    } else {
        res.status(400).json({ success: false, message: 'Invalid format' });
    }
});

// API สำหรับรับค่าปุ่มฟาร์ม
app.post('/toggle-farm', (req, res) => {
    if (typeof req.body.enabled === 'boolean') {
        systemStates.farmEnabled = req.body.enabled;
        console.log(`[STATUS] Auto Farm: ${systemStates.farmEnabled ? 'OPEN' : 'CLOSED'}`);
        res.json({ success: true, enabled: systemStates.farmEnabled });
    } else {
        res.status(400).json({ success: false, message: 'Invalid format' });
    }
});

// API สำหรับให้ Executor ดึงสถานะทั้งหมด
app.get('/status', (req, res) => {
    res.json(systemStates);
});

app.listen(8080, () => {
    console.log('Local Bridge Server is running on http://localhost:8080');
});
