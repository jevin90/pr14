import { useState } from 'react'
import './App.css'

function getLatestBirthDate() {
  const today = new Date()
  const year = today.getFullYear() - 18
  const month = today.getMonth()
  const day = Math.min(today.getDate(), new Date(year, month + 1, 0).getDate())

  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    course: '',
  })
  const [submittedData, setSubmittedData] = useState(null)

  function handleChange(event) {
    const { name, value } = event.target
    const fieldValue = name === 'phone' ? value.replace(/\D/g, '').slice(0, 10) : value
    setFormData({ ...formData, [name]: fieldValue })
  }

  function handleSubmit(event) {
    event.preventDefault()
    setSubmittedData({ ...formData })
  }

  return (
    <main className="page">
      <section className="registration-card">
        <header className="form-header">
          <span className="form-icon" aria-hidden="true">🎓</span>
          <p className="eyebrow">STUDENT DETAILS</p>
          <h1>Student Registration</h1>
          <p className="intro">Fill in the details below to register for a course.</p>
        </header>

        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Full name</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <div className="form-row">
            <div className="field">
              <label htmlFor="email">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@gmail.com"
                pattern="[a-zA-Z0-9._%+-]+@gmail[.]com"
                title="Enter a valid Gmail address, such as name@gmail.com."
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="field">
              <label htmlFor="phone">Phone number</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="10-digit phone number"
                inputMode="numeric"
                maxLength={10}
                pattern="[0-9]{10}"
                title="Enter exactly 10 digits."
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="field">
              <label htmlFor="dateOfBirth">Date of birth</label>
              <input
                id="dateOfBirth"
                name="dateOfBirth"
                type="date"
                max={getLatestBirthDate()}
                title="You must be at least 18 years old."
                value={formData.dateOfBirth}
                onChange={handleChange}
                required
              />
            </div>
            <div className="field">
              <label htmlFor="course">Select course</label>
              <select
                id="course"
                name="course"
                value={formData.course}
                onChange={handleChange}
                required
              >
                <option value="">Choose a course</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Business">Business</option>
                <option value="Engineering">Engineering</option>
                <option value="Arts">Arts</option>
              </select>
            </div>
          </div>

          <fieldset>
            <legend>Gender</legend>
            <div className="radio-options">
              {['Female', 'Male', 'Other'].map((gender) => (
                <label className="radio-option" key={gender}>
                  <input
                    type="radio"
                    name="gender"
                    value={gender}
                    checked={formData.gender === gender}
                    onChange={handleChange}
                    required
                  />
                  {gender}
                </label>
              ))}
            </div>
          </fieldset>

          <button type="submit">Register now <span aria-hidden="true">→</span></button>
        </form>

        {submittedData && (
          <section className="submitted-details" aria-live="polite">
            <h2>Registration successful!</h2>
            <p>Here are the details you submitted:</p>
            <dl>
              <div><dt>Full name</dt><dd>{submittedData.name}</dd></div>
              <div><dt>Email address</dt><dd>{submittedData.email}</dd></div>
              <div><dt>Phone number</dt><dd>{submittedData.phone}</dd></div>
              <div><dt>Date of birth</dt><dd>{submittedData.dateOfBirth}</dd></div>
              <div><dt>Gender</dt><dd>{submittedData.gender}</dd></div>
              <div><dt>Course</dt><dd>{submittedData.course}</dd></div>
            </dl>
          </section>
        )}
      </section>
      <p className="page-footer">Your next chapter starts here.</p>
    </main>
  )
}

export default App
