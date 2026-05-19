import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()
  const [activeNav, setActiveNav] = useState('home')
  const [showCheckInBanner] = useState(true)
  const [showLogOptions, setShowLogOptions] = useState(false)
  const [showManualEntry, setShowManualEntry] = useState(false)
  const [manualForm, setManualForm] = useState({
    foodName: '',
    calories: '',
    protein: '',
    carbs: '',
    fats: '',
    fiber: '',
  })
  const [loggedFoods, setLoggedFoods] = useState([])

  const macros = {
    calories: { eaten: 1358, goal: 2200 },
    protein: { eaten: 88, goal: 150 },
    carbs: { eaten: 156, goal: 250 },
    fats: { eaten: 63, goal: 75 },
    fiber: { eaten: 22, goal: 30 },
  }

  const weekData = [
    { day: 'M', calories: 1900 },
    { day: 'T', calories: 2100 },
    { day: 'W', calories: 1750 },
    { day: 'T', calories: 2050 },
    { day: 'F', calories: 1950 },
    { day: 'S', calories: 2080 },
    { day: 'S', calories: 1358, isToday: true },
  ]

  const maxCalories = Math.max(...weekData.map((d) => d.calories))

  function getGreeting() {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 17) return 'Good afternoon'
    return 'Good evening'
  }

  const caloriesLeft = macros.calories.goal - macros.calories.eaten
  const daysToGoal = 38

  const macroCards = [
    {
      name: 'Protein',
      eaten: macros.protein.eaten,
      goal: macros.protein.goal,
      color: '#D85A30',
    },
    {
      name: 'Carbs',
      eaten: macros.carbs.eaten,
      goal: macros.carbs.goal,
      color: '#F0997B',
    },
    {
      name: 'Fats',
      eaten: macros.fats.eaten,
      goal: macros.fats.goal,
      color: '#FAC775',
    },
    {
      name: 'Fiber',
      eaten: macros.fiber.eaten,
      goal: macros.fiber.goal,
      color: '#9FE1CB',
    },
  ]

  function handleManualSubmit() {
    if (!manualForm.foodName || !manualForm.calories) return
    setLoggedFoods([...loggedFoods, manualForm])
    setManualForm({
      foodName: '',
      calories: '',
      protein: '',
      carbs: '',
      fats: '',
      fiber: '',
    })
    setShowManualEntry(false)
    setShowLogOptions(false)
  }

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

  return (
    <div className="min-h-screen bg-[#fafaf8] pb-24">
      {/* Status bar */}
      <div className="flex justify-between items-center px-6 pt-4 pb-2">
        <span className="text-sm font-medium text-[#1a1a1a]">
          {new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </span>
      </div>

      {/* Greeting + streak */}
      <div className="px-6 pb-4">
        <p className="text-sm text-[#3d3d3d] mb-1">{getGreeting()},</p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-medium text-[#1a1a1a]">Alex</span>
          <div className="flex items-center gap-1.5 bg-[#FFF3EE] rounded-full px-3 py-1.5">
            <span className="text-sm">🔥</span>
            <span className="text-xs font-medium text-[#D85A30]">
              12 day streak
            </span>
          </div>
        </div>
      </div>

      {/* Check-in banner */}
      {showCheckInBanner && (
        <div className="mx-4 mb-4 bg-[#FFF3EE] border border-[#F5C4B3] rounded-2xl p-4 flex items-center gap-3">
          <div className="w-9 h-9 bg-[#D85A30] rounded-xl flex items-center justify-center flex-shrink-0">
            <span className="text-white text-lg">📅</span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-[#712B13]">
              Bi-weekly check-in due
            </p>
            <p className="text-xs text-[#993C1D] mt-0.5">
              Today · Takes about 2 minutes
            </p>
          </div>
          <button
            onClick={() => navigate('/checkin')}
            className="bg-[#D85A30] text-white rounded-xl px-3 py-2 text-xs font-medium flex-shrink-0"
          >
            Start
          </button>
        </div>
      )}

      {/* Graph card */}
      <div className="mx-4 mb-3 bg-white rounded-2xl border border-[#f0ede8] p-4">
        <div className="flex justify-between items-start mb-3">
          <div>
            <p className="text-xs text-[#555] mb-1">Calories remaining today</p>
            <p className="text-2xl font-medium text-[#1a1a1a]">
              {caloriesLeft}{' '}
              <span className="text-sm font-normal text-[#555]">kcal left</span>
            </p>
            <p className="text-xs text-[#555] mt-0.5">
              {macros.calories.eaten} eaten · {macros.calories.goal} goal
            </p>
          </div>
          <div className="text-right">
            <div className="bg-[#FFF3EE] rounded-xl px-2.5 py-1">
              <span className="text-xs font-medium text-[#D85A30]">
                Goal in ~{daysToGoal} days
              </span>
            </div>
            <p className="text-xs text-[#555] mt-1">at current rate</p>
          </div>
        </div>

        {/* Bar chart */}
        <div className="flex items-end gap-1.5 h-20 mb-1">
          {weekData.map((d, i) => {
            const height = Math.round((d.calories / maxCalories) * 80)
            return (
              <div key={i} className="flex-1 flex flex-col items-center">
                <div
                  style={{ height: height + 'px' }}
                  className={`w-full rounded-t-md ${
                    d.isToday ? 'bg-[#D85A30]' : 'bg-[#F5C4B3]'
                  }`}
                />
              </div>
            )
          })}
        </div>
        <div className="flex">
          {weekData.map((d, i) => (
            <div key={i} className="flex-1 text-center">
              <span
                className={`text-xs ${
                  d.isToday ? 'text-[#D85A30] font-medium' : 'text-[#555]'
                }`}
              >
                {d.day}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Macro cards */}
      <div className="px-4 mb-4">
        <p className="text-xs text-[#555] mb-2">Today's macros</p>
        <div className="grid grid-cols-2 gap-2.5">
          {macroCards.map((m) => {
            const pct = Math.round((m.eaten / m.goal) * 100)
            const left = m.goal - m.eaten
            return (
              <div
                key={m.name}
                className="bg-white border border-[#f0ede8] rounded-2xl p-3"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-[#3d3d3d]">{m.name}</span>
                  <span
                    className="text-xs font-medium"
                    style={{ color: left <= 0 ? '#555' : '#D85A30' }}
                  >
                    {left > 0 ? left + 'g left' : 'Done'}
                  </span>
                </div>
                <div className="h-1.5 bg-[#f0ede8] rounded-full overflow-hidden mb-2">
                  <div
                    style={{
                      width: Math.min(pct, 100) + '%',
                      background: m.color,
                    }}
                    className="h-full rounded-full"
                  />
                </div>
                <div className="flex justify-between items-end">
                  <span className="text-sm font-medium text-[#1a1a1a]">
                    {m.eaten}g
                  </span>
                  <span className="text-xs text-[#555]">/ {m.goal}g</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Logged foods list */}
      {loggedFoods.length > 0 && (
        <div className="px-4 mb-4">
          <p className="text-xs text-[#555] mb-2">Logged today</p>
          <div className="flex flex-col gap-2">
            {loggedFoods.map((food, i) => (
              <div
                key={i}
                className="bg-white border border-[#f0ede8] rounded-2xl p-3 flex justify-between items-center"
              >
                <div>
                  <p className="text-sm font-medium text-[#1a1a1a]">
                    {food.foodName}
                  </p>
                  <p className="text-xs text-[#555] mt-0.5">
                    P: {food.protein || 0}g · C: {food.carbs || 0}g · F:{' '}
                    {food.fats || 0}g
                  </p>
                </div>
                <span className="text-sm font-medium text-[#D85A30]">
                  {food.calories} kcal
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Log macros button */}
      <div className="px-4">
        <button
          onClick={() => setShowLogOptions(true)}
          className="w-full bg-[#D85A30] text-white rounded-2xl py-4 text-sm font-medium flex items-center justify-center gap-2"
        >
          <span>📷</span>
          Log macros
        </button>
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

      {/* Log options sheet */}
      {showLogOptions && !showManualEntry && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 flex items-end"
          onClick={() => setShowLogOptions(false)}
        >
          <div
            className="bg-[#fafaf8] rounded-t-3xl w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-9 h-1 bg-[#e0ddd8] rounded-full mx-auto mb-6" />
            <h2 className="text-lg font-medium text-[#1a1a1a] mb-2">
              Log macros
            </h2>
            <p className="text-sm text-[#555] mb-6">
              How would you like to log your food?
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => setShowLogOptions(false)}
                className="w-full bg-[#D85A30] text-white rounded-2xl py-4 text-sm font-medium flex items-center justify-center gap-2"
              >
                <span>📷</span>
                Take a photo or scan barcode
              </button>
              <button
                onClick={() => setShowManualEntry(true)}
                className="w-full bg-white border border-[#f0ede8] text-[#1a1a1a] rounded-2xl py-4 text-sm font-medium flex items-center justify-center gap-2"
              >
                <span>✏️</span>
                Enter macros manually
              </button>
            </div>
            <button
              onClick={() => setShowLogOptions(false)}
              className="w-full text-sm text-[#555] mt-4 py-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Manual entry sheet */}
      {showManualEntry && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 flex items-end"
          onClick={() => {
            setShowManualEntry(false)
            setShowLogOptions(false)
          }}
        >
          <div
            className="bg-[#fafaf8] rounded-t-3xl w-full p-6 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-9 h-1 bg-[#e0ddd8] rounded-full mx-auto mb-6" />
            <h2 className="text-lg font-medium text-[#1a1a1a] mb-1">
              Manual entry
            </h2>
            <p className="text-sm text-[#555] mb-6">
              Enter the nutrition info for your food.
            </p>
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-xs text-[#555] mb-1.5">Food name</p>
                <input
                  type="text"
                  placeholder="e.g. Grilled chicken breast"
                  value={manualForm.foodName}
                  onChange={(e) =>
                    setManualForm({ ...manualForm, foodName: e.target.value })
                  }
                  className="w-full border border-[#f0ede8] rounded-xl py-3 px-4 text-sm text-[#1a1a1a] bg-white"
                />
              </div>
              <div>
                <p className="text-xs text-[#555] mb-1.5">Calories</p>
                <div className="relative">
                  <input
                    type="number"
                    placeholder="e.g. 300"
                    value={manualForm.calories}
                    onChange={(e) =>
                      setManualForm({ ...manualForm, calories: e.target.value })
                    }
                    className="w-full border border-[#f0ede8] rounded-xl py-3 px-4 text-sm text-[#1a1a1a] bg-white pr-14"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#555]">
                    kcal
                  </span>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-1">
                  <p className="text-xs text-[#555] mb-1.5">Protein</p>
                  <div className="relative">
                    <input
                      type="number"
                      placeholder="0"
                      value={manualForm.protein}
                      onChange={(e) =>
                        setManualForm({
                          ...manualForm,
                          protein: e.target.value,
                        })
                      }
                      className="w-full border border-[#f0ede8] rounded-xl py-3 px-4 text-sm text-[#1a1a1a] bg-white pr-8"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#555]">
                      g
                    </span>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-xs text-[#555] mb-1.5">Carbs</p>
                  <div className="relative">
                    <input
                      type="number"
                      placeholder="0"
                      value={manualForm.carbs}
                      onChange={(e) =>
                        setManualForm({ ...manualForm, carbs: e.target.value })
                      }
                      className="w-full border border-[#f0ede8] rounded-xl py-3 px-4 text-sm text-[#1a1a1a] bg-white pr-8"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#555]">
                      g
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-1">
                  <p className="text-xs text-[#555] mb-1.5">Fats</p>
                  <div className="relative">
                    <input
                      type="number"
                      placeholder="0"
                      value={manualForm.fats}
                      onChange={(e) =>
                        setManualForm({ ...manualForm, fats: e.target.value })
                      }
                      className="w-full border border-[#f0ede8] rounded-xl py-3 px-4 text-sm text-[#1a1a1a] bg-white pr-8"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#555]">
                      g
                    </span>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-xs text-[#555] mb-1.5">Fiber</p>
                  <div className="relative">
                    <input
                      type="number"
                      placeholder="0"
                      value={manualForm.fiber}
                      onChange={(e) =>
                        setManualForm({ ...manualForm, fiber: e.target.value })
                      }
                      className="w-full border border-[#f0ede8] rounded-xl py-3 px-4 text-sm text-[#1a1a1a] bg-white pr-8"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#555]">
                      g
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={handleManualSubmit}
              disabled={!manualForm.foodName || !manualForm.calories}
              className={`w-full py-4 rounded-2xl text-sm font-medium mt-6 transition-colors ${
                manualForm.foodName && manualForm.calories
                  ? 'bg-[#D85A30] text-white'
                  : 'bg-[#e8e4df] text-[#b4b2a9] cursor-not-allowed'
              }`}
            >
              Add to log
            </button>
            <button
              onClick={() => setShowManualEntry(false)}
              className="w-full text-sm text-[#555] mt-3 py-2"
            >
              Back
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Home
