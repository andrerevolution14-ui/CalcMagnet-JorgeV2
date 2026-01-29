export const BASE_PRICE_PER_M2 = 550;

export type RemodelingType = 'full_house' | 'single_room';
export type RoomType = 'Quarto' | 'Sala' | 'Casa de banho' | 'Cozinha';
export type RoomSize = 'Pequeno' | 'Médio' | 'Grande';
export type Condition = 'light' | 'medium' | 'total';

export interface CalculationInput {
    type: RemodelingType;
    area_m2?: number;
    roomType?: RoomType;
    roomSize?: RoomSize;
    condition: Condition;
}

const ROOM_SIZE_M2: Record<string, number> = {
    'Pequeno': 8,
    'Médio': 12,
    'Grande': 18,
};

const ROOM_TYPE_COEFFICIENT: Record<string, number> = {
    'Quarto': 0.90,
    'Sala': 1.00,
    'Casa de banho': 1.30,
    'Cozinha': 1.45,
};

const CONDITION_COEFFICIENT: Record<string, number> = {
    'light': 0.85,
    'medium': 1.00,
    'total': 1.20,
};

export const calculateEstimate = (input: CalculationInput): number => {
    let estimatedCost = 0;

    if (input.type === 'full_house') {
        const area = input.area_m2 || 62;
        const coef = CONDITION_COEFFICIENT[input.condition] || 1.00;
        estimatedCost = area * BASE_PRICE_PER_M2 * coef;
    } else {
        const area = ROOM_SIZE_M2[input.roomSize || 'Médio'] || 12;
        const typeCoef = ROOM_TYPE_COEFFICIENT[input.roomType || 'Sala'] || 1.00;
        // For single rooms, prompt specified 0.85 for "atualizar" and 1.15 for "completa"
        // Mapping: light -> atualizar (0.85), total -> completa (1.15), medium -> 1.00
        let condCoef = 1.00;
        if (input.condition === 'light') condCoef = 0.85;
        if (input.condition === 'total') condCoef = 1.15;

        estimatedCost = area * BASE_PRICE_PER_M2 * typeCoef * condCoef;
    }

    const randomFactor = 0.92 + Math.random() * 0.06;
    let finalEstimate = Math.round(estimatedCost * randomFactor);

    if (finalEstimate % 100 === 0) {
        finalEstimate += Math.floor(Math.random() * 9) + 1;
    }
    if (finalEstimate % 50 === 0) {
        finalEstimate += Math.floor(Math.random() * 4) + 1;
    }

    return finalEstimate;
};

export const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('pt-PT', {
        style: 'currency',
        currency: 'EUR',
        maximumFractionDigits: 0,
    }).format(value);
};
