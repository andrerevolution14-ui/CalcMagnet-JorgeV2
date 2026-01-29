"use server";

import PocketBase from 'pocketbase';

const PB_URL = 'http://76.13.11.36:8090';
const pb = new PocketBase(PB_URL);

export interface LeadData {
    Whatsapp: string;
    type: string;
    area_m2?: number;
    roomType?: string;
    roomSize?: string;
    condition: string;
    estimate: number;
}

export async function saveLeadAction(data: LeadData) {
    try {
        console.log('Server Action: Saving lead to PocketBase...');
        const record = await pb.collection('CalcMagnet_JorgeV2').create(data);
        console.log('Server Action: Success!', record.id);
        return { success: true, id: record.id };
    } catch (error) {
        console.error('Server Action Error:', error);
        return { success: false, error: String(error) };
    }
}
