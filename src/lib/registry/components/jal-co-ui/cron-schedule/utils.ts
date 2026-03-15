export const FIELD_NAMES = [
    'Minute',
    'Hour',
    'Day (Month)',
    'Month',
    'Day (Week)'
] as const;

export const FIELD_RANGES: [number, number][] = [
    [0, 59],
    [0, 23],
    [1, 31],
    [1, 12],
    [0, 6]
];

export const MONTH_NAMES = [
    '',
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
];

export const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function parseField(field: string, min: number, max: number): number[] {
    const values = new Set<number>();

    for (const part of field.split(',')) {
        const stepMatch = part.match(/^(.+)\/(\d+)$/);
        const step = stepMatch ? parseInt(stepMatch[2], 10) : 1;
        const range = stepMatch ? stepMatch[1] : part;

        if (range === '*') {
            for (let i = min; i <= max; i += step) values.add(i);
        } else if (range.includes('-')) {
            const [start, end] = range.split('-').map(Number);
            for (let i = start; i <= end; i += step) values.add(i);
        } else {
            values.add(parseInt(range, 10));
        }
    }

    return Array.from(values).sort((a, b) => a - b);
}

export function describeField(
    field: string,
    fieldIndex: number,
    _min: number,
    _max: number
): string {
    if (field === '*') return 'every';

    const values = parseField(field, _min, _max);

    if (fieldIndex === 4) {
        return values.map((v) => DAY_NAMES[v] ?? String(v)).join(', ');
    }
    if (fieldIndex === 3) {
        return values.map((v) => MONTH_NAMES[v] ?? String(v)).join(', ');
    }

    if (field.startsWith('*/')) {
        return `every ${field.slice(2)}`;
    }

    if (values.length <= 5) return values.join(', ');
    return `${values.length} values`;
}

export function humanReadable(fields: string[]): string {
    const [minute, hour, dom, month, dow] = fields;

    const parts: string[] = [];

    if (minute.startsWith('*/')) {
        parts.push(`Every ${minute.slice(2)} minutes`);
    } else if (hour.startsWith('*/')) {
        parts.push(`Every ${hour.slice(2)} hours`);
        if (minute !== '*' && minute !== '0') {
            parts[0] += ` at minute ${minute}`;
        }
    } else if (minute !== '*' && hour !== '*') {
        const hours = parseField(hour, 0, 23);
        const minutes = parseField(minute, 0, 59);

        if (hours.length === 1 && minutes.length === 1) {
            parts.push(`At ${formatTime(hours[0], minutes[0])}`);
        } else if (hours.length <= 3 && minutes.length === 1) {
            const times = hours.map((h) => formatTime(h, minutes[0]));
            parts.push(`At ${joinList(times)}`);
        } else {
            parts.push(`At minute ${minute} past hour ${hour}`);
        }
    } else if (minute !== '*') {
        parts.push(`At minute ${minute}`);
    } else {
        parts.push('Every minute');
    }

    if (dom !== '*') {
        const days = parseField(dom, 1, 31);
        parts.push(`on day ${joinList(days.map(String))} of the month`);
    }

    if (month !== '*') {
        const months = parseField(month, 1, 12);
        parts.push(
            `in ${joinList(months.map((m) => MONTH_NAMES[m] ?? String(m)))}`
        );
    }

    if (dow !== '*') {
        const days = parseField(dow, 0, 6);
        const dayNames = days.map((d) => DAY_NAMES[d] ?? String(d));
        if (isConsecutiveRange(days) && days.length > 2) {
            parts.push(
                `${dayNames[0]} through ${dayNames[dayNames.length - 1]}`
            );
        } else {
            parts.push(joinList(dayNames));
        }
    }

    return parts.join(', ');
}

export function formatTime(hour: number, minute: number): string {
    const period = hour >= 12 ? 'PM' : 'AM';
    const h = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    const m = minute.toString().padStart(2, '0');
    return `${h}:${m} ${period}`;
}

export function joinList(items: string[]): string {
    if (items.length <= 1) return items[0] ?? '';
    if (items.length === 2) return `${items[0]} and ${items[1]}`;
    return `${items.slice(0, -1).join(', ')}, and ${items[items.length - 1]}`;
}

export function isConsecutiveRange(values: number[]): boolean {
    for (let i = 1; i < values.length; i++) {
        if (values[i] !== values[i - 1] + 1) return false;
    }
    return true;
}

export function getNextRuns(
    fields: string[],
    count: number,
    from: Date
): Date[] {
    const runs: Date[] = [];
    const maxIterations = 366 * 24 * 60;
    const cursor = new Date(from);

    cursor.setSeconds(0, 0);
    cursor.setMinutes(cursor.getMinutes() + 1);

    const minuteValues = parseField(fields[0], 0, 59);
    const hourValues = parseField(fields[1], 0, 23);
    const domValues = parseField(fields[2], 1, 31);
    const monthValues = parseField(fields[3], 1, 12);
    const dowValues = parseField(fields[4], 0, 6);

    const minuteSet = new Set(minuteValues);
    const hourSet = new Set(hourValues);
    const domSet = fields[2] === '*' ? null : new Set(domValues);
    const monthSet = fields[3] === '*' ? null : new Set(monthValues);
    const dowSet = fields[4] === '*' ? null : new Set(dowValues);

    for (let i = 0; i < maxIterations && runs.length < count; i++) {
        const m = cursor.getMinutes();
        const h = cursor.getHours();
        const d = cursor.getDate();
        const mo = cursor.getMonth() + 1;
        const w = cursor.getDay();

        const matchMinute = minuteSet.has(m);
        const matchHour = hourSet.has(h);
        const matchDom = domSet === null || domSet.has(d);
        const matchMonth = monthSet === null || monthSet.has(mo);
        const matchDow = dowSet === null || dowSet.has(w);

        if (matchMinute && matchHour && matchDom && matchMonth && matchDow) {
            runs.push(new Date(cursor));
        }

        cursor.setMinutes(cursor.getMinutes() + 1);
    }

    return runs;
}

export function formatNextRun(date: Date): string {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
    ];
    const day = days[date.getDay()];
    const month = months[date.getMonth()];
    const d = date.getDate();
    const h = date.getHours();
    const m = date.getMinutes().toString().padStart(2, '0');
    const period = h >= 12 ? 'PM' : 'AM';
    const hour = h === 0 ? 12 : h > 12 ? h - 12 : h;

    return `${day}, ${month} ${d} at ${hour}:${m} ${period}`;
}
