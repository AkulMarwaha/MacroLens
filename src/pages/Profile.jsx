import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Profile() {
  const navigate = useNavigate()
  const [activeNav, setActiveNav] = useState('profile')
  const [isEditing, setIsEditing] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [profile, setProfile] = useState({
    name: 'Alex',
    unit: 'imperial',
    heightFt: '5',
    heightIn: '10',
    heightCm: '',
    weight: '175',
    sex: 'Male',
    activityLevel: 'Moderately active (3–5 days/week)',
    goal: 'Lose weight',
  })
  const [editForm, setEditForm] = useState({ ...profile })

  const activityLevels = [
    'Sedentary (little or no exercise)',
    'Lightly active (1–3 days/week)',
    'Moderately active (3–5 days/week)',
    'Very active (6–7 days/week)',
    'Extremely active (physical job + training)',
  ]

  const goals = [
    'Lose weight',
    'Build muscle',
    'Maintain weight',
    'Body recomp',
  ]

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

  function handleSave() {
    setProfile({ ...editForm })
    setIsEditing(false)
  }

  function handleCancel() {
    setEditForm({ ...profile })
    setIsEditing(false)
  }

  return (
    <div className="min-h-screen bg-[#fafaf8] pb-24">
      {/* Header */}
      <div className="flex justify-between items-center px-6 pt-6 pb-4">
        <h1 className="text-2xl font-medium text-[#1a1a1a]">Profile</h1>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="text-sm font-medium text-[#D85A30]"
          >
            Edit
          </button>
        ) : (
          <div className="flex gap-4">
            <button
              onClick={handleCancel}
              className="text-sm font-medium text-[#555]"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="text-sm font-medium text-[#D85A30]"
            >
              Save
            </button>
          </div>
        )}
      </div>

      {/* Avatar + name */}
      <div className="flex flex-col items-center pb-6">
        <div className="w-20 h-20 bg-[#FFF3EE] rounded-full flex items-center justify-center mb-3">
          <span className="text-4xl">👤</span>
        </div>
        <p className="text-xl font-medium text-[#1a1a1a]">{profile.name}</p>
        <p className="text-sm text-[#555] mt-1">{profile.goal}</p>
      </div>

      {/* Stats row */}
      <div className="mx-4 mb-5 grid grid-cols-3 gap-2">
        <div className="bg-white border border-[#f0ede8] rounded-2xl p-3 text-center">
          <p className="text-lg font-medium text-[#1a1a1a]">
            {profile.unit === 'imperial'
              ? profile.heightFt + "'" + profile.heightIn + '"'
              : profile.heightCm + ' cm'}
          </p>
          <p className="text-xs text-[#555] mt-0.5">Height</p>
        </div>
        <div className="bg-white border border-[#f0ede8] rounded-2xl p-3 text-center">
          <p className="text-lg font-medium text-[#1a1a1a]">
            {profile.weight} {profile.unit === 'imperial' ? 'lbs' : 'kg'}
          </p>
          <p className="text-xs text-[#555] mt-0.5">Weight</p>
        </div>
        <div className="bg-white border border-[#f0ede8] rounded-2xl p-3 text-center">
          <p className="text-lg font-medium text-[#1a1a1a]">{profile.sex}</p>
          <p className="text-xs text-[#555] mt-0.5">Sex</p>
        </div>
      </div>

      {/* View mode */}
      {!isEditing && (
        <div className="mx-4 flex flex-col gap-3">
          <div className="bg-white border border-[#f0ede8] rounded-2xl p-4">
            <p className="text-xs text-[#555] mb-1">Activity level</p>
            <p className="text-sm font-medium text-[#1a1a1a]">
              {profile.activityLevel}
            </p>
          </div>
          <div className="bg-white border border-[#f0ede8] rounded-2xl p-4">
            <p className="text-xs text-[#555] mb-1">Goal</p>
            <p className="text-sm font-medium text-[#1a1a1a]">{profile.goal}</p>
          </div>
          <div className="bg-white border border-[#f0ede8] rounded-2xl p-4">
            <p className="text-xs text-[#555] mb-1">Units</p>
            <p className="text-sm font-medium text-[#1a1a1a]">
              {profile.unit === 'imperial'
                ? 'Imperial (lbs, ft)'
                : 'Metric (kg, cm)'}
            </p>
          </div>
          <div className="bg-white border border-[#f0ede8] rounded-2xl overflow-hidden">
            <button className="w-full flex justify-between items-center px-4 py-3.5 border-b border-[#f0ede8]">
              <span className="text-sm text-[#1a1a1a]">Privacy policy</span>
              <span className="text-[#555]">›</span>
            </button>
            <button className="w-full flex justify-between items-center px-4 py-3.5 border-b border-[#f0ede8]">
              <span className="text-sm text-[#1a1a1a]">Terms of use</span>
              <span className="text-[#555]">›</span>
            </button>
            <button className="w-full flex justify-between items-center px-4 py-3.5">
              <span className="text-sm text-[#1a1a1a]">Disclaimer</span>
              <span className="text-[#555]">›</span>
            </button>
          </div>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="w-full bg-white border border-[#f0ede8] rounded-2xl py-3.5 text-sm font-medium text-red-500"
          >
            Delete account
          </button>
        </div>
      )}

      {/* Edit mode */}
      {isEditing && (
        <div className="mx-4 flex flex-col gap-4">
          <div>
            <p className="text-xs text-[#555] mb-1.5">Units</p>
            <div className="flex bg-[#f0ede8] rounded-xl p-1">
              <button
                onClick={() => setEditForm({ ...editForm, unit: 'imperial' })}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                  editForm.unit === 'imperial'
                    ? 'bg-white text-[#D85A30] border border-[#F5C4B3]'
                    : 'text-[#555]'
                }`}
              >
                Imperial (lbs, ft)
              </button>
              <button
                onClick={() => setEditForm({ ...editForm, unit: 'metric' })}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                  editForm.unit === 'metric'
                    ? 'bg-white text-[#D85A30] border border-[#F5C4B3]'
                    : 'text-[#555]'
                }`}
              >
                Metric (kg, cm)
              </button>
            </div>
          </div>

          <div>
            <p className="text-xs text-[#555] mb-1.5">Your name</p>
            <input
              type="text"
              value={editForm.name}
              onChange={(e) =>
                setEditForm({ ...editForm, name: e.target.value })
              }
              className="w-full border border-[#f0ede8] rounded-xl py-3 px-4 text-sm text-[#1a1a1a] bg-white"
            />
          </div>

          <div>
            <p className="text-xs text-[#555] mb-1.5">Height</p>
            {editForm.unit === 'imperial' ? (
              <div className="flex gap-2 items-center">
                <select
                  value={editForm.heightFt}
                  onChange={(e) =>
                    setEditForm({ ...editForm, heightFt: e.target.value })
                  }
                  className="flex-1 border border-[#f0ede8] rounded-xl py-3 px-3 text-sm text-[#1a1a1a] bg-white"
                >
                  {[4, 5, 6, 7].map((f) => (
                    <option key={f}>{f}</option>
                  ))}
                </select>
                <span className="text-sm text-[#555]">ft</span>
                <select
                  value={editForm.heightIn}
                  onChange={(e) =>
                    setEditForm({ ...editForm, heightIn: e.target.value })
                  }
                  className="flex-1 border border-[#f0ede8] rounded-xl py-3 px-3 text-sm text-[#1a1a1a] bg-white"
                >
                  {Array.from({ length: 12 }, (_, i) => i).map((i) => (
                    <option key={i}>{i}</option>
                  ))}
                </select>
                <span className="text-sm text-[#555]">in</span>
              </div>
            ) : (
              <div className="relative">
                <input
                  type="number"
                  value={editForm.heightCm}
                  onChange={(e) =>
                    setEditForm({ ...editForm, heightCm: e.target.value })
                  }
                  placeholder="e.g. 175"
                  className="w-full border border-[#f0ede8] rounded-xl py-3 px-4 text-sm text-[#1a1a1a] bg-white pr-12"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#555]">
                  cm
                </span>
              </div>
            )}
          </div>

          <div>
            <p className="text-xs text-[#555] mb-1.5">Weight</p>
            <div className="relative">
              <input
                type="number"
                value={editForm.weight}
                onChange={(e) =>
                  setEditForm({ ...editForm, weight: e.target.value })
                }
                placeholder={
                  editForm.unit === 'imperial' ? 'e.g. 165' : 'e.g. 75'
                }
                className="w-full border border-[#f0ede8] rounded-xl py-3 px-4 text-sm text-[#1a1a1a] bg-white pr-12"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#555]">
                {editForm.unit === 'imperial' ? 'lbs' : 'kg'}
              </span>
            </div>
          </div>

          <div>
            <p className="text-xs text-[#555] mb-1.5">Biological sex</p>
            <div className="flex gap-2">
              {['Male', 'Female', 'Prefer not to say'].map((s) => (
                <button
                  key={s}
                  onClick={() => setEditForm({ ...editForm, sex: s })}
                  className={`flex-1 py-3 rounded-xl text-xs font-medium border transition-colors ${
                    editForm.sex === s
                      ? 'bg-[#FFF3EE] border-[#F5C4B3] text-[#993C1D]'
                      : 'bg-white border-[#f0ede8] text-[#555]'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs text-[#555] mb-1.5">Activity level</p>
            <select
              value={editForm.activityLevel}
              onChange={(e) =>
                setEditForm({ ...editForm, activityLevel: e.target.value })
              }
              className="w-full border border-[#f0ede8] rounded-xl py-3 px-4 text-sm text-[#1a1a1a] bg-white"
            >
              {activityLevels.map((a) => (
                <option key={a}>{a}</option>
              ))}
            </select>
          </div>

          <div>
            <p className="text-xs text-[#555] mb-1.5">Your goal</p>
            <div className="grid grid-cols-2 gap-2">
              {goals.map((g) => (
                <button
                  key={g}
                  onClick={() => setEditForm({ ...editForm, goal: g })}
                  className={`py-3 rounded-xl text-sm font-medium border transition-colors ${
                    editForm.goal === g
                      ? 'bg-[#FFF3EE] border-[#F5C4B3] text-[#993C1D]'
                      : 'bg-white border-[#f0ede8] text-[#555]'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleSave}
            className="w-full bg-[#D85A30] text-white rounded-2xl py-4 text-sm font-medium"
          >
            Save changes
          </button>
        </div>
      )}

      {/* Delete confirmation */}
      {showDeleteConfirm && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 flex items-end"
          onClick={() => setShowDeleteConfirm(false)}
        >
          <div
            className="bg-[#fafaf8] rounded-t-3xl w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-9 h-1 bg-[#e0ddd8] rounded-full mx-auto mb-6" />
            <h2 className="text-lg font-medium text-[#1a1a1a] mb-2">
              Delete account
            </h2>
            <p className="text-sm text-[#555] mb-6 leading-relaxed">
              Are you sure you want to delete your account? This will
              permanently remove all your data including your macro logs,
              workout history, and check-ins. This cannot be undone.
            </p>
            <button
              onClick={() => setShowDeleteConfirm(false)}
              className="w-full bg-red-500 text-white rounded-2xl py-4 text-sm font-medium mb-3"
            >
              Yes, delete my account
            </button>
            <button
              onClick={() => setShowDeleteConfirm(false)}
              className="w-full bg-white border border-[#f0ede8] text-[#1a1a1a] rounded-2xl py-4 text-sm font-medium"
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

export default Profile
