'use client';

import React from 'react';

interface AnswerOptionProps {
    value: number;
    label: string;
    isSelected: boolean;
    onSelect: (value: number) => void;
}

export function AnswerOption({
    value,
    label,
    isSelected,
    onSelect
}: AnswerOptionProps) {
    return (
        <button
            onClick={() => onSelect(value)}
            className={`w-full p-5 rounded-2xl transition-all duration-200 text-left border-2 group ${isSelected
                    ? "border-primary bg-primary-light shadow-md"
                    : "border-transparent bg-secondary hover:bg-white hover:border-gray-200 hover:shadow-sm"
                }`}
        >
            <div className="flex items-center justify-between">
                <span className={`font-semibold text-lg transition-colors ${isSelected ? 'text-primary' : 'text-gray-700 group-hover:text-gray-900'
                    }`}>
                    {label}
                </span>

                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${isSelected
                        ? "border-primary bg-primary"
                        : "border-gray-300 group-hover:border-primary/50"
                    }`}>
                    {isSelected && (
                        <div className="w-2.5 h-2.5 rounded-full bg-white" />
                    )}
                </div>
            </div>
        </button>
    );
}

interface QuestionCardProps {
    questionText: string;
    options: { value: number; label: string }[];
    currentAnswer?: number;
    onAnswer: (value: number) => void;
}

export function QuestionCard({
    questionText,
    options,
    currentAnswer,
    onAnswer
}: QuestionCardProps) {
    return (
        <div className="glass-panel rounded-3xl p-8 mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center leading-snug">
                {questionText}
            </h3>

            <div className="space-y-4">
                {options.map((option) => (
                    <AnswerOption
                        key={option.value}
                        value={option.value}
                        label={option.label}
                        isSelected={currentAnswer === option.value}
                        onSelect={onAnswer}
                    />
                ))}
            </div>
        </div>
    );
}

export default QuestionCard;
