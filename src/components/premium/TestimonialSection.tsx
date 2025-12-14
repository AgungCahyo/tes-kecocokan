'use client';

import React from 'react';
import { Star, MessageCircle } from 'lucide-react';

interface Testimonial {
    name: string;
    compatibility: string;
    message: string;
}

const testimonials: Testimonial[] = [
    {
        name: 'Rina & Dimas',
        compatibility: '87%',
        message: 'Analisisnya sangat akurat! Kami jadi lebih paham cara komunikasi masing-masing 💕'
    },
    {
        name: 'Sarah & Andi',
        compatibility: '92%',
        message: 'Worth it banget! Tips-nya langsung bisa dipraktekkan dalam hubungan kami'
    },
    {
        name: 'Maya & Budi',
        compatibility: '78%',
        message: 'Akhirnya ngerti kenapa kadang suka beda pendapat 😂 Rekomen!'
    },
    {
        name: 'Linda & Yoga',
        compatibility: '85%',
        message: 'Hasilnya detail dan sangat personal. Suka banget sama insight-nya!'
    }
];

function WhatsAppMockup({ testimonial }: { testimonial: Testimonial }) {
    return (
        <div className="bg-white rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300">
            {/* WA Header */}
            <div className="bg-[#075E54] px-3 py-2 flex items-center gap-2">
                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="text-white text-xs font-medium">Tes Kecocokan Bot</span>
                <div className="ml-auto flex gap-0.5">
                    <div className="w-1 h-1 bg-white/60 rounded-full"></div>
                    <div className="w-1 h-1 bg-white/60 rounded-full"></div>
                    <div className="w-1 h-1 bg-white/60 rounded-full"></div>
                </div>
            </div>

            {/* Chat Background */}
            <div className="bg-[#ECE5DD] p-3 min-h-[140px]">
                {/* Bot Message */}
                <div className="bg-white rounded-lg rounded-tl-none p-2.5 shadow-sm max-w-[95%]">
                    <p className="text-[10px] text-gray-800 leading-relaxed">
                        🎉 <span className="font-bold">Hasil Analisis Premium</span>
                    </p>
                    <p className="text-[10px] text-gray-700 mt-1">
                        Kecocokan: <span className="font-bold text-green-600">{testimonial.compatibility}</span>
                    </p>
                    <p className="text-[10px] text-gray-600 mt-1.5 italic">
                        "{testimonial.message}"
                    </p>
                    <p className="text-[8px] text-gray-400 text-right mt-1">10:30 ✓✓</p>
                </div>
            </div>

            {/* Footer - Rating & Name */}
            <div className="p-3 border-t border-border">
                <div className="flex items-center gap-0.5 mb-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                    ))}
                </div>
                <p className="font-semibold text-gray-900 text-sm">{testimonial.name}</p>
                <p className="text-xs text-text-muted">Verified Purchase ✓</p>
            </div>
        </div>
    );
}

export function TestimonialSection() {
    return (
        <div className="bg-secondary rounded-2xl p-6 mb-8 border border-border">
            <h2 className="text-xl font-bold text-center text-gray-900 mb-2">
                💬 Hasil Nyata dari Pengguna
            </h2>
            <p className="text-center text-text-muted text-sm mb-6">
                Screenshot hasil analisis dari WhatsApp bot kami
            </p>

            <div className="grid grid-cols-2 gap-4">
                {testimonials.map((testimonial, idx) => (
                    <WhatsAppMockup key={idx} testimonial={testimonial} />
                ))}
            </div>

            <p className="text-center text-xs text-text-muted mt-4">
                *Screenshot dari pengguna premium
            </p>
        </div>
    );
}

export default TestimonialSection;
