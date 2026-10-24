const { v4: uuid } = require("uuid");

const entries = new Map();

let nextSequence = 0;
let nextReadyAt = 0;

function toResponse(entry) {
    const now = Date.now();
    if (!entry.Ready && entry.ReadyAt <= now) entry.Ready = true;

    const waitingEntries = [...entries.values()]
        .filter(item => !item.Ready)
        .sort((a, b) => a.Sequence - b.Sequence);
    const position = entry.Ready
        ? 0
        : waitingEntries.findIndex(item => item.Token === entry.Token) + 1;

    return {
        Token: entry.Token,
        QueuedAt: entry.QueuedAt,
        Position: position,
        DelayMS: Math.max(0, entry.ReadyAt - now),
        Ready: entry.Ready
    };
}

function joinQueue(token = uuid()) {
    let entry = entries.get(token);

    if (!entry) {
        const now = Date.now();
        const readyAt = Math.max(now, nextReadyAt);

        entry = {
            Token: token,
            QueuedAt: new Date(now).toISOString(),
            ReadyAt: readyAt,
            Ready: false,
            Sequence: nextSequence++
        };

        nextReadyAt = readyAt + process.env.QUEUE_MS;
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

setInterval(() => {
    const now = Date.now();
    for (const entry of entries.values()) {
        if (!entry.Ready && entry.ReadyAt <= now) {
            entry.Ready = true;
        }
    }
}, 250);

module.exports = { joinQueue, getQueueStatus, leaveQueue };