export type Page = 'home' | 'about' | 'formats' | 'contact';

export type Language = 'en' | 'ar';

export interface NavTranslations {
  home: string;
  about: string;
  formats: string;
  contact: string;
  callNow: string;
}

export interface HeroTranslations {
  welcomeTo: string;
  title: string;
  subtitle: string;
  onCar: string;
  description: string;
  scheduleCall: string;
  explore: string;
  scroll: string;
  liveCampaigns: string;
  liveSubtitle: string;
}

export interface MissionTranslations {
  title: string;
  description1: string;
  nawafith: string;
  description2: string;
  onCar: string;
  description3: string;
  impactful: string;
  measurable: string;
  description4: string;
  goal: string;
  realTime: string;
  description5: string;
  learnMore: string;
}

export interface SolutionsTranslations {
  title: string;
  subtitle: string;
  digitalTops: string;
  digitalDesc: string;
  dataTracked: string;
  dataDesc: string;
  scalable: string;
  scalableDesc: string;
}

export interface CTATranslations {
  boostTitle: string;
  boostSubtitle: string;
  boostButton: string;
  elevateTitle: string;
  elevateSubtitle: string;
  exploreButton: string;
}

export interface AboutTranslations {
  title: string;
  description1: string;
  description2: string;
  description3: string;
  missionTitle: string;
  missionDesc1: string;
  missionDesc2: string;
  missionDesc3: string;
}

export interface FormatTranslations {
  title: string;
  desc: string;
  formatsTitle: string;
  live: string;
  liveDesc: string;
  static: string;
  staticDesc: string;
  geo: string;
  geoDesc: string;
  feat1: string;
  feat1Desc: string;
  feat2: string;
  feat2Desc: string;
  feat3: string;
  feat3Desc: string;
}

export interface FAQ {
  q: string;
  a: string;
}

export interface ContactTranslations {
  title: string;
  desc: string;
  contactTitle: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  submit: string;
  faqTitle: string;
  faqs: FAQ[];
}

export interface FooterTranslations {
  desc: string;
  signupTitle: string;
  signupDesc: string;
  email: string;
  send: string;
  contactUs: string;
  copyright: string;
  about: string;
  formats: string;
  contact: string;
  legal: string;
}

export interface LeverageTranslations {
  title: string;
  desc: string;
  realtime: string;
  realtimeDesc: string;
  strategic: string;
  strategicDesc: string;
  download: string;
  presentation: string;
}

export interface Translations {
  nav: NavTranslations;
  hero: HeroTranslations;
  clients: string;
  mission: MissionTranslations;
  solutions: SolutionsTranslations;
  cta: CTATranslations;
  about: AboutTranslations;
  formats: FormatTranslations;
  contact: ContactTranslations;
  footer: FooterTranslations;
  leverage: LeverageTranslations;
}
