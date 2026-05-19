import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const QUESTIONS = {
  body: [
    {
      id: 'energy',
      label: 'How have your energy levels been?',
      options: ['Very low', 'Low', 'Good', 'High'],
    },
    {
      id: 'sleep',
      label: 'How are you sleeping?',
      options: ['Poor', 'Okay', 'Good', 'Great'],
    },
    {
      id: 'bodyChanges',
      label: 'Noticeable body changes?',
      options: ['Slimmer', 'Same', 'More muscle', 'Unsure'],
    },
  ],
  performance: [
    {
      id: 'strength',
      label: 'Strength gains?',
      options: ['Declining', 'Plateau', 'Improving', 'Big gains'],
    },
    {
      id: 'recovery',
      label: 'How is your recovery between sessions?',
      options: ['Very sore', 'Some soreness', 'Good', 'Full recovery'],
    },
    {
      id: 'hunger',
      label: 'Hunger levels?',
      options: ['Always full', 'Satisfied', 'Often hungry', 'Very hungry'],
    },
    {
      id: 'stress',
      label: 'Stress levels?',
      options: ['Very high', 'High', 'Manageable', 'Low'],
    },
  ],
}

function CheckIn() {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [weight, setWeight] = useState('')
  const [answers, setAnswers] = useState({})
  const [notes, setNotes] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const aiAdjustment = {
    calories: 2350,
    protein: 160,
    carbs: 245,
    fats: 72,
    restDays: 3,
    summary:
      'Good progress this check-in. Based on your energy levels and strength improvements, your calories have been nudged up slightly to support better recovery and continued muscle growth. Keep up the consistency.',
  }

  function handleAnswer(questionId, value) {
    setAnswers({ ...answers, [questionId]: value })
  }

  function allBodyAnswered() {
    return QUESTIONS.body.every((q) => answers[q.id])
  }

  function allPerformanceAnswered() {
    return QUESTIONS.performance.every((q) => answers[q.id])
  }

  function handleSubmit() {
    setSubmitted(true)
  }

  const stepLabels = ['Body & weight', 'Performance', 'Notes']

  return (
    <div className="min-h-screen bg-[#fafaf8] pb-12">
      {/* Header */}
      <div className="flex items-center gap-3 px-6 pt-6 pb-2">
        <button
          onClick={() => navigate('/home')}
          className="text-sm text-[#555]"
        >
          ← Back
        </button>
      </div>

      {/* Progress bar */}
      {!submitted && (
        <div className="px-6 mb-6">
          <div className="flex gap-1.5 mb-1.5">
            {stepLabels.map((label, i) => (
              <div
                key={i}
                className={`flex-1 h-1 rounded-full transition-colors ${
                  i < step
                    ? 'bg-[#D85A30]'
                    : i === step
                      ? 'bg-[#F0997B]'
                      : 'bg-[#e8e4df]'
                }`}
              />
            ))}
          </div>
          <p className="text-xs text-[#555]">
            Step {step + 1} of {stepLabels.length} — {stepLabels[step]}
          </p>
        </div>
      )}

      <div className="px-6">
        {/* Step 0 — Body & weight */}
        {!submitted && step === 0 && (
          <div>
            <div className="w-11 h-11 bg-[#FFF3EE] rounded-2xl flex items-center justify-center mb-4">
              <span className="text-xl">⚖️</span>
            </div>
            <h1 className="text-xl font-medium text-[#1a1a1a] mb-1">
              Body & weight
            </h1>
            <p className="text-sm text-[#555] mb-6 leading-relaxed">
              Log your current weight and how your body has been feeling.
            </p>

            {/* Weight input */}
            <div className="mb-5">
              <p className="text-xs text-[#555] mb-1.5">Current weight</p>
              <div className="relative">
                <input
                  type="number"
                  placeholder="e.g. 175"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full border border-[#f0ede8] rounded-xl py-3 px-4 text-sm text-[#1a1a1a] bg-white pr-12"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#555]">
                  lbs
                </span>
              </div>
            </div>

            {/* Body questions */}
            {QUESTIONS.body.map((q) => (
              <div key={q.id} className="mb-5">
                <p className="text-xs font-medium text-[#1a1a1a] mb-2">
                  {q.label}
                </p>
                <div className="flex gap-2">
                  {q.options.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => handleAnswer(q.id, opt)}
                      className={`flex-1 py-2.5 rounded-xl text-xs font-medium border transition-colors ${
                        answers[q.id] === opt
                          ? 'bg-[#FFF3EE] border-[#F5C4B3] text-[#993C1D]'
                          : 'bg-white border-[#f0ede8] text-[#555]'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            <button
              onClick={() => setStep(1)}
              disabled={!weight || !allBodyAnswered()}
              className={`w-full py-4 rounded-2xl text-sm font-medium transition-colors ${
                weight && allBodyAnswered()
                  ? 'bg-[#D85A30] text-white'
                  : 'bg-[#e8e4df] text-[#b4b2a9] cursor-not-allowed'
              }`}
            >
              Next →
            </button>
          </div>
        )}

        {/* Step 1 — Performance & recovery */}
        {!submitted && step === 1 && (
          <div>
            <div className="w-11 h-11 bg-[#FFF3EE] rounded-2xl flex items-center justify-center mb-4">
              <span className="text-xl">🏋️</span>
            </div>
            <h1 className="text-xl font-medium text-[#1a1a1a] mb-1">
              Performance & recovery
            </h1>
            <p className="text-sm text-[#555] mb-6 leading-relaxed">
              How has your training and recovery been over the past two weeks?
            </p>

            {QUESTIONS.performance.map((q) => (
              <div key={q.id} className="mb-5">
                <p className="text-xs font-medium text-[#1a1a1a] mb-2">
                  {q.label}
                </p>
                <div className="flex gap-2">
                  {q.options.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => handleAnswer(q.id, opt)}
                      className={`flex-1 py-2.5 rounded-xl text-xs font-medium border transition-colors ${
                        answers[q.id] === opt
                          ? 'bg-[#FFF3EE] border-[#F5C4B3] text-[#993C1D]'
                          : 'bg-white border-[#f0ede8] text-[#555]'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            <div className="flex gap-3">
              <button
                onClick={() => setStep(0)}
                className="flex-1 py-4 rounded-2xl text-sm font-medium border border-[#f0ede8] bg-white text-[#555]"
              >
                ← Back
              </button>
              <button
                onClick={() => setStep(2)}
                disabled={!allPerformanceAnswered()}
                className={`flex-[2] py-4 rounded-2xl text-sm font-medium transition-colors ${
                  allPerformanceAnswered()
                    ? 'bg-[#D85A30] text-white'
                    : 'bg-[#e8e4df] text-[#b4b2a9] cursor-not-allowed'
                }`}
              >
                Next →
              </button>
            </div>
          </div>
        )}

        {/* Step 2 — Notes */}
        {!submitted && step === 2 && (
          <div>
            <div className="w-11 h-11 bg-[#FFF3EE] rounded-2xl flex items-center justify-center mb-4">
              <span className="text-xl">📝</span>
            </div>
            <h1 className="text-xl font-medium text-[#1a1a1a] mb-1">
              Anything else to add?
            </h1>
            <p className="text-sm text-[#555] mb-6 leading-relaxed">
              Tell MacroLens anything about the past two weeks — injuries, life
              changes, diet struggles, or wins. The more detail you give, the
              better your plan gets adjusted.
            </p>

            <div className="mb-6">
              <p className="text-xs text-[#555] mb-1.5">Your notes</p>
              <textarea
                rows={6}
                placeholder="e.g. I've been traveling so my eating was off track. I missed two leg days but kept up with push and pull. Feeling stronger on bench press..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full border border-[#f0ede8] rounded-xl py-3 px-4 text-sm text-[#1a1a1a] bg-white resize-none leading-relaxed"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="flex-1 py-4 rounded-2xl text-sm font-medium border border-[#f0ede8] bg-white text-[#555]"
              >
                ← Back
              </button>
              <button
                onClick={handleSubmit}
                className="flex-[2] py-4 rounded-2xl text-sm font-medium bg-[#D85A30] text-white"
              >
                Submit check-in
              </button>
            </div>
          </div>
        )}

        {/* Submitted — AI summary */}
        {submitted && (
          <div>
            <div className="w-11 h-11 bg-[#FFF3EE] rounded-2xl flex items-center justify-center mb-4">
              <span className="text-xl">✨</span>
            </div>
            <h1 className="text-xl font-medium text-[#1a1a1a] mb-1">
              Check-in complete
            </h1>
            <p className="text-sm text-[#555] mb-6">
              Your plan has been updated.
            </p>

            {/* Summary card */}
            <div className="bg-white border border-[#f0ede8] rounded-2xl p-4 mb-4">
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center py-1.5 border-b border-[#f8f5f2]">
                  <span className="text-xs text-[#555]">Weight logged</span>
                  <span className="text-xs font-medium text-[#1a1a1a]">
                    {weight} lbs
                  </span>
                </div>
                {Object.entries(answers).map(([key, val]) => (
                  <div
                    key={key}
                    className="flex justify-between items-center py-1.5 border-b border-[#f8f5f2] last:border-0"
                  >
                    <span className="text-xs text-[#555] capitalize">
                      {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                    </span>
                    <span className="text-xs font-medium text-[#1a1a1a]">
                      {val}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* AI adjustment card */}
            <div className="bg-[#FFF3EE] border border-[#F5C4B3] rounded-2xl p-4 mb-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 bg-[#D85A30] rounded-lg flex items-center justify-center">
                  <span className="text-white text-xs">AI</span>
                </div>
                <p className="text-sm font-medium text-[#712B13]">
                  MacroLens AI — Plan adjustments
                </p>
              </div>
              <p className="text-xs text-[#993C1D] leading-relaxed mb-3">
                {aiAdjustment.summary}
              </p>
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between">
                  <span className="text-xs font-medium text-[#712B13]">
                    Calories
                  </span>
                  <span className="text-xs text-[#993C1D]">
                    {aiAdjustment.calories} kcal/day
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs font-medium text-[#712B13]">
                    Protein
                  </span>
                  <span className="text-xs text-[#993C1D]">
                    {aiAdjustment.protein}g/day
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs font-medium text-[#712B13]">
                    Carbs
                  </span>
                  <span className="text-xs text-[#993C1D]">
                    {aiAdjustment.carbs}g/day
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs font-medium text-[#712B13]">
                    Fats
                  </span>
                  <span className="text-xs text-[#993C1D]">
                    {aiAdjustment.fats}g/day
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs font-medium text-[#712B13]">
                    Rest days
                  </span>
                  <span className="text-xs text-[#993C1D]">
                    {aiAdjustment.restDays} per week
                  </span>
                </div>
              </div>
              <p className="text-xs text-[#993C1D] mt-3">
                Next check-in in 14 days.
              </p>
            </div>

            <button
              onClick={() => navigate('/home')}
              className="w-full bg-[#D85A30] text-white rounded-2xl py-4 text-sm font-medium"
            >
              Back to home
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default CheckIn
