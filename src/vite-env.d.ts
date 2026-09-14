/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_SUPABASE_URL?: string;
    readonly VITE_SUPABASE_ANON_KEY?: string;
    readonly VITE_KAKAO_JS_KEY?: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}

interface KakaoLatLng {
    getLat: () => number;
    getLng: () => number;
}

interface KakaoMap {
    setCenter: (latlng: KakaoLatLng) => void;
}

interface KakaoMarker {
    setMap: (map: KakaoMap | null) => void;
}

interface Window {
    kakao?: {
        maps: {
            load: (callback: () => void) => void;
            LatLng: new (lat: number, lng: number) => KakaoLatLng;
            Map: new (container: HTMLElement, options: { center: KakaoLatLng; level: number }) => KakaoMap;
            Marker: new (options: { position: KakaoLatLng }) => KakaoMarker;
        };
    };
}
