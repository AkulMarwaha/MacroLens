import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const weightData = {
  '2W': [
    { date: 'Apr 22', weight: 177 },
    { date: 'Apr 24', weight: 176.5 },
    { date: 'Apr 26', weight: 176 },
    { date: 'Apr 28', weight: 175.5 },
    { date: 'Apr 30', weight: 175.2 },
    { date: 'May 2', weight: 175 },
    { date: 'May 4', weight: 174.8 },
  ],
  '1M': [
    { date: 'Apr 5', weight: 180 },
    { date: 'Apr 10', weight: 179 },
    { date: 'Apr 15', weight: 178 },
    { date: 'Apr 20', weight: 177 },
    { date: 'Apr 25', weight: 176 },
    { date: 'Apr 30', weight: 175.5 },
    { date: 'May 5', weight: 175 },
  ],
  '3M': [
    { date: 'Feb', weight: 183 },
    { date: 'Mar', weight: 181 },
    { date: 'Apr 1', weight: 179 },
    { date: 'Apr 15', weight: 177 },
    { date: 'May 1', weight: 175.5 },
    { date: 'May 5', weight: 175 },
  ],
  All: [
    { date: 'Jan', weight: 185 },
    { date: 'Feb', weight: 183 },
    { date: 'Mar', weight: 181 },
    { date: 'Apr', weight: 178 },
    { date: 'May', weight: 175 },
  ],
}

const macroWeekData = [
  { day: 'M', protein: 140, carbs: 220, fats: 65 },
  { day: 'T', protein: 155, carbs: 245, fats: 72 },
  { day: 'W', protein: 130, carbs: 200, fats: 60 },
  { day: 'T', protein: 160, carbs: 250, fats: 74 },
  { day: 'F', protein: 148, carbs: 235, fats: 68 },
  { day: 'S', protein: 120, carbs: 190, fats: 55 },
  { day: 'S', protein: 88, carbs: 156, fats: 63 },
]

const checkInHistory = [
  {
    date: 'May 5, 2026',
    weightChange: -3,
    tags: [
      'Energy: Good',
      'Strength: Improving',
      'Sleep: Okay',
      'Stress: Manageable',
    ],
    adjustment: 'Calories +150 kcal · Protein +10g',
  },
  {
    date: 'Apr 21, 2026',
    weightChange: -2,
    tags: ['Energy: High', 'Strength: Plateau', 'Sleep: Good', 'Stress: Low'],
    adjustment: 'Added extra rest day · Carbs +30g',
  },
  {
    date: 'Apr 7, 2026',
    weightChange: 0,
    tags: ['Energy: Low', 'Strength: Plateau', 'Sleep: Poor', 'Stress: High'],
    adjustment: 'Calories −100 kcal · Rest days increased',
  },
  {
    date: 'Mar 24, 2026',
    weightChange: -3,
    tags: [
      'Energy: Good',
      'Strength: Big gains',
      'Sleep: Great',
      'Stress: Low',
    ],
    adjustment: 'Plan maintained — great consistency',
  },
]

const stats = [
  { label: 'Weight lost', value: '8 lbs', sub: 'since start' },
  { label: 'Avg protein', value: '138g', sub: 'goal 150g' },
  { label: 'Streak', value: '12 days', sub: 'personal best' },
  { label: 'Calories hit', value: '22/28', sub: 'days on target' },
  { label: 'Sessions done', value: '18', sub: 'this month' },
  { label: 'Check-ins', value: '4', sub: 'completed' },
]

function Progress() {
  const navigate = useNavigate()
  const [activeNav, setActiveNav] = useState('progress')
  const [period, setPeriod] = useState('1M')

  const navItems = [
    { id: 'home', icon: '🏠', path: '/home' },
    { id: 'scan', icon: '📷', path: '/scan' },
    { id: 'workout', icon: '🏋️', path: '/workout' },
    { id: 'progress', icon: '📈', path: '/progress' },
    { id: 'profile', icon: '👤', path: '/profile' },
  ]

  function handleNav(item) {
    setActiveNav(item.id)
    navigate(item.path)
  }

  const currentWeightData = weightData[period]
  const weights = currentWeightData.map((d) => d.weight)
  const minWeight = Math.min(...weights) - 1
  const maxWeight = Math.max(...weights) + 1
  const range = maxWeight - minWeight
  const chartWidth = 300
  const chartHeight = 100

  function getX(i) {
    return (i / (currentWeightData.length - 1)) * chartWidth
  }

  function getY(w) {
    return chartHeight - ((w - minWeight) / range) * chartHeight
  }

  const points = currentWeightData
    .map((d, i) => `${getX(i)},${getY(d.weight)}`)
    .join(' ')

  const maxMacro = Math.max(
    ...macroWeekData.map((d) => d.protein + d.carbs + d.fats)
  )

  return (
    <div className="min-h-screen bg-[#fafaf8] pb-24">
      {/* Header */}
      <div className="flex justify-between items-center px-6 pt-6 pb-4">
        <h1 className="text-2xl font-medium text-[#1a1a1a]">Progress</h1>
        <div className="flex bg-[#f0ede8] rounded-xl p-1 gap-0.5">
          {['2W', '1M', '3M', 'All'].map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                period === p
                  ? 'bg-white text-[#D85A30] border border-[#F5C4B3]'
                  : 'text-[#555]'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Stats grid */}
      <div className="px-4 mb-4">
        <div className="grid grid-cols-3 gap-2">
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-white border border-[#f0ede8] rounded-2xl p-3 text-center"
            >
              <p className="text-lg font-medium text-[#1a1a1a]">{s.value}</p>
              <p className="text-xs text-[#555] mt-0.5 leading-tight">
                {s.label}
              </p>
              <p className="text-xs text-[#D85A30] mt-0.5">{s.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Weight chart */}
      <div className="mx-4 mb-4 bg-white border border-[#f0ede8] rounded-2xl p-4">
        <p className="text-sm font-medium text-[#1a1a1a] mb-1">
          Weight over time
        </p>
        <p className="text-xs text-[#555] mb-3">
          {weights[0]} lbs → {weights[weights.length - 1]} lbs
        </p>
        <svg
          viewBox={`0 0 ${chartWidth} ${chartHeight + 20}`}
          width="100%"
          preserveAspectRatio="none"
          className="overflow-visible"
        >
          {/* Gradient fill */}
          <defs>
            <linearGradient id="weightGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#D85A30" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#D85A30" stopOpacity="0" />
            </linearGradient>
          </defs>
          <polygon
            points={`0,${getY(weights[0])} ${points} ${chartWidth},${getY(weights[weights.length - 1])} ${chartWidth},${chartHeight} 0,${chartHeight}`}
            fill="url(#weightGrad)"
          />
          <polyline
            points={points}
            fill="none"
            stroke="#D85A30"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {currentWeightData.map((d, i) => (
            <circle
              key={i}
              cx={getX(i)}
              cy={getY(d.weight)}
              r={i === currentWeightData.length - 1 ? 5 : 3.5}
              fill="#D85A30"
              stroke={i === currentWeightData.length - 1 ? '#FFF3EE' : 'none'}
              strokeWidth="2"
            />
          ))}
          {/* X axis labels */}
          <text x="0" y={chartHeight + 16} fontSize="9" fill="#888">
            {currentWeightData[0].date}
          </text>
          <text
            x={chartWidth}
            y={chartHeight + 16}
            fontSize="9"
            fill="#D85A30"
            textAnchor="end"
          >
            Today
          </text>
        </svg>
      </div>

      {/* Macros bar chart */}
      <div className="mx-4 mb-4 bg-white border border-[#f0ede8] rounded-2xl p-4">
        <p className="text-sm font-medium text-[#1a1a1a] mb-1">
          Macros this week
        </p>
        <p className="text-xs text-[#555] mb-3">
          Daily protein, carbs and fats
        </p>
        <div className="flex items-end gap-2 h-20 mb-2">
          {macroWeekData.map((d, i) => {
            const total = d.protein + d.carbs + d.fats
            const pHeight = Math.round((d.protein / maxMacro) * 80)
            const cHeight = Math.round((d.carbs / maxMacro) * 80)
            const fHeight = Math.round((d.fats / maxMacro) * 80)
            const isToday = i === macroWeekData.length - 1
            return (
              <div
                key={i}
                className="flex-1 flex flex-col items-center gap-0.5"
              >
                <div className="w-full flex gap-0.5 items-end">
                  <div
                    style={{ height: pHeight + 'px' }}
                    className="flex-1 rounded-t-sm bg-[#D85A30]"
                  />
                  <div
                    style={{ height: cHeight + 'px' }}
                    className="flex-1 rounded-t-sm bg-[#F0997B]"
                  />
                  <div
                    style={{ height: fHeight + 'px' }}
                    className="flex-1 rounded-t-sm bg-[#FAC775]"
                  />
                </div>
                <p
                  className={`text-xs mt-1 ${isToday ? 'text-[#D85A30] font-medium' : 'text-[#555]'}`}
                >
                  {d.day}
                </p>
              </div>
            )
          })}
        </div>
        <div className="flex gap-4 mt-2">
          {[
            { label: 'Protein', color: '#D85A30' },
            { label: 'Carbs', color: '#F0997B' },
            { label: 'Fats', color: '#FAC775' },
          ].map((l) => (
            <div key={l.label} className="flex items-center gap-1.5">
              <div
                className="w-2 h-2 rounded-sm"
                style={{ background: l.color }}
              />
              <span className="text-xs text-[#555]">{l.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Check-in history */}
      <div className="px-4">
        <p className="text-xs text-[#555] mb-2">Check-in history</p>
        <div className="flex flex-col gap-3">
          {checkInHistory.map((c, i) => (
            <div
              key={i}
              className="bg-white border border-[#f0ede8] rounded-2xl p-4"
            >
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm font-medium text-[#1a1a1a]">{c.date}</p>
                <span
                  className={`text-xs font-medium px-2.5 py-1 rounded-lg ${
                    c.weightChange < 0
                      ? 'bg-[#EAF3DE] text-[#3B6D11]'
                      : c.weightChange > 0
                        ? 'bg-[#FAECE7] text-[#993C1D]'
                        : 'bg-[#f0ede8] text-[#555]'
                  }`}
                >
                  {c.weightChange < 0
                    ? c.weightChange + ' lbs'
                    : c.weightChange > 0
                      ? '+' + c.weightChange + ' lbs'
                      : 'No change'}
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {c.tags.map((tag, j) => (
                  <span
                    key={j}
                    className="text-xs bg-[#fafaf8] border border-[#f0ede8] rounded-lg px-2 py-1 text-[#3d3d3d]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-xs text-[#D85A30]">
                Plan adjusted — {c.adjustment}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#f0ede8] flex items-center justify-around px-6 pb-4 pt-3">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleNav(item)}
            className={`text-2xl transition-opacity ${
              activeNav === item.id ? 'opacity-100' : 'opacity-30'
            }`}
          >
            {item.icon}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Progress
