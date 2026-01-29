"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export const FB_PIXEL_ID = '920621233729145';

declare global {
    interface Window {
        fbq: (...args: unknown[]) => void;
        _fbq: unknown;
    }
}

// https://developers.facebook.com/docs/facebook-pixel/advanced/
export const pageview = () => {
    if (typeof window.fbq !== 'undefined') {
        window.fbq('track', 'PageView', { value: 1, currency: 'EUR' });
    }
};

// https://developers.facebook.com/docs/facebook-pixel/reference
export const event = (name: string, options = {}) => {
    if (typeof window.fbq !== 'undefined') {
        window.fbq('track', name, options);
    } else {
        // Fallback if fbq is not yet loaded
        console.warn(`FB Pixel not loaded yet. Event ${name} suppressed.`);
    }
};

export const trackLead = (value: number = 2) => {
    event('Lead', {
        value: value,
        currency: 'EUR',
    });
};

export const trackHighLead = (value: number = 3) => {
    // Standard event with custom params or custom event
    event('HighLead', {
        value: value,
        currency: 'EUR',
    });
};

export const FacebookPixel = () => {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        pageview();
    }, [pathname, searchParams]);

    return null;
};
