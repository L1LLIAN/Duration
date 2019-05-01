export function parse(value: string): number {
    const matches = value.match(/(\d+)\s*([A-Za-z]+)/g);
    let total: number | null = -1;

    if (matches === null) {
        return -1;
    }

    for (let dur of matches) {
        const match1 = dur.match(/(\d+)/g);
        const match2 = dur.match(/([A-Za-z]+)/g);

        if (match1 === null || match2 === null) {
            total = null;
            break;
        }

        const tempNum = parseInt(match1[0]);
        const tempStr = match2[0];

        if (isNaN(tempNum)) {
            total = null;
        } else if (total !== null) {
            total += tempNum * determine(tempStr);
        }
    }

    if (total !== null) {
        return total;
    } else {
        return -1;
    }
}

function determine(value: string): number {
    switch (value) {
        case 'y': {
            return 24 * 60 * 60 * 365 * 1000;
        }

        case 'mo': {
            return 30 * 24 * 60 * 60 * 1000;
        }

        case 'w': {
            return 7 * 24 * 60 * 60 * 1000;
        }

        case 'd': {
            return 24 * 60 * 60 * 1000;
        }

        case 'h': {
            return 60 * 60 * 1000;
        }

        case 'm': {
            return 60 * 1000;
        }

        case 's': {
            return 1000;
        }

        case 'ms': {
            return 1;
        }

        default: {
            return -1;
        }
    }
}