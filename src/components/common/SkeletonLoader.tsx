import React from 'react';

export const SkeletonLoader: React.FC = () => (
    <div className="w-full animate-pulse space-y-12">
        <div className="flex flex-col items-center space-y-4 mb-16 opacity-50">
            <div className="h-4 bg-slate-300 rounded w-24"></div>
            <div className="h-10 bg-slate-300 rounded w-64"></div>
            <div className="h-1.5 bg-slate-300 rounded w-16"></div>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
            <div className="h-64 bg-slate-200 rounded-2xl border border-slate-300/50"></div>
            <div className="h-64 bg-slate-200 rounded-2xl border border-slate-300/50"></div>
        </div>
        <div className="h-96 bg-slate-200 rounded-3xl border border-slate-300/50"></div>
    </div>
);

export const HomeSkeleton: React.FC = () => (
    <div className="animate-pulse bg-white min-h-screen">
        <div className="h-[600px] bg-slate-800 w-full relative overflow-hidden">
            <div className="absolute inset-0 bg-slate-700/50"></div>
            <div className="relative z-10 max-w-7xl mx-auto px-4 pt-32 flex flex-col justify-center h-full">
                <div className="h-8 bg-slate-600 rounded-full w-48 mb-8"></div>
                <div className="h-20 bg-slate-600 rounded-xl w-3/4 mb-8"></div>
                <div className="h-6 bg-slate-600 rounded-xl w-1/2 mb-12"></div>
                <div className="flex gap-5">
                    <div className="h-16 bg-slate-600 rounded-xl w-40"></div>
                    <div className="h-16 bg-slate-600/50 rounded-xl w-40"></div>
                </div>
            </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 py-24">
            <div className="grid lg:grid-cols-3 gap-12">
                <div className="lg:col-span-3 h-80 bg-slate-200 rounded-2xl"></div>
                <div className="lg:col-span-2 h-64 bg-slate-200 rounded-2xl"></div>
                <div className="lg:col-span-1 h-64 bg-slate-200 rounded-2xl"></div>
            </div>
        </div>
    </div>
);
