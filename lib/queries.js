export const projectsQuery = `*[_type == "project"] | order(orderRank asc, completedAt desc){
  _id,
  title,
  location,
  capacityKw,
  description,
  image
}`

export const faqsQuery = `*[_type == "faq"] | order(orderRank asc){
  _id,
  question,
  answer
}`

export const testimonialsQuery = `*[_type == "testimonial"] | order(orderRank asc){
  _id,
  name,
  location,
  quote,
  rating
}`

export const siteSettingsQuery = `*[_type == "siteSettings"][0]{
  companyName,
  address,
  phone,
  email,
  whatsappNumber,
  whatsappMessage
}`
