import React, {FunctionComponentElement} from 'react';
import {LatLngExpression, Polyline} from "leaflet";
import GeoUtil from 'leaflet-geometryutil';

interface MultiProviderProps {
    children: any;
    providers: FunctionComponentElement<any>[];
}

const MultiProvider = (props: MultiProviderProps) => {
    let content = props.children;

    // Turn object into an array
    // const numberOfProviders = props.providers.size;
    const numberOfProviders = props.providers.length;

    if (!numberOfProviders) {
        // Providers prop is empty, r
        return content;
    }

    props.providers.forEach((provider) => {
        content = React.cloneElement(provider, provider.props, content);
    });

    return content;
}

export default MultiProvider;


export function zfill(value: number, nDigits: number) {
    return (1e15 + value + '').slice(-nDigits);
}

export function getAge(birthday: Date) {
    let ageDifMs = Date.now() - birthday.getTime();
    let ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

export abstract class DateUtils {
    static setDate(date: Date, newDate: Date): Date {
        date.setFullYear(newDate.getFullYear(), newDate.getMonth(), newDate.getDate());
        return date;
    }

    static setTime(date: Date, time: string): Date {
        const [hS, mS] = time.split(':');
        date.setHours(parseInt(hS), parseInt(mS));
        return date;
    }

    static dayIsBefore(dateA: Date, dateB: Date): boolean {
        if (dateA.getFullYear() < dateB.getFullYear()) {
            return true;
        }
        if (dateA.getMonth() < dateB.getMonth()) {
            return true;
        }

        return dateA.getDate() < dateB.getDate();

    }
}

export abstract class StringFormatters {
    static numeric(num: string): string {
        return num.match(/[0-9]*/g)?.join('') ?? '';
    }

    static phone(num: string): string {
        num = num.replaceAll(/[()\-\s]/g, '');
        if (num.startsWith('+') && num.length === 12) {
            num = '0' + num.substring(4);
        }
        num = num.match(/[0-9]*/g)?.join('') ?? '';
        return num;
    }
}

export abstract class DateFormatters {
    static weekdays = ['Nedelja', 'Ponedeljek', 'Torek', 'Sreda', 'Četrtek', 'Petek', 'Sobota'];
    static months = ['Januar', 'Februar', 'Marec', 'April', 'Maj', 'Junij', 'Julij', 'Avgust', 'September', 'Oktober', 'Novermber', 'December'];

    static verbose(date: Date): string {
        let result = DateFormatters.weekdays[date.getDay()] + ', ';
        result += zfill(date.getDate(), 2) + '. ';
        result += zfill(date.getMonth() + 1, 2) + '. ob ';
        result += zfill(date.getHours(), 2) + '.' + zfill(date.getMinutes(), 2);
        return result;
    }

    static dateTime(date: Date) {
        let result = zfill(date.getDate(), 2) + '. ';
        result += zfill(date.getMonth() + 1, 2) + '. ';
        result += DateFormatters.time(date);
        return result;
    }

    static time(date: Date) {
        return zfill(date.getHours(), 2) + ':' + zfill(date.getMinutes(), 2);
    }

    static date(date: Date) {
        let result = zfill(date.getDate(), 2) + '. ';
        result += zfill(date.getMonth() + 1, 2) + '. ';
        result += date.getFullYear();
        return result;
    }

    static isoDate(date: Date) {
        return date.toISOString().split('T')[0];
    }

    static isoTime(date: Date) {
        return zfill(date.getHours(), 2) + ':' + zfill(date.getMinutes(), 2);
    }
}

export abstract class NumberFormatters {
    static eur(value: number): string {
        let result = value.toFixed(2).replace('.', ',');
        return result + ' €';
    }
}

export abstract class MapUtils {
    static getSegment(latlng: LatLngExpression, latlngs: any) {

        // get layerpoint of user click
        let segments = [];

        // get segments of polyline
        // calculate distances from point to each polyline
        for (let i = 0; i < latlngs.length - 1; i++) {
            const pointToLineDistance = GeoUtil.distanceSegment(
                // @ts-ignore
                polyline._map,
                latlng,
                latlngs[i] as LatLngExpression,
                latlngs[i + 1] as LatLngExpression
            );

            segments.push({
                index: i,
                pointToLineDistance,
                segment: [i, i + 1]
            });
        }

        // sort segments by shortest distance
        segments.sort((a, b) =>
            a.pointToLineDistance < b.pointToLineDistance ? -1 : 1
        );

        // return first entry, which has shortest distance
        return segments[0].segment;
    }
}
