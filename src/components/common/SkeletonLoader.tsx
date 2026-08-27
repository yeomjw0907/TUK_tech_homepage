import React from 'react';

export const SkeletonLoader: React.FC = () => (
    <div className="w-full animate-pulse space-y-12">
        <div className="flex flex-col items-center space-y-4 mb-16 opacity-50">
            <div className="h-4 bg-line-strong rounded w-24"></div>
            <div className="h-10 bg-line-strong rounded w-64"></div>
            <div className="h-1.5 bg-line-strong rounded w-16"></div>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
            <div className="h-64 bg-line-md rounded-2xl border border-line"></div>
            <div className="h-64 bg-line-md rounded-2xl border border-line"></div>
        </div>
        <div className="h-96 bg-line-md rounded-2xl border border-line"></div>
    </div>
);

export const HomeSkeleton: React.FC = () => (
    <div className="animate-pulse bg-white min-h-screen">
        <div className="h-[600px] bg-navy-deep w-full relative overflow-hidden">
            <div className="absolute inset-0 bg-white/5"></div>
            <div className="relative z-10 max-w-7xl mx-auto px-4 pt-32 flex flex-col justify-center h-full">
                <div className="h-8 bg-white/10 rounded-full w-48 mb-8"></div>
                <div className="h-20 bg-white/10 rounded-xl w-3/4 mb-8"></div>
                <div className="h-6 bg-white/10 rounded-xl w-1/2 mb-12"></div>
                <div className="flex gap-5">
                    <div className="h-16 bg-white/10 rounded-xl w-40"></div>
                    <div className="h-16 bg-white/5 rounded-xl w-40"></div>
                </div>
            </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 py-24">
            <div className="grid lg:grid-cols-3 gap-12">
                <div className="lg:col-span-3 h-80 bg-line-md rounded-2xl"></div>
                <div className="lg:col-span-2 h-64 bg-line-md rounded-2xl"></div>
                <div className="lg:col-span-1 h-64 bg-line-md rounded-2xl"></div>
            </div>
        </div>
    </div>
);
