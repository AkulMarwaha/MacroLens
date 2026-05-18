import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const PRESETS = {
  PPL: {
    name: 'PPL',
    description: 'Push, Pull, Legs — 6 days/week',
    days: [
      {
        day: 'Mon',
        label: 'Push',
        exercises: [
          'Bench press',
          'Overhead press',
          'Incline dumbbell press',
          'Tricep pushdown',
        ],
      },
      {
        day: 'Tue',
        label: 'Pull',
        exercises: ['Deadlift', 'Pull ups', 'Barbell row', 'Bicep curl'],
      },
      {
        day: 'Wed',
        label: 'Legs',
        exercises: ['Squat', 'Leg press', 'Romanian deadlift', 'Leg curl'],
      },
      {
        day: 'Thu',
        label: 'Push',
        exercises: [
          'Bench press',
          'Overhead press',
          'Lateral raise',
          'Tricep dips',
        ],
      },
      {
        day: 'Fri',
        label: 'Pull',
        exercises: ['Deadlift', 'Pull ups', 'Cable row', 'Face pull'],
      },
      {
        day: 'Sat',
        label: 'Legs',
        exercises: ['Squat', 'Leg press', 'Lunges', 'Calf raises'],
      },
      { day: 'Sun', label: 'Rest', exercises: [] },
    ],
  },
  'Upper/Lower': {
    name: 'Upper/Lower',
    description: '4 days/week, balanced',
    days: [
      {
        day: 'Mon',
        label: 'Upper',
        exercises: ['Bench press', 'Barbell row', 'Overhead press', 'Pull ups'],
      },
      {
        day: 'Tue',
        label: 'Lower',
        exercises: ['Squat', 'Romanian deadlift', 'Leg press', 'Leg curl'],
      },
      { day: 'Wed', label: 'Rest', exercises: [] },
      {
        day: 'Thu',
        label: 'Upper',
        exercises: [
          'Incline press',
          'Cable row',
          'Lateral raise',
          'Bicep curl',
        ],
      },
      {
        day: 'Fri',
        label: 'Lower',
        exercises: ['Deadlift', 'Lunges', 'Leg extension', 'Calf raises'],
      },
      { day: 'Sat', label: 'Rest', exercises: [] },
      { day: 'Sun', label: 'Rest', exercises: [] },
    ],
  },
  'Full Body': {
    name: 'Full Body',
    description: '3 days/week, great for beginners',
    days: [
      {
        day: 'Mon',
        label: 'Full Body',
        exercises: ['Squat', 'Bench press', 'Barbell row', 'Overhead press'],
      },
      { day: 'Tue', label: 'Rest', exercises: [] },
      {
        day: 'Wed',
        label: 'Full Body',
        exercises: ['Deadlift', 'Pull ups', 'Dumbbell press', 'Lunges'],
      },
      { day: 'Thu', label: 'Rest', exercises: [] },
      {
        day: 'Fri',
        label: 'Full Body',
        exercises: ['Squat', 'Bench press', 'Cable row', 'Lateral raise'],
      },
      { day: 'Sat', label: 'Rest', exercises: [] },
      { day: 'Sun', label: 'Rest', exercises: [] },
    ],
  },
  'Bro Split': {
    name: 'Bro Split',
    description: 'One muscle group per day',
    days: [
      {
        day: 'Mon',
        label: 'Chest',
        exercises: ['Bench press', 'Incline press', 'Cable fly', 'Dips'],
      },
      {
        day: 'Tue',
        label: 'Back',
        exercises: ['Deadlift', 'Pull ups', 'Barbell row', 'Cable row'],
      },
      {
        day: 'Wed',
        label: 'Shoulders',
        exercises: [
          'Overhead press',
          'Lateral raise',
          'Front raise',
          'Face pull',
        ],
      },
      {
        day: 'Thu',
        label: 'Arms',
        exercises: [
          'Bicep curl',
          'Hammer curl',
          'Tricep pushdown',
          'Skull crushers',
        ],
      },
      {
        day: 'Fri',
        label: 'Legs',
        exercises: ['Squat', 'Leg press', 'Romanian deadlift', 'Calf raises'],
      },
      { day: 'Sat', label: 'Rest', exercises: [] },
      { day: 'Sun', label: 'Rest', exercises: [] },
    ],
  },
}

const DAYS_OF_WEEK = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const SHORT_DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

function getTodayIndex() {
  const day = new Date().getDay()
  return day === 0 ? 6 : day - 1
}

function Workout() {
  const navigate = useNavigate()
  const [activeNav, setActiveNav] = useState('workout')
  const [selectedSplit, setSelectedSplit] = useState('PPL')
  const [showSplitSheet, setShowSplitSheet] = useState(false)
  const [customSplit, setCustomSplit] = useState('')
  const [sessionExercises, setSessionExercises] = useState(
    PRESETS['PPL'].days[getTodayIndex()].exercises.map((name) => ({
      name,
      sets: 3,
      done: false,
    }))
  )
  const [newExercise, setNewExercise] = useState('')
  const [showAddExercise, setShowAddExercise] = useState(false)
  const [sessionDone, setSessionDone] = useState(false)

  const todayIndex = getTodayIndex()
  const split = PRESETS[selectedSplit]
  const todaySession = split ? split.days[todayIndex] : null

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

  function handleSelectPreset(name) {
    setSelectedSplit(name)
    setSessionExercises(
      PRESETS[name].days[todayIndex].exercises.map((ex) => ({
        name: ex,
        sets: 3,
        done: false,
      }))
    )
  }

  function toggleDone(i) {
    const updated = [...sessionExercises]
    updated[i].done = !updated[i].done
    setSessionExercises(updated)
  }

  function changeSets(i, delta) {
    const updated = [...sessionExercises]
    updated[i].sets = Math.max(1, updated[i].sets + delta)
    setSessionExercises(updated)
  }

  function addExercise() {
    if (!newExercise.trim()) return
    setSessionExercises([
      ...sessionExercises,
      { name: newExercise.trim(), sets: 3, done: false },
    ])
    setNewExercise('')
    setShowAddExercise(false)
  }

  function finishSession() {
    setSessionDone(true)
  }

  return (
    <div className="min-h-screen bg-[#fafaf8] pb-24">
      {/* Header */}
      <div className="flex justify-between items-center px-6 pt-6 pb-2">
        <h1 className="text-2xl font-medium text-[#1a1a1a]">Workout</h1>
        <button
          onClick={() => setShowSplitSheet(true)}
          className="text-sm font-medium text-[#D85A30]"
        >
          Edit split
        </button>
      </div>

      {/* Weekly strip */}
      <div className="px-4 mb-4">
        <div className="flex gap-1.5">
          {DAYS_OF_WEEK.map((d, i) => {
            const session = split ? split.days[i] : null
            const isToday = i === todayIndex
            const isRest = session && session.label === 'Rest'
            const isPast = i < todayIndex
            return (
              <div
                key={i}
                className={`flex-1 rounded-xl py-2 text-center border ${
                  isToday
                    ? 'bg-[#D85A30] border-[#D85A30]'
                    : isPast && !isRest
                      ? 'bg-[#FFF3EE] border-[#F5C4B3]'
                      : 'bg-white border-[#f0ede8]'
                }`}
              >
                <p
                  className={`text-xs mb-1 ${
                    isToday
                      ? 'text-white'
                      : isPast && !isRest
                        ? 'text-[#993C1D]'
                        : 'text-[#555]'
                  }`}
                >
                  {SHORT_DAYS[i]}
                </p>
                <p
                  className={`text-xs font-medium leading-tight ${
                    isToday
                      ? 'text-white'
                      : isPast && !isRest
                        ? 'text-[#D85A30]'
                        : 'text-[#3d3d3d]'
                  }`}
                >
                  {session ? session.label : 'Rest'}
                </p>
                <div
                  className={`w-1 h-1 rounded-full mx-auto mt-1 ${
                    isToday
                      ? 'bg-white opacity-60'
                      : isPast && !isRest
                        ? 'bg-[#D85A30]'
                        : 'bg-[#e0ddd8]'
                  }`}
                />
              </div>
            )
          })}
        </div>
      </div>

      {/* Today's session */}
      {todaySession && todaySession.label !== 'Rest' ? (
        <div className="mx-4">
          <p className="text-xs text-[#555] mb-2">
            Today — {todaySession.label}
          </p>
          <div className="bg-white border border-[#f0ede8] rounded-2xl p-4">
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm font-medium text-[#1a1a1a]">
                {todaySession.label} day
              </p>
              <span className="bg-[#FFF3EE] text-[#993C1D] text-xs font-medium px-3 py-1 rounded-full">
                {selectedSplit}
              </span>
            </div>

            {/* Session complete banner */}
            {sessionDone && (
              <div className="bg-[#EAF3DE] rounded-xl p-3 mb-4 flex items-center gap-2">
                <span>✅</span>
                <p className="text-sm font-medium text-[#3B6D11]">
                  Session complete — great work!
                </p>
              </div>
            )}

            {/* Exercise list */}
            <div className="flex flex-col gap-3 mb-4">
              {sessionExercises.map((ex, i) => (
                <div key={i} className="flex items-center gap-3">
                  <button
                    onClick={() => toggleDone(i)}
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                      ex.done
                        ? 'bg-[#D85A30] border-[#D85A30]'
                        : 'border-[#e0ddd8]'
                    }`}
                  >
                    {ex.done && <span className="text-white text-xs">✓</span>}
                  </button>
                  <div className="flex-1">
                    <p
                      className={`text-sm font-medium ${ex.done ? 'text-[#999] line-through' : 'text-[#1a1a1a]'}`}
                    >
                      {ex.name}
                    </p>
                    <p className="text-xs text-[#555]">{ex.sets} sets</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => changeSets(i, -1)}
                      className="w-6 h-6 rounded-full bg-[#f0ede8] flex items-center justify-center text-sm text-[#1a1a1a]"
                    >
                      −
                    </button>
                    <span className="text-sm font-medium text-[#1a1a1a] w-4 text-center">
                      {ex.sets}
                    </span>
                    <button
                      onClick={() => changeSets(i, 1)}
                      className="w-6 h-6 rounded-full bg-[#f0ede8] flex items-center justify-center text-sm text-[#1a1a1a]"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Add exercise */}
            {showAddExercise ? (
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  placeholder="Exercise name"
                  value={newExercise}
                  onChange={(e) => setNewExercise(e.target.value)}
                  className="flex-1 border border-[#f0ede8] rounded-xl py-2.5 px-3 text-sm text-[#1a1a1a] bg-white"
                  onKeyDown={(e) => e.key === 'Enter' && addExercise()}
                />
                <button
                  onClick={addExercise}
                  className="bg-[#D85A30] text-white rounded-xl px-4 text-sm font-medium"
                >
                  Add
                </button>
                <button
                  onClick={() => setShowAddExercise(false)}
                  className="text-sm text-[#555] px-2"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowAddExercise(true)}
                className="w-full border border-dashed border-[#e0ddd8] rounded-xl py-2.5 text-sm text-[#555] flex items-center justify-center gap-1.5 mb-4"
              >
                <span>+</span> Add exercise
              </button>
            )}

            <button
              onClick={finishSession}
              disabled={sessionDone}
              className={`w-full py-4 rounded-2xl text-sm font-medium transition-colors ${
                sessionDone
                  ? 'bg-[#e8e4df] text-[#b4b2a9] cursor-not-allowed'
                  : 'bg-[#D85A30] text-white'
              }`}
            >
              {sessionDone ? 'Session logged ✓' : 'Finish session'}
            </button>
          </div>
        </div>
      ) : (
        <div className="mx-4">
          <div className="bg-white border border-[#f0ede8] rounded-2xl p-6 text-center">
            <p className="text-3xl mb-3">😴</p>
            <p className="text-sm font-medium text-[#1a1a1a] mb-1">Rest day</p>
            <p className="text-xs text-[#555]">
              Recovery is part of the process. Enjoy your rest day.
            </p>
          </div>
        </div>
      )}

      {/* Quick split switch */}
      <div className="px-4 mt-4">
        <p className="text-xs text-[#555] mb-2">Quick switch</p>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {Object.keys(PRESETS).map((name) => (
            <button
              key={name}
              onClick={() => handleSelectPreset(name)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-medium border transition-colors ${
                selectedSplit === name
                  ? 'bg-[#FFF3EE] border-[#F5C4B3] text-[#993C1D]'
                  : 'bg-white border-[#f0ede8] text-[#555]'
              }`}
            >
              {name}
            </button>
          ))}
          <button
            className="flex-shrink-0 px-4 py-2 rounded-full text-xs font-medium border bg-white border-[#f0ede8] text-[#555]"
            onClick={() => setShowSplitSheet(true)}
          >
            Custom
          </button>
        </div>
      </div>

      {/* Split sheet */}
      {showSplitSheet && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 flex items-end"
          onClick={() => setShowSplitSheet(false)}
        >
          <div
            className="bg-[#fafaf8] rounded-t-3xl w-full p-6 max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-9 h-1 bg-[#e0ddd8] rounded-full mx-auto mb-6" />
            <h2 className="text-lg font-medium text-[#1a1a1a] mb-1">
              Choose your split
            </h2>
            <p className="text-sm text-[#555] mb-5">
              Pick a preset or describe your own routine.
            </p>

            <div className="grid grid-cols-2 gap-3 mb-5">
              {Object.values(PRESETS).map((p) => (
                <button
                  key={p.name}
                  onClick={() => {
                    handleSelectPreset(p.name)
                    setShowSplitSheet(false)
                  }}
                  className={`border rounded-2xl p-4 text-left transition-colors ${
                    selectedSplit === p.name
                      ? 'bg-[#FFF3EE] border-[#F5C4B3]'
                      : 'bg-white border-[#f0ede8]'
                  }`}
                >
                  <p
                    className={`text-sm font-medium mb-1 ${selectedSplit === p.name ? 'text-[#993C1D]' : 'text-[#1a1a1a]'}`}
                  >
                    {p.name}
                  </p>
                  <p
                    className={`text-xs leading-snug ${selectedSplit === p.name ? 'text-[#D85A30]' : 'text-[#555]'}`}
                  >
                    {p.description}
                  </p>
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3 mb-4">
              <div className="flex-1 h-px bg-[#f0ede8]" />
              <span className="text-xs text-[#555]">or build your own</span>
              <div className="flex-1 h-px bg-[#f0ede8]" />
            </div>

            <input
              type="text"
              placeholder="e.g. Chest/Back, Arms, Legs, Rest..."
              value={customSplit}
              onChange={(e) => setCustomSplit(e.target.value)}
              className="w-full border border-[#f0ede8] rounded-xl py-3 px-4 text-sm text-[#1a1a1a] bg-white mb-4"
            />

            <button
              onClick={() => setShowSplitSheet(false)}
              className="w-full bg-[#D85A30] text-white rounded-2xl py-4 text-sm font-medium mb-3"
            >
              Save split
            </button>
            <button
              onClick={() => setShowSplitSheet(false)}
              className="w-full text-sm text-[#555] py-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

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

export default Workout
