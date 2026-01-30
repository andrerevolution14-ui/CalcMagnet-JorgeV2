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
    Q1?: string;
    Q2?: string;
    Q2A?: string;
    Q3?: string;
}

export async function saveLeadAction(data: LeadData) {
    try {
        console.log('Server Action: Saving lead to PocketBase...');
        const record = await pb.collection('CalcMagnet_JorgeV2').create(data);
        console.log('Server Action: Success!', record.id);
        return { success: true, id: record.id };
    } catch (error: any) {
        console.error('Server Action Error:', error);
        // PocketBase errors
        const errorMessage = error?.response?.message || error?.message || String(error);
        const errorData = error?.response?.data || {};

        console.error('Detailed PB Error:', JSON.stringify(errorData, null, 2));

        return { success: false, error: errorMessage, details: errorData };
    }
}
