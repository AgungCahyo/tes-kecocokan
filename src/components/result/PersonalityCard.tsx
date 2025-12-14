'use client';

import React from 'react';

interface PersonalityProfile {
    type?: string;
    traits?: {
        energy?: string;
        decisions?: string;
    };
    commStyle?: string;
    loveLanguage?: string;
    topValue?: string;
}

interface PersonalityCardProps {
    name: string;
    profile: PersonalityProfile;
    title: string;
    description: string;
}

export function PersonalityCard({
    name,
    profile,
    title,
    description
}: PersonalityCardProps) {
    return (
        <div className="bg-secondary/30 rounded-3xl p-6 md:p-8 border border-border/50">
            <div className="mb-6 flex items-start justify-between">
                <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                        {name}
                    </h3>
                    <span className="text-primary font-bold bg-primary-light px-3 py-1 rounded-full text-sm">
                        {profile.type}
                    </span>
                </div>
            </div>

            <div className="mb-6">
                <p className="text-lg font-semibold text-gray-800 mb-2">
                    {title}
                </p>
                <p className="text-text-muted text-sm leading-relaxed">{description}</p>
            </div>

            <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-card-bg rounded-xl p-3 shadow-sm">
                        <p className="text-[10px] uppercase tracking-wider text-text-muted mb-1 font-semibold">Energi</p>
                        <p className="font-semibold text-gray-800 text-sm">{profile.traits?.energy ?? '-'}</p>
                    </div>
                    <div className="bg-card-bg rounded-xl p-3 shadow-sm">
                        <p className="text-[10px] uppercase tracking-wider text-text-muted mb-1 font-semibold">Keputusan</p>
                        <p className="font-semibold text-gray-800 text-sm">{profile.traits?.decisions ?? '-'}</p>
                    </div>
                </div>

                <div className="bg-card-bg rounded-2xl p-4 shadow-sm space-y-3">
                    <div className="flex justify-between items-center text-sm border-b border-gray-100 pb-2">
                        <span className="text-text-muted">Komunikasi</span>
                        <span className="font-medium text-gray-900">{profile.commStyle}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm border-b border-gray-100 pb-2">
                        <span className="text-text-muted">Love Language</span>
                        <span className="font-medium text-gray-900">{profile.loveLanguage}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-text-muted">Nilai Utama</span>
                        <span className="font-medium text-gray-900">{profile.topValue}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PersonalityCard;
