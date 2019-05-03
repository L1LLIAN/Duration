const allMatchesReg: RegExp = /(\d+)\s*([A-Za-z]*)/g;
const timeReg: RegExp = /(\d+)/g;
const timeUnitReg: RegExp = /([A-Za-z]+)/g;
const allowedTimeUnits: string[] = ['y', 'mo', 'w', 'd', 'h', 'm', 's', 'ms'];

export function parse(value: string): number {
    const matches: RegExpMatchArray | null = value.match(allMatchesReg);
    let total: number | null = 0;

    if (matches === null) {
        return -1;
    }

    for (let i of matches) {
        const timeMatch: RegExpMatchArray | null = i.match(timeReg);
        const timeUnitMatch: RegExpMatchArray | null = i.match(timeUnitReg);

        if (timeMatch === null || timeUnitMatch === null) {
            total = null;
            break;
        }

        const time: number = Number(timeMatch[0]);
        const timeUnit: string = timeUnitMatch[0];

        if (isNaN(time)) {
            total = null;
        } else if (total !== null) {
            total += time * parseTimeUnit(timeUnit);
        }
    }

    if (total !== null) {
        return total;
    } else {
        return -1;
    }
}

export function validate(value: string): boolean {
    const matches = value.match(allMatchesReg);

    if (matches === null) {
        return false;
    }

    for (let i of matches) {
        const timeMatch: RegExpMatchArray | null = i.match(timeReg);
        const timeUnitMatch: RegExpMatchArray | null = i.match(timeUnitReg);

        if (timeMatch === null || timeUnitMatch === null) {
            return false;
        }

        // There shouldn't be more than one item in each array.
        if (timeMatch.length !== 1) {
            return false;
        }

        if (timeUnitMatch.length !== 1) {
            return false;
        }

        const time: number = parseInt(timeMatch[0]);
        const timeUnit: string = timeUnitMatch[0];

        // Make sure the time and time unit are both valid.
        if (!Number.isInteger(Number(time))) {
            return false;
        }

        if (!allowedTimeUnits.includes(timeUnit)) {
            return false;
        }
    }

    return true;
}

function parseTimeUnit(value: string): number {
    switch (value) {
        case "y": {
            return 24 * 60 * 60 * 365 * 1000;
        }

        case "mo": {
            return 30 * 24 * 60 * 60 * 1000;
        }

        case "w": {
            return 7 * 24 * 60 * 60 * 1000;
        }

        case "d": {
            return 24 * 60 * 60 * 1000;
        }

        case "h": {
            return 60 * 60 * 1000;
        }

        case "m": {
            return 60 * 1000;
        }

        case "s": {
            return 1000;
        }

        case "ms": {
            return 1;
        }

        default: {
            return -1;
        }
    }
}