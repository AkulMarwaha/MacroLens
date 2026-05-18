import React, { useState } from 'react'

function Onboarding({ onComplete }) {
  const [step, setStep] = useState(0)
  const [disclaimerChecked, setDisclaimerChecked] = useState(false)
  const [termsChecked, setTermsChecked] = useState(false)
  const [birthday, setBirthday] = useState({ month: '', day: '', year: '' })
  const [ageError, setAgeError] = useState(false)
  const [profile, setProfile] = useState({
    name: '',
    heightFt: '',
    heightIn: '',
    weight: '',
    sex: '',
    activityLevel: '',
    goal: '',
    unit: 'imperial',
  })

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  function calculateAge() {
    const { month, day, year } = birthday
    if (!month || !day || !year) return null
    const dob = new Date(parseInt(year), months.indexOf(month), parseInt(day))
    const today = new Date()
    let age = today.getFullYear() - dob.getFullYear()
    const m = today.getMonth() - dob.getMonth()
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) age--
    return age
  }

  function handleBirthdayNext() {
    const age = calculateAge()
    if (age === null) return
    if (age < 18) {
      setAgeError(true)
    } else {
      setAgeError(false)
      setStep(3)
    }
  }

  function handleProfileSubmit() {
    if (
      !profile.name ||
      !profile.weight ||
      !profile.sex ||
      !profile.activityLevel ||
      !profile.goal
    )
      return
    onComplete(profile)
  }

  const days = Array.from({ length: 31 }, (_, i) => i + 1)
  const currentYear = new Date().getFullYear()
  const years = Array.from(
    { length: currentYear - 1920 + 1 },
    (_, i) => currentYear - i
  )

  return (
    <div className="min-h-screen bg-[#fafaf8] flex flex-col items-center justify-start py-8 px-4">
      <div className="w-full max-w-sm">
        {/* Step dots */}
        <div className="flex justify-center gap-2 mb-8">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all ${
                i === step
                  ? 'w-5 bg-[#D85A30]'
                  : i < step
                    ? 'w-5 bg-[#F5C4B3]'
                    : 'w-1.5 bg-[#e8e4df]'
              }`}
            />
          ))}
        </div>

        {/* Step 0 — Disclaimer */}
        {step === 0 && (
          <div>
            <div className="w-12 h-12 bg-[#FFF3EE] rounded-2xl flex items-center justify-center mb-5">
              <span className="text-2xl">⚠️</span>
            </div>
            <h1 className="text-2xl font-medium text-[#1a1a1a] mb-2">
              Before you begin
            </h1>
            <p className="text-sm text-[#3d3d3d] mb-5 leading-relaxed">
              Please read this important disclaimer carefully before using
              MacroLens.
            </p>
            <div className="bg-white border border-[#f0ede8] rounded-2xl p-4 h-64 overflow-y-auto mb-5 text-sm text-[#3d3d3d] leading-relaxed space-y-3">
              <p>
                <strong className="text-[#1a1a1a]">Not medical advice.</strong>{' '}
                MacroLens is a personal nutrition and fitness tracking tool for
                informational purposes only. Nothing in this app constitutes
                medical advice, diagnosis, or treatment.
              </p>
              <p>
                <strong className="text-[#1a1a1a]">
                  Consult a professional.
                </strong>{' '}
                Always consult a qualified doctor, registered dietitian, or
                licensed healthcare provider before making significant changes
                to your diet or exercise routine.
              </p>
              <p>
                <strong className="text-[#1a1a1a]">
                  Accuracy of information.
                </strong>{' '}
                Nutritional data is based on general estimates and publicly
                available databases. MacroLens cannot guarantee accuracy for
                every food item.
              </p>
              <p>
                <strong className="text-[#1a1a1a]">No liability.</strong>{' '}
                MacroLens and its developers assume no liability for any injury,
                illness, or adverse health outcome arising from your use of this
                app.
              </p>
              <p>
                <strong className="text-[#1a1a1a]">Eating disorders.</strong>{' '}
                This app involves calorie and macro tracking. If you have a
                history of disordered eating, please speak with a healthcare
                provider before using this app. If you are in crisis, contact
                the NEDA helpline at 1-800-931-2237.
              </p>
            </div>
            <label className="flex items-start gap-3 mb-6 cursor-pointer">
              <input
                type="checkbox"
                checked={disclaimerChecked}
                onChange={(e) => setDisclaimerChecked(e.target.checked)}
                className="mt-0.5 w-4 h-4 accent-[#D85A30]"
              />
              <span className="text-sm text-[#3d3d3d] leading-relaxed">
                I have read and understand this disclaimer and acknowledge that
                MacroLens does not provide medical advice.
              </span>
            </label>
            <button
              onClick={() => setStep(1)}
              disabled={!disclaimerChecked}
              className={`w-full py-4 rounded-2xl text-sm font-medium transition-colors ${
                disclaimerChecked
                  ? 'bg-[#D85A30] text-white'
                  : 'bg-[#e8e4df] text-[#b4b2a9] cursor-not-allowed'
              }`}
            >
              I understand — continue
            </button>
          </div>
        )}

        {/* Step 1 — Terms */}
        {step === 1 && (
          <div>
            <div className="w-12 h-12 bg-[#FFF3EE] rounded-2xl flex items-center justify-center mb-5">
              <span className="text-2xl">📄</span>
            </div>
            <h1 className="text-2xl font-medium text-[#1a1a1a] mb-2">
              Terms of use
            </h1>
            <p className="text-sm text-[#3d3d3d] mb-5 leading-relaxed">
              By using MacroLens you agree to these terms.
            </p>
            <div className="bg-white border border-[#f0ede8] rounded-2xl p-4 h-64 overflow-y-auto mb-5 text-sm text-[#3d3d3d] leading-relaxed space-y-3">
              <p>
                <strong className="text-[#1a1a1a]">1. Eligibility.</strong> You
                must be 18 years of age or older to use MacroLens. By proceeding
                you confirm you meet this requirement.
              </p>
              <p>
                <strong className="text-[#1a1a1a]">
                  2. Personal use only.
                </strong>{' '}
                MacroLens is intended for personal, non-commercial use only.
              </p>
              <p>
                <strong className="text-[#1a1a1a]">3. Your data.</strong> We
                collect only the information you provide. We do not sell your
                data to third parties. You may request deletion of your account
                at any time.
              </p>
              <p>
                <strong className="text-[#1a1a1a]">
                  4. Assumption of risk.
                </strong>{' '}
                You acknowledge that nutrition and fitness activities carry
                inherent risks. You voluntarily assume all risk of injury or
                adverse health outcomes.
              </p>
              <p>
                <strong className="text-[#1a1a1a]">
                  5. Limitation of liability.
                </strong>{' '}
                To the fullest extent permitted by law, MacroLens and its
                developers shall not be liable for any damages arising from your
                use of the app.
              </p>
              <p>
                <strong className="text-[#1a1a1a]">6. Changes to terms.</strong>{' '}
                We reserve the right to update these terms at any time.
                Continued use constitutes acceptance of updated terms.
              </p>
              <p>
                <strong className="text-[#1a1a1a]">7. Governing law.</strong>{' '}
                These terms are governed by the laws of the state in which the
                developer resides.
              </p>
            </div>
            <label className="flex items-start gap-3 mb-6 cursor-pointer">
              <input
                type="checkbox"
                checked={termsChecked}
                onChange={(e) => setTermsChecked(e.target.checked)}
                className="mt-0.5 w-4 h-4 accent-[#D85A30]"
              />
              <span className="text-sm text-[#3d3d3d] leading-relaxed">
                I agree to the Terms of Use and confirm I am 18 years of age or
                older.
              </span>
            </label>
            <button
              onClick={() => setStep(2)}
              disabled={!termsChecked}
              className={`w-full py-4 rounded-2xl text-sm font-medium transition-colors ${
                termsChecked
                  ? 'bg-[#D85A30] text-white'
                  : 'bg-[#e8e4df] text-[#b4b2a9] cursor-not-allowed'
              }`}
            >
              Agree & continue
            </button>
            <button
              onClick={() => setStep(0)}
              className="w-full text-sm text-[#555] mt-3 py-2"
            >
              Back
            </button>
          </div>
        )}

        {/* Step 2 — Birthday */}
        {step === 2 && (
          <div>
            <div className="w-12 h-12 bg-[#FFF3EE] rounded-2xl flex items-center justify-center mb-5">
              <span className="text-2xl">🎂</span>
            </div>
            <h1 className="text-2xl font-medium text-[#1a1a1a] mb-2">
              Verify your age
            </h1>
            <p className="text-sm text-[#3d3d3d] mb-6 leading-relaxed">
              MacroLens is only available to users 18 and older. Please enter
              your date of birth.
            </p>
            <p className="text-xs text-[#555] mb-2">Date of birth</p>
            <div className="flex gap-2 mb-4">
              <select
                value={birthday.month}
                onChange={(e) =>
                  setBirthday({ ...birthday, month: e.target.value })
                }
                className="flex-1 border border-[#f0ede8] rounded-xl py-3 px-2 text-sm text-[#1a1a1a] bg-white"
              >
                <option value="">Month</option>
                {months.map((m) => (
                  <option key={m}>{m}</option>
                ))}
              </select>
              <select
                value={birthday.day}
                onChange={(e) =>
                  setBirthday({ ...birthday, day: e.target.value })
                }
                className="flex-1 border border-[#f0ede8] rounded-xl py-3 px-2 text-sm text-[#1a1a1a] bg-white"
              >
                <option value="">Day</option>
                {days.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>
              <select
                value={birthday.year}
                onChange={(e) =>
                  setBirthday({ ...birthday, year: e.target.value })
                }
                className="flex-1 border border-[#f0ede8] rounded-xl py-3 px-2 text-sm text-[#1a1a1a] bg-white"
              >
                <option value="">Year</option>
                {years.map((y) => (
                  <option key={y}>{y}</option>
                ))}
              </select>
            </div>
            {ageError && (
              <div className="bg-[#FCEBEB] rounded-xl p-3 mb-4">
                <p className="text-sm text-[#A32D2D]">
                  You must be 18 or older to use MacroLens. Please consult a
                  parent or guardian and speak with a healthcare provider about
                  your nutrition goals.
                </p>
              </div>
            )}
            <button
              onClick={handleBirthdayNext}
              disabled={!birthday.month || !birthday.day || !birthday.year}
              className={`w-full py-4 rounded-2xl text-sm font-medium transition-colors ${
                birthday.month && birthday.day && birthday.year
                  ? 'bg-[#D85A30] text-white'
                  : 'bg-[#e8e4df] text-[#b4b2a9] cursor-not-allowed'
              }`}
            >
              Verify & continue
            </button>
            <button
              onClick={() => setStep(1)}
              className="w-full text-sm text-[#555] mt-3 py-2"
            >
              Back
            </button>
          </div>
        )}

        {/* Step 3 — Profile setup */}
        {step === 3 && (
          <div>
            <div className="w-12 h-12 bg-[#FFF3EE] rounded-2xl flex items-center justify-center mb-5">
              <span className="text-2xl">👤</span>
            </div>
            <h1 className="text-2xl font-medium text-[#1a1a1a] mb-2">
              Set up your profile
            </h1>
            <p className="text-sm text-[#3d3d3d] mb-6 leading-relaxed">
              This helps MacroLens personalise your macro targets and
              recommendations.
            </p>

            {/* Unit toggle */}
            <div className="flex bg-[#f0ede8] rounded-xl p-1 mb-5">
              <button
                onClick={() => setProfile({ ...profile, unit: 'imperial' })}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                  profile.unit === 'imperial'
                    ? 'bg-white text-[#D85A30] border border-[#F5C4B3]'
                    : 'text-[#555]'
                }`}
              >
                Imperial (lbs, ft)
              </button>
              <button
                onClick={() => setProfile({ ...profile, unit: 'metric' })}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                  profile.unit === 'metric'
                    ? 'bg-white text-[#D85A30] border border-[#F5C4B3]'
                    : 'text-[#555]'
                }`}
              >
                Metric (kg, cm)
              </button>
            </div>

            {/* Name */}
            <div className="mb-4">
              <p className="text-xs text-[#555] mb-1.5">Your name</p>
              <input
                type="text"
                placeholder="First name"
                value={profile.name}
                onChange={(e) =>
                  setProfile({ ...profile, name: e.target.value })
                }
                className="w-full border border-[#f0ede8] rounded-xl py-3 px-4 text-sm text-[#1a1a1a] bg-white"
              />
            </div>

            {/* Height */}
            <div className="mb-4">
              <p className="text-xs text-[#555] mb-1.5">Height</p>
              {profile.unit === 'imperial' ? (
                <div className="flex gap-2">
                  <select
                    value={profile.heightFt}
                    onChange={(e) =>
                      setProfile({ ...profile, heightFt: e.target.value })
                    }
                    className="flex-1 border border-[#f0ede8] rounded-xl py-3 px-3 text-sm text-[#1a1a1a] bg-white"
                  >
                    <option value="">ft</option>
                    {[4, 5, 6, 7].map((f) => (
                      <option key={f}>{f} ft</option>
                    ))}
                  </select>
                  <select
                    value={profile.heightIn}
                    onChange={(e) =>
                      setProfile({ ...profile, heightIn: e.target.value })
                    }
                    className="flex-1 border border-[#f0ede8] rounded-xl py-3 px-3 text-sm text-[#1a1a1a] bg-white"
                  >
                    <option value="">in</option>
                    {Array.from({ length: 12 }, (_, i) => i).map((i) => (
                      <option key={i}>{i} in</option>
                    ))}
                  </select>
                </div>
              ) : (
                <input
                  type="number"
                  placeholder="e.g. 175"
                  value={profile.heightCm}
                  onChange={(e) =>
                    setProfile({ ...profile, heightCm: e.target.value })
                  }
                  className="w-full border border-[#f0ede8] rounded-xl py-3 px-4 text-sm text-[#1a1a1a] bg-white"
                />
              )}
            </div>

            {/* Weight */}
            <div className="mb-4">
              <p className="text-xs text-[#555] mb-1.5">Weight</p>
              <div className="relative">
                <input
                  type="number"
                  placeholder={
                    profile.unit === 'imperial' ? 'e.g. 165' : 'e.g. 75'
                  }
                  value={profile.weight}
                  onChange={(e) =>
                    setProfile({ ...profile, weight: e.target.value })
                  }
                  className="w-full border border-[#f0ede8] rounded-xl py-3 px-4 text-sm text-[#1a1a1a] bg-white pr-12"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#555]">
                  {profile.unit === 'imperial' ? 'lbs' : 'kg'}
                </span>
              </div>
            </div>

            {/* Sex */}
            <div className="mb-4">
              <p className="text-xs text-[#555] mb-1.5">Biological sex</p>
              <div className="flex gap-2">
                {['Male', 'Female', 'Prefer not to say'].map((s) => (
                  <button
                    key={s}
                    onClick={() => setProfile({ ...profile, sex: s })}
                    className={`flex-1 py-3 rounded-xl text-xs font-medium border transition-colors ${
                      profile.sex === s
                        ? 'bg-[#FFF3EE] border-[#F5C4B3] text-[#993C1D]'
                        : 'bg-white border-[#f0ede8] text-[#555]'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Activity level */}
            <div className="mb-4">
              <p className="text-xs text-[#555] mb-1.5">Activity level</p>
              <select
                value={profile.activityLevel}
                onChange={(e) =>
                  setProfile({ ...profile, activityLevel: e.target.value })
                }
                className="w-full border border-[#f0ede8] rounded-xl py-3 px-4 text-sm text-[#1a1a1a] bg-white"
              >
                <option value="">Select activity level</option>
                <option>Sedentary (little or no exercise)</option>
                <option>Lightly active (1–3 days/week)</option>
                <option>Moderately active (3–5 days/week)</option>
                <option>Very active (6–7 days/week)</option>
                <option>Extremely active (physical job + training)</option>
              </select>
            </div>

            {/* Goal */}
            <div className="mb-6">
              <p className="text-xs text-[#555] mb-1.5">Your goal</p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  'Lose weight',
                  'Build muscle',
                  'Maintain weight',
                  'Body recomp',
                ].map((g) => (
                  <button
                    key={g}
                    onClick={() => setProfile({ ...profile, goal: g })}
                    className={`py-3 rounded-xl text-sm font-medium border transition-colors ${
                      profile.goal === g
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
              onClick={handleProfileSubmit}
              disabled={
                !profile.name ||
                !profile.weight ||
                !profile.sex ||
                !profile.activityLevel ||
                !profile.goal
              }
              className={`w-full py-4 rounded-2xl text-sm font-medium transition-colors ${
                profile.name &&
                profile.weight &&
                profile.sex &&
                profile.activityLevel &&
                profile.goal
                  ? 'bg-[#D85A30] text-white'
                  : 'bg-[#e8e4df] text-[#b4b2a9] cursor-not-allowed'
              }`}
            >
              Create my profile
            </button>
            <button
              onClick={() => setStep(2)}
              className="w-full text-sm text-[#555] mt-3 py-2"
            >
              Back
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Onboarding
