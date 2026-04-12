"use client"

import {useMemo, useState} from 'react'

export default function SolarCalculator() {
  const [bill, setBill] = useState(3000)
  const [roof, setRoof] = useState(500)
  const [consumption, setConsumption] = useState(400)

  const result = useMemo(() => {
    const systemSize = Math.max(1, (consumption / 120).toFixed(1))
    const roofFactor = roof >= 350 ? 1 : 0.8
    const yearlySavings = Math.round(bill * 12 * 0.65 * roofFactor)

    return {
      systemSize,
      yearlySavings,
    }
  }, [bill, roof, consumption])

  return (
    <div className="calculator card-soft">
      <div className="field-grid">
        <label>
          Monthly Electricity Bill (INR)
          <input type="number" min="500" value={bill} onChange={(e) => setBill(Number(e.target.value))} />
        </label>
        <label>
          Roof Size (sq ft)
          <input type="number" min="100" value={roof} onChange={(e) => setRoof(Number(e.target.value))} />
        </label>
        <label>
          Monthly Consumption (kWh)
          <input
            type="number"
            min="100"
            value={consumption}
            onChange={(e) => setConsumption(Number(e.target.value))}
          />
        </label>
      </div>

      <div className="calc-output">
        <div>
          <p>Estimated Annual Savings</p>
          <strong>INR {result.yearlySavings.toLocaleString()}</strong>
        </div>
        <div>
          <p>Recommended Solar Size</p>
          <strong>{result.systemSize} kW</strong>
        </div>
      </div>
    </div>
  )
}
