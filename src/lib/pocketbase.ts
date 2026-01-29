import PocketBase from 'pocketbase';

// Replace with your actual PocketBase URL
const PB_URL = process.env.NEXT_PUBLIC_POCKETBASE_URL || 'http://76.13.11.36:8090';

const pb = new PocketBase(PB_URL);

export interface Lead {
    whatsapp: string;
    type: string;
    area_m2?: number;
    roomType?: string;
    roomSize?: string;
    condition: string;
    estimate: number;
    timestamp: string;
}

export const saveLead = async (leadData: Lead) => {
    try {
        await pb.collection('CalcMagnet_JorgeV2').create({
            Whatsapp: leadData.whatsapp,
            type: leadData.type,
            area_m2: leadData.area_m2,
            roomType: leadData.roomType,
            roomSize: leadData.roomSize,
            condition: leadData.condition,
            estimate: leadData.estimate
        });
        console.log('Lead capturing logic executed for:', leadData.whatsapp);
        return true;
    } catch (error) {
        console.error('Lead capture error:', error);
        return false;
    }
};

export default pb;
