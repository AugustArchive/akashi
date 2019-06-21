import { Model, Document, Query } from 'mongoose';

export default interface SettingsBase<T extends Document> {
    model: Model<T, {}>;
    get(id: string): Promise<T | null>;
    create(entity: any): T;
    remove(id: string): void;
    update(id: string, doc: any, cb: (error: any, raw: any) => void): Query<T>;
}