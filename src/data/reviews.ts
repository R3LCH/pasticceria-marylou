// Verbatim Google Maps reviews for "Mary Loù", collected 2026-09-30.
// Source: https://maps.app.goo.gl/JzZekZSvMkiQJ5xK9 — do not edit review text.

export type Review = {
  author: string
  rating: number
  text: string
  lang: 'it' | 'en'
}

export const googleRating = { rating: 4.7, count: 256 } as const

export const reviews: readonly Review[] = [
  {
    author: 'Giuseppe Napoletano',
    rating: 5,
    text: 'È sempre un piacere fare colazione da loro o prendere dei pasticcini da mangiare a casa. Tutta roba fresca, invitante e deliziosa. Cappuccino ottimo! Personale gentile ed accogliente. Ci torno sempre volentieri quando capito da queste parti.',
    lang: 'it',
  },
  {
    author: 'Lorna',
    rating: 5,
    text: "Absolutely delicious patisserie! We've visited every day so far for the last six days and couldn't fault anything, everything we've had has been very fine and delicate and compares favourably with many good French patisseries. The staff are lovely too and have been very welcoming and patient, especially with our few words of Italian. Would highly recommend to anyone visiting Scalea.",
    lang: 'en',
  },
  {
    author: "Maria D'Ingianni",
    rating: 5,
    text: "Pasticceria straordinaria su tutti i punti di vista. La freschezza in primis, ed anche la correttezza delle informazioni sui prodotti senza glutine. Il proprietario e le ragazze danno sempre informazioni molto dettagliate su tutti i prodotti. Comunque i fatti parlano da soli! C'è sempre la fila davanti al banco dolci! Sia pasticceria che prima colazione!",
    lang: 'it',
  },
  {
    author: 'Michelle Doyle',
    rating: 5,
    text: 'We ordered a personalised cake for friends and it was amazing, great decorations, sponge very light and very tasty. Our friends adored it.\n\nThe staff are very friendly and helpful. I would definitely recommend.',
    lang: 'en',
  },
  {
    author: 'Mary',
    rating: 5,
    text: 'Personale gentilissimo e una qualità davvero super.. pasticcini indimenticabili.. la pasticceria più buona di Scalea!!!🤤.. stra consigliata! ❤️🍰',
    lang: 'it',
  },
  {
    author: 'K Mahon',
    rating: 5,
    text: 'Delicious selection of sweets. Great coffee and I love how they offer cacao on the cappuccinos. Also, very friendly team. I think the price was right too, can’t wait to go back.',
    lang: 'en',
  },
]
