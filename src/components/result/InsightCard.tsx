'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface InsightCardProps {
    icon: LucideIcon;
    title: string;
    content: string;
    iconColor?: string;
}

export function InsightCard({
    icon: Icon,
    title,
    content,
    iconColor = 'text-primary'
}: InsightCardProps) {
    return (
        <div className="bg-white rounded-2xl p-5 border border-border hover:shadow-md transition-all duration-300">
            <div className="flex items-start gap-4">
                <div className={`w-10 h-10 bg-primary-light rounded-xl flex items-center justify-center shrink-0`}>
                    <Icon className={`w-5 h-5 ${iconColor}`} strokeWidth={2.5} />
                </div>
                <div>
                    <h4 className="font-bold text-gray-900 mb-1">{title}</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">{content}</p>
                </div>
            </div>
        </div>
    );
}

export default InsightCard;
