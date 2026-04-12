"use client"

import {ChevronDown} from 'lucide-react'
import {useState} from 'react'

const defaults = [
  {
    _id: 'f1',
    question: 'How long does solar installation take?',
    answer: 'Most residential installations are completed within 2-5 days after approvals.',
  },
  {
    _id: 'f2',
    question: 'What maintenance is required?',
    answer: 'Solar systems need minimal maintenance, mainly periodic cleaning and annual checks.',
  },
]

export default function FAQAccordion({faqs}) {
  const list = faqs?.length ? faqs : defaults
  const [openId, setOpenId] = useState(list[0]?._id)

  return (
    <div className="faq-list">
      {list.map((faq) => {
        const isOpen = openId === faq._id
        return (
          <article key={faq._id} className={`faq-item ${isOpen ? 'open' : ''}`}>
            <button
              type="button"
              className="faq-question"
              onClick={() => setOpenId(isOpen ? null : faq._id)}
              aria-expanded={isOpen}
            >
              <span>{faq.question}</span>
              <ChevronDown size={18} />
            </button>
            <div className="faq-answer">
              <p>{faq.answer}</p>
            </div>
          </article>
        )
      })}
    </div>
  )
}
