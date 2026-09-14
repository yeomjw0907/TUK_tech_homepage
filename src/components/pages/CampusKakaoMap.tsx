import React, { useEffect, useRef, useState } from 'react';
import { MapPin } from 'lucide-react';
import { CAMPUS_DIRECTIONS, CAMPUS_LOCATION } from '../../data/constants';

const SDK_SCRIPT_ID = 'kakao-map-sdk';

const KAKAO_MAP_URL =
    `https://map.kakao.com/?urlX=${CAMPUS_LOCATION.wcongnamulX}` +
    `&urlY=${CAMPUS_LOCATION.wcongnamulY}` +
    `&urlLevel=${CAMPUS_LOCATION.level}` +
    `&itemId=${CAMPUS_LOCATION.kakaoPlaceId}` +
    `&q=${encodeURIComponent(CAMPUS_LOCATION.name)}` +
    `&srcid=${CAMPUS_LOCATION.kakaoPlaceId}` +
    `&map_type=TYPE_MAP`;

const STATIC_MAP_URL =
    `https://spi.maps.daum.net/map2/map/imageservice` +
    `?IW=1200&IH=540` +
    `&MX=${CAMPUS_LOCATION.wcongnamulX}` +
    `&MY=${CAMPUS_LOCATION.wcongnamulY}` +
    `&SCALE=2.5`;

const MARKER_URL = 'https://t1.daumcdn.net/mapjsapi/images/2x/marker.png';

function loadKakaoSdk(appKey: string): Promise<NonNullable<Window['kakao']>> {
    return new Promise((resolve, reject) => {
        const succeed = () => {
            const kakao = window.kakao;
            if (!kakao?.maps) {
                reject(new Error('Kakao maps SDK missing'));
                return;
            }
            kakao.maps.load(() => resolve(kakao));
        };

        const existing = document.getElementById(SDK_SCRIPT_ID) as HTMLScriptElement | null;
        if (window.kakao?.maps) {
            succeed();
            return;
        }
        if (existing) {
            existing.addEventListener('load', succeed, { once: true });
            existing.addEventListener('error', () => reject(new Error('Kakao SDK failed')), { once: true });
            return;
        }

        const script = document.createElement('script');
        script.id = SDK_SCRIPT_ID;
        script.async = true;
        script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${appKey}&autoload=false`;
        script.onload = succeed;
        script.onerror = () => reject(new Error('Kakao SDK failed'));
        document.head.appendChild(script);
    });
}

const CampusKakaoMap: React.FC = () => {
    const mapRef = useRef<HTMLDivElement>(null);
    const appKey =
        import.meta.env.VITE_KAKAO_JS_KEY?.trim() || 'e464d14cc0120f6a5fcfb049fa2ea060';
    const [interactive, setInteractive] = useState(false);

    useEffect(() => {
        if (!appKey || !mapRef.current) return;
        const container = mapRef.current;
        let cancelled = false;

        loadKakaoSdk(appKey)
            .then((kakao) => {
                if (cancelled || !container) return;
                const center = new kakao.maps.LatLng(CAMPUS_LOCATION.lat, CAMPUS_LOCATION.lng);
                const map = new kakao.maps.Map(container, {
                    center,
                    level: CAMPUS_LOCATION.level,
                });
                const marker = new kakao.maps.Marker({ position: center });
                marker.setMap(map);
                setInteractive(true);
            })
            .catch(() => {
                if (!cancelled) setInteractive(false);
            });

        return () => {
            cancelled = true;
        };
    }, [appKey]);

    return (
        <div className="space-y-0 md:pr-24">
            <div
                ref={mapRef}
                className="relative w-full h-[540px] overflow-hidden bg-surface-alt"
                aria-label={`${CAMPUS_LOCATION.name} 위치 지도`}
            >
                {!interactive && (
                    <a
                        href={KAKAO_MAP_URL}
                        target="_blank"
                        rel="noreferrer"
                        className="absolute inset-0 block"
                    >
                        <img
                            src={STATIC_MAP_URL}
                            alt={`${CAMPUS_LOCATION.name} 지도`}
                            className="w-full h-full object-cover"
                        />
                        <img
                            src={MARKER_URL}
                            alt=""
                            className="absolute left-1/2 top-1/2 w-7 h-auto pointer-events-none"
                            style={{ transform: 'translate(-50%, -100%)' }}
                        />
                    </a>
                )}
            </div>

            <div className="flex items-start gap-4 border border-navy px-6 py-5">
                <div className="shrink-0 w-12 h-12 rounded-full border border-navy/30 flex items-center justify-center text-navy">
                    <MapPin className="w-6 h-6" aria-hidden />
                </div>
                <div className="min-w-0 text-body text-ink-soft">
                    <p className="flex flex-col sm:flex-row sm:gap-6">
                        <strong className="shrink-0 text-ink font-bold w-36">현재주소(도로명)</strong>
                        <span>{CAMPUS_LOCATION.roadAddress}</span>
                    </p>
                    <p className="flex flex-col sm:flex-row sm:gap-6 mt-1">
                        <strong className="shrink-0 text-ink font-bold w-36">구주소(지번)</strong>
                        <span>{CAMPUS_LOCATION.jibunAddress}</span>
                    </p>
                    <p className="flex flex-col sm:flex-row sm:gap-6 mt-1">
                        <strong className="shrink-0 text-ink font-bold w-36">본사</strong>
                        <span>{CAMPUS_LOCATION.office}</span>
                    </p>
                </div>
            </div>

            <CampusDirections />
        </div>
    );
};

const cell = 'border border-navy/40 px-4 py-3 text-caption align-middle';
const labelCell = `${cell} bg-surface-alt text-ink font-bold text-center`;
const timeCell = `${labelCell} w-24 whitespace-nowrap`;

const CampusDirections: React.FC = () => (
    <div className="space-y-10 pt-10">
        <section>
            <h3 className="text-h4 text-ink mb-3">▸ 자가용</h3>
            <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-navy/40">
                    <caption className="sr-only">자가용 오시는 길</caption>
                    <tbody>
                        {CAMPUS_DIRECTIONS.car.map((row) => (
                            <tr key={row.label}>
                                <th scope="row" className={`${labelCell} w-40`}>
                                    {row.label}
                                </th>
                                <td className={`${cell} text-ink-soft`}>{row.route}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>

        <section>
            <h3 className="text-h4 text-ink mb-3">▸ 지하철</h3>
            <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-navy/40">
                    <caption className="sr-only">지하철 오시는 길</caption>
                    <tbody>
                        <tr>
                            <th scope="row" className={`${labelCell} w-40`}>
                                {CAMPUS_DIRECTIONS.subway.line}
                            </th>
                            <td className={`${cell} text-ink-soft`}>{CAMPUS_DIRECTIONS.subway.route}</td>
                            <td className={timeCell}>{CAMPUS_DIRECTIONS.subway.time}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>

        <section>
            <h3 className="text-h4 text-ink mb-3">▸ 버스</h3>
            <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-navy/40">
                    <caption className="sr-only">버스 오시는 길</caption>
                    <tbody>
                        {CAMPUS_DIRECTIONS.bus.map((row) => (
                            <tr key={`${row.type}-${row.routes}`}>
                                <th scope="row" className={`${labelCell} w-28`}>
                                    {row.type}
                                </th>
                                <td className={`${cell} text-ink-soft`}>{row.routes}</td>
                                <td className={`${cell} text-ink-soft text-center`}>{row.stop}</td>
                                <td className={timeCell}>{row.time}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    </div>
);

export default CampusKakaoMap;
