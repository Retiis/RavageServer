const { v4: uuid } = require("uuid");

const entries = new Map();

function toResponse(entry) {
    if (!entry.Ready && entry.ReadyAt <= Date.now()) {
        entry.Ready = true;
    }

    const waitingEntries = [...entries.values()]
        .filter(item => !item.Ready)
        .sort((left, right) => left.Sequence - right.Sequence);
    const position = entry.Ready
        ? 0
        : waitingEntries.findIndex(item => item.Token === entry.Token) + 1;

    return {
        Token: entry.Token,
        QueuedAt: entry.QueuedAt,
        Position: position,
        DelayMS: Math.max(0, entry.ReadyAt - Date.now()),
        Ready: entry.Ready
    };
}

function joinQueue(token = uuid()) {
    let entry = entries.get(token);
    if (!entry) {
        const now = Date.now();
        entry = {
            Token: token,
            QueuedAt: new Date(now).toISOString(),
            ReadyAt: now + process.env.QUEUE_MS,
            Ready: false,
            Sequence: now + entries.size
        };
        entries.set(token, entry);
    }

    return toResponse(entry);
}

function getQueueStatus(token) {
    const entry = entries.get(token);
    return entry ? toResponse(entry) : null;
}

function leaveQueue(token) {
    return entries.delete(token);
}

const worker = setInterval(() => {
    const now = Date.now();
    for (const entry of entries.values()) {
        if (!entry.Ready && entry.ReadyAt <= now) {
            entry.Ready = true;
        }
    }
}, 1000);

worker.unref();

module.exports = { joinQueue, getQueueStatus, leaveQueue };