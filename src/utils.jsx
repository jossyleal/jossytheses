class Utils {

    static getElements(elements) {
        const elementMap = {};
        for (const element of elements) {
            elementMap[element.atomicNumber] = element;
        }
        return elementMap;
    }

    static getFamilies(elements) {
        const families = {};
        for (const element of elements) {
            if (element.family !== undefined && element.family !== '') {
                if (families[element.family] === undefined) {
                    families[element.family] = [];
                }
                families[element.family].push(element);
            }
        }
        return families;
    }

    static getShells(elements) {
        const shells = {};
        for (const element of elements) {
            if (element.shell !== undefined && element.shell !== '') {
                if (shells[element.shell] === undefined) {
                    shells[element.shell] = [];
                }
                shells[element.shell].push(element);
            }
        }
        return shells;
    }

    static isValidAtomicNumber(atomicNumber) {
        return atomicNumber && atomicNumber >= 1 && atomicNumber <= 118;
    }

    static getElementByAtomicNumber(atomicNumber, elements) {
        if (atomicNumber === undefined) {
            return undefined;
        }
        for (const element of elements) {
            if (element.atomicNumber === atomicNumber) {
                return element;
            }
        }
        return undefined;
    }

    static isValidElementName(name, elements) {
        if (name === undefined) {
            return false;
        }
        for (const element of elements) {
            if (element.name.toLowerCase() === name.toLowerCase()) {
                return true;
            }
        }
        return false;
    }

    static getElementByName(name, elements) {
        if (name === undefined) {
            return undefined;
        }
        for (const element of elements) {
            if (element.name.toLowerCase() === name.toLowerCase()) {
                return element;
            }
        }
        return undefined;
    }

    static isValidElementSymbol(symbol, elements) {
        if (symbol === undefined) {
            return false;
        }
        for (const element of elements) {
            if (element.symbol.toLowerCase() === symbol.toLowerCase()) {
                return true;
            }
        }
        return false;
    }

    static getElementBySymbol(symbol, elements) {
        if (symbol === undefined) {
            return undefined;
        }
        for (const element of elements) {
            if (element.symbol.toLowerCase() === symbol.toLowerCase()) {
                return element;
            }
        }
        return undefined;
    }

    static isBottomSection(atomicNumber) {
        // Lanthanide or Actinide
        return (atomicNumber >= 57 && atomicNumber <= 71) || (atomicNumber >= 89 && atomicNumber <= 103);
    }

    static getValuesForElementField(elements, fieldName, formatter) {
        return elements.map(e => formatter !== undefined ? formatter(e[fieldName]) : e[fieldName]);
    }

    static getMaxValue(values) {
        var maxVal = Number.MIN_VALUE;
        for (let v of values) {
            if (v !== undefined && v > maxVal) {
                maxVal = v;
            }
        }
        return maxVal;
    }

    static getMinValue(values) {
        var minVal = Number.MAX_VALUE;
        for (let v of values) {
            if (v !== undefined && v < minVal) {
                minVal = v;
            }
        }
        return minVal;
    }

    static getMeterValue(value, config) {
        if (config && config.maxValue !== undefined && config.minValue !== undefined && value !== undefined) {
            const meterValue = (value - config.minValue) / (config.maxValue - config.minValue);
            return Math.max(Math.min(meterValue, 1.0), 0.0);
        }
        return undefined;
    }

    static parseNumber(value, unitsLength) {
        var parseNumber = undefined;
        if (value !== undefined && unitsLength !== undefined && value.length > unitsLength) {
            parseNumber = Number(value.substring(0, value.length - unitsLength));
        } else if (value !== undefined) {
            parseNumber = Number(value);
        }
        if (parseNumber !== undefined && !isNaN(parseNumber)) {
            return parseNumber;
        }
        return undefined;
    }

    static getBucketValue(meterValue, buckets) {
        const bucket = Math.floor(meterValue * buckets);
        if (bucket === buckets) {
            return bucket - 1;
        }
        return bucket;
    }

    static chainSort(o1, o2, sorts) {
        for (let sort of sorts) {
            const res = sort(o1, o2);
            if (res !== undefined && res !== 0 && !isNaN(res)) {
                return res;
            }
        }
        return 0;
    }

}

export default Utils;