const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// เก็บสถานะแยกตาม User ID
let userStates = {};

// ฟังก์ชันดึงหรือสร้าง State สำหรับ User
function getUserState(id) {
    if (!userStates[id]) {
        userStates[id] = { upgradeEnabled: false, farmEnabled: false, sellEnabled: false };
    }
    return userStates[id];
}

// API ปรับ Toggle โดยรับ userId มาด้วย
app.post('/toggle-feature', (req, res) => {
    const { userId, feature, enabled } = req.body;
    if (!userId || typeof enabled !== 'boolean') {
        return res.status(400).json({ success: false, message: 'Invalid data' });
    }

    const state = getUserState(userId);
    if (feature === 'upgrade') state.upgradeEnabled = enabled;
    if (feature === 'farm') state.farmEnabled = enabled;
    if (feature === 'sell') state.sellEnabled = enabled;

    console.log(`[USER: ${userId}] ${feature}: ${enabled}`);
    res.json({ success: true, state });
});

// API สำหรับ Executor ดึงสถานะตาม userId
app.get('/status/:userId', (req, res) => {
    const userId = req.params.userId;
    res.json(getUserState(userId));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));