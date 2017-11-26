declare type D<T> = {
    [id: string]: T;
};
declare namespace D {
    interface Static {
        /** Creates an empty dictionary with no prototype. */
        <T = any>(): D<T>;
        /** Ceates an empty Record with no prototype */
        <K extends string, V>(): Record<K, V>;
        /** Creates an empty dictionary with typed keys and no prototype with the contents of the supplied Map. */
        <K extends string, V>(map: Map<K, V>): Record<K, V>;
        /** Creates an empty dictionary with typed keys and no prototype with the contents of the supplied object. */
        <K extends string, V>(record: Record<K, V>): Record<K, V>;
        /** Creates an empty dictionary with typed keys and no prototype with the contents of the supplied object. */
        <K extends string, V>(dict: D<V>): Record<K, V>;
        /** Creates dictionary with no prototype with the contents of the supplied object. */
        <T>(d: D<T>): D<T>;
        /** Returns true if object has no (own) entries. */
        isEmpty(d: D<any>): boolean;
        /** Returns number of (own) keys. */
        size(d: D<any>): number;
        /** Returns true if object has (own) key. */
        has(d: D<any>, key: string): boolean;
        /** Returns key for first matched value otherwise undefined. */
        keyOf<K extends string, V>(record: Record<K, V>, v: V): K | undefined;
        /** Returns key for first matched value otherwise undefined. */
        keyOf<T>(d: D<T>, v: T): string | undefined;
        /** Returns nth iterated key or undefined. Object key order caveats apply. */
        keyAt<T extends string>(record: Record<T, any>, index: number): T | undefined;
        /** Returns nth iterated key or undefined. Object key order caveats apply. */
        keyAt(d: D<any>, index: number): string | undefined;
        /** Returns first iterated key or undefined. Object key order caveats apply. */
        firstKey<T extends string>(record: Record<T, any>): T | undefined;
        /** Returns first iterated key or undefined. Object key order caveats apply. */
        firstKey(d: D<any>): string | undefined;
        /** Returns last iterated key or undefined. Object key order caveats apply. */
        lastKey<T extends string>(record: Record<T, any>): T | undefined;
        /** Returns last iterated key or undefined. Object key order caveats apply. */
        lastKey(d: D<any>): string | undefined;
        /** Return array of typed object keys */
        keys<T extends string>(rec: Record<T, any>): T[];
        /** Return array of object keys */
        keys(d: D<any>): string[];
    }
}
declare const D: D.Static;
export default D;
