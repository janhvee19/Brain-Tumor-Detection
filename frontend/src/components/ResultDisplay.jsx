import React from 'react';
import { Activity, AlertCircle, CheckCircle } from 'lucide-react';

const ResultDisplay = ({ result }) => {
    if (!result) return null;

    const getConfidenceColor = (confidence) => {
        if (confidence > 0.8) return 'bg-green-500';
        if (confidence > 0.5) return 'bg-yellow-500';
        return 'bg-red-500';
    };

    const getConfidenceText = (confidence) => {
        if (confidence > 0.8) return 'High Confidence';
        if (confidence > 0.5) return 'Moderate Confidence';
        return 'Low Confidence';
    };

    return (
        <div className="w-full max-w-xl mx-auto mt-8 animate-fade-in">
            <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
                <div className="p-6">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                        <Activity className="h-5 w-5 text-blue-400 mr-2" />
                        Analysis Result
                    </h3>

                    <div className="space-y-6">
                        <div>
                            <p className="text-sm text-slate-400 mb-1">Predicted Condition</p>
                            <div className="flex items-center space-x-3">
                                <span className="text-3xl font-bold text-white capitalize">
                                    {result.prediction}
                                </span>
                                {result.prediction === 'notumor' ? (
                                    <CheckCircle className="h-6 w-6 text-green-500" />
                                ) : (
                                    <AlertCircle className="h-6 w-6 text-red-500" />
                                )}
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between items-end mb-2">
                                <p className="text-sm text-slate-400">Confidence Score</p>
                                <span className="text-sm font-medium text-slate-300">
                                    {(result.confidence * 100).toFixed(1)}%
                                </span>
                            </div>
                            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                                <div
                                    className={`h-full rounded-full transition-all duration-1000 ease-out ${getConfidenceColor(result.confidence)}`}
                                    style={{ width: `${result.confidence * 100}%` }}
                                />
                            </div>
                            <p className="text-xs text-slate-500 mt-2 text-right">
                                {getConfidenceText(result.confidence)}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-slate-900/50 p-4 border-t border-slate-700">
                    <p className="text-xs text-slate-500 text-center">
                        Disclaimer: This is an AI-generated analysis and should not be used as a substitute for professional medical diagnosis.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ResultDisplay;
