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
  marquee: string[];
  nawafithAdvertising: string;
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
  missionLabel: string;
  pioneeringTitle: string;
  mobilePart: string;
  statusLabel: string;
  statusValue: string;
  estLabel: string;
  estValue: string;
  coverageEfficiency: string;
  activeMonitoring: string;
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
  label: string;
  precisionTitle: string;
  advertisingTitle: string;
  synergyDesc: string;
  explore: string;
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
  whoWeAreLabel: string;
  aboutPart2: string;
  quote: string;
  establishedLabel: string;
  purposeLabel: string;
  missionPart2: string;
  coverageLabel: string;
  brandVisibilityLabel: string;
}

export interface FormatTranslations {
  title: string;
  desc: string;
  heroSubtitle: string;
  heroTitle1: string;
  heroTitle2: string;
  badge1: string;
  badge2: string;
  cardLabel: string;
  cardDesc: string;
  formatsTitle: string;
  featTitle: string;
  featSubtitle: string;
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
  exploreBtn: string;
  tagDynamic: string;
  tagFixed: string;
  tagTargeted: string;
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
  faqs: FAQ[],
  knowledgeBaseLabel: string;
  phoneValue: string;
  addressValue: string;
  emailValue: string;
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
  strategyLabel: string;
  networkLive: string;
}

export interface FooterImageTranslations {
  urbanNetwork: string;
}

export interface ClientsTranslations {
  title: string;
}

export interface Translations {
  nav: NavTranslations;
  hero: HeroTranslations;
  clients: ClientsTranslations;
  mission: MissionTranslations;
  solutions: SolutionsTranslations;
  cta: CTATranslations;
  about: AboutTranslations;
  formats: FormatTranslations;
  contact: ContactTranslations;
  footer: FooterTranslations;
  leverage: LeverageTranslations;
  footerImage: FooterImageTranslations;
}
