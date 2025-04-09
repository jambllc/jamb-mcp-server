/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

/** About */
export interface LVAbout {
  /**
   * Description
   * Detailed information about the business, its history, values, approach, and other relevant background information. Often stored in a markdown file.
   */
  description: string
  /**
   * Image
   * Main image used in the about section, typically a photo of the business owner, team, or location.
   * @default null
   */
  image?: string | null
  /**
   * Mission
   * The business mission statement that describes the company's purpose, goals, and core values.
   */
  mission: string
  /**
   * Title
   * Title for the about section, typically the business name or a specific heading for the about page.
   */
  title: string
}

/** AccountData */
export interface LVAccountData {
  /**
   * Created At
   * Date and time for when the model object was created.
   * @default null
   */
  created_at?: string | null
  /**
   * Id
   * Unique uuid for the model object.
   * @default null
   */
  id?: string | null
  /** Name */
  name: string | null
  /**
   * Updated At
   * Date and time for when the model object was last updated.
   * @default null
   */
  updated_at?: string | null
}

/** Address */
export interface LVAddress {
  /**
   * Locality
   * City or town where the business location is situated, such as 'Austin' or 'San Marcos'.
   */
  locality: string
  /**
   * Neighborhood
   * Specific neighborhood or district within the locality, providing more precise location information.
   * @default null
   */
  neighborhood?: string | null
  /**
   * Postofficeboxnumber
   * Suite, unit, or office number, typically used for business locations within larger buildings.
   * @default null
   */
  postOfficeBoxNumber?: string | null
  /**
   * Postalcode
   * ZIP or postal code for the address, such as '78701'.
   */
  postalCode: string
  /**
   * Region
   * State, province, or region code, typically the two-letter state code in the US, such as 'TX'.
   */
  region: string
  /**
   * Streetaddress
   * Street address including house/building number and street name, such as '123 Main Street'.
   */
  streetAddress: string
}

/**
 * AddressInfo
 * AddressInfo
 */
export interface LVAddressInfo {
  /**
   * Address
   * street address of the local establishment
   * @default null
   */
  address?: string | null
  /**
   * Borough
   * administrative unit or district the local establishment belongs to
   * @default null
   */
  borough?: string | null
  /**
   * City
   * name of the city where the local establishment is located
   * @default null
   */
  city?: string | null
  /**
   * Country Code
   * ISO country code of the local establishment
   * @default null
   */
  country_code?: string | null
  /**
   * Region
   * DMA region the local establishment belongs to
   * @default null
   */
  region?: string | null
  /**
   * Zip
   * ZIP code of the local establishment
   * @default null
   */
  zip?: string | null
}

/**
 * BaseBusinessDataSerpElementItem
 * BaseBusinessDataSerpElementItem
 */
export interface LVBaseBusinessDataSerpElementItem {
  /**
   * Rank Absolute
   * absolute rank among all the elements
   * @default null
   */
  rank_absolute?: number | null
  /**
   * Rank Group
   * position within a group of elements with identical type values positions of elements with different type values are omitted from the rank_group
   * @default null
   */
  rank_group?: number | null
  /**
   * Type
   * type of element
   * @default null
   */
  type?: string | null
}

/**
 * BaseLocalBusinessLink
 * BaseLocalBusinessLink
 */
export interface LVBaseLocalBusinessLink {
  /**
   * Type
   * type of element
   * @default null
   */
  type?: string | null
}

/** Business */
export interface LVBusiness {
  /** Comprehensive information about the business, including history, mission, and other background details. */
  about: LVAbout
  /**
   * Category
   * Primary business category identifying the industry or service sector, such as 'legal', 'therapy', or 'construction'. Should match Google Business Profile categories when possible.
   */
  category: string
  /**
   * Description
   * Short overview of the business, its services, and value proposition, used for meta descriptions and introductions.
   */
  description: string
  /**
   * Domain
   * Website domain name associated with the business, used for canonical URLs and email address generation.
   * @default null
   */
  domain?: string | null
  /**
   * Email
   * Primary contact email address for the business, used for the contact form and displayed contact information.
   * @default null
   */
  email?: string | null
  /**
   * Hours
   * Operating hours for the business, organized by days of the week and including special closures or holiday hours.
   */
  hours: LVHours[]
  /**
   * Intro
   * Introduction text for the homepage hero section, often formatted in markdown with headings and emphasis. Should be formatted in markdown, must contain an h1 heading, can contain h2 subheading and/or normal text. It should be short and hit the main value of the business.
   */
  intro: string
  /**
   * Introimage
   * Hero image displayed on the homepage, typically a representative photo of the business, services, or location.
   * @default null
   */
  introImage?: string | null
  /**
   * Keywords
   * Keywords for the business used to measure SEO and performance. This should be set based on 2-4 key keywords for category and a few specific to business
   * @default null
   */
  keywords?: string[] | null
  /**
   * Locations
   * Physical locations where the business operates, including address, contact information, and service areas.
   */
  locations: LVLocation[]
  /**
   * Logo
   * Business logo image file name, used in the header, footer, and for branding throughout the site.
   * @default null
   */
  logo?: string | null
  /**
   * Name
   * Official name of the business or professional practice, displayed as the primary identifier throughout the site.
   */
  name: string
  /** Payment methods accepted by the business and related payment or pricing information. */
  payment: LVPayment
  /**
   * Phonenumber
   * Primary contact phone number for the business, formatted with area code for display and click-to-call functionality.
   * @default null
   */
  phoneNumber?: string | null
  /**
   * Productgroups
   * @default null
   */
  productGroups?: LVProductGroup[] | null
  /**
   * Products
   * @default null
   */
  products?: LVProduct[] | null
  /**
   * Secondarycategories
   * Additional business categories or specializations for more specific classification and search optimization. Should match Google Business Profile categories when possible.
   * @default null
   */
  secondaryCategories?: string[] | null
  /**
   * Services
   * Services offered by the business, organized into categories with descriptions, images, and pricing information.
   */
  services: LVService[]
  /**
   * Social media profiles associated with the business for linking to external platforms.
   * @default null
   */
  social?: LVSocial | null
}

/**
 * BusinessDataAttributesInfo
 * BusinessDataAttributesInfo
 */
export interface LVBusinessDataAttributesInfo {
  /**
   * Available Attributes
   * available attributes indicates attributes a business entity can offer
   * @default null
   */
  available_attributes?: Record<string, (string | null)[] | null> | null
  /**
   * Unavailable Attributes
   * unavailable attributes indicates attributes a business entity cannot offer
   * @default null
   */
  unavailable_attributes?: Record<string, (string | null)[] | null> | null
}

/**
 * BusinessDirectoryInfo
 * BusinessDirectoryInfo
 */
export interface LVBusinessDirectoryInfo {
  /**
   * Items
   * encountered item types types of search engine results encountered in the items array; possible item types: google_business_info
   * @default null
   */
  items?: LVBaseBusinessDataSerpElementItem[] | null
  /**
   * Title
   * title of the element domain of the online menu system
   * @default null
   */
  title?: string | null
}

/** BusinessLocationInput */
export interface LVBusinessLocationInput {
  /** Place Id */
  place_id: string | null
}

/**
 * BusyWorkingTimeInfo
 * BusyWorkingTimeInfo
 */
export interface LVBusyWorkingTimeInfo {
  /**
   * Popular Index
   * popularity index relative time-bound popularity index measured from 0 to 100; higher value corresponds to a busier time of a day
   * @default null
   */
  popular_index?: number | null
  /** @default null */
  time?: LVWorkTimeInfo | null
}

/** CTA */
export interface LV_CTA {
  /**
   * Config
   * List of call-to-action configurations defining all available CTAs for the website.
   * @default null
   */
  config?: LVCTAConfig[] | null
  /**
   * Primary
   * The name of the primary CTA button to highlight throughout the site as the main action.
   * @default null
   */
  primary?: string | null
}

/** CTAConfig */
export interface LVCTAConfig {
  /**
   * Href
   * Internal URL or anchor link for navigation within the website, such as '#contact' or '#subscribe'.
   * @default null
   */
  href?: string | null
  /**
   * Icon
   * Icon identifier to display with the CTA, should be a value from phosphoricon using the format 'phosphoricon:regular:calendar'.
   * @default null
   */
  icon?: string | null
  /**
   * Link
   * URL for external links, when the CTA should navigate to an external website.
   * @default null
   */
  link?: string | null
  /**
   * Name
   * Unique identifier for the call-to-action button, such as 'contact', 'phone', or 'appointment'.
   */
  name: string
  /**
   * Text
   * Display text for the call-to-action button, shown to users.
   * @default null
   */
  text?: string | null
  /**
   * Type
   * Describes the type of the action: phone=phone call, email=email, contact=contact form, subscribe=subscribe form, unsubscribe=unsubscribe form, external_link=external link to other system.
   * @default null
   */
  type?: string | null
}

/** ConfigKeys */
export interface LVConfigKeys {
  /**
   * Conversionevents
   * List of conversion events to track for this ad integration.
   * @default null
   */
  conversionEvents?: LVConversionEvent[] | null
  /**
   * Key
   * API key, tracking ID, or account identifier for the integration service.
   */
  key: string
  /**
   * Type
   * Type of integration or tracking service, such as 'googleAds'.
   */
  type: string
}

/** ContactForm */
export interface LVContactForm {
  /**
   * Fields
   * List of field types to include in the contact form, such as ['name', 'email', 'phone', 'service', 'location', or 'message'].
   */
  fields: string[]
  /**
   * Messageplaceholder
   * Placeholder text shown in the message textarea before the user enters content. This should be a short sentence or two that helps the user understand what the business needs from them to better service their request.
   * @default null
   */
  messagePlaceHolder?: string | null
  /**
   * Text
   * Introductory text displayed above the contact form, explaining its purpose to users.
   * @default null
   */
  text?: string | null
}

/** ConversionEvent */
export interface LVConversionEvent {
  /**
   * Ctaref
   * Reference to the name of the CTA that triggers this conversion event, linking actions to conversion tracking.
   * @default null
   */
  ctaRef?: string | null
  /**
   * Eventid
   * Unique identifier for the conversion event, typically provided by the advertising platform.
   */
  eventId: string
  /**
   * Monetaryvalue
   * Estimated monetary value of the conversion event for ROI calculation, typically in the smallest currency unit.
   * @default null
   */
  monetaryValue?: number | null
  /**
   * Name
   * This is the descriptive name of the conversion event from the ad platform, such as 'clickToCall' or 'submitContactRequest'.
   */
  name: string
}

/** EditorialSummaryData */
export interface LVEditorialSummaryData {
  /** Language */
  language: string
  /** Overview */
  overview: string
}

/** Establishment */
export interface LVEstablishment {
  /** Name */
  name: string
  /** Place Id */
  place_id: string
}

/** FAQItem */
export interface LVFAQItem {
  /**
   * Answer
   * The answer text to the question, providing helpful information to address the inquiry. Can include markdown formatting but have no headings higher than h2.
   */
  answer: string
  /**
   * Id
   * Unique identifier for the FAQ item, used for reference and URL fragments on the page.
   */
  id: string
  /**
   * Question
   * The question text displayed to users, written in a clear, concise manner addressing common customer inquiries.
   */
  question: string
  /**
   * Serviceref
   * List of service IDs that this FAQ item relates to, allowing FAQs to be filtered or displayed with relevant services.
   * @default null
   */
  serviceRef?: string[] | null
}

/** Footer */
export interface LVFooter {
  /**
   * Floaterctas
   * List of call-to-action identifiers to display as floating buttons in the footer, such as ['contact', 'phone']. There should be no more than 3 floating CTAs, and most businesses should only have 1 or 2.
   */
  floaterCTAs: string[]
  /**
   * Maptype
   * Type of map to display in the footer, such as 'google' or 'bing'.
   * @default null
   */
  mapType?: string | null
}

/** Form */
export interface LVForm {
  /**
   * Fields
   * List of field types to include in the contact form, such as ['name', 'email', 'phone', 'service', 'location', 'message', 'address', 'text', 'select', 'multiselect'].
   */
  fields: LVFormField[]
  /**
   * Header
   * Header of the form. If not set a default header will be used.
   * @default null
   */
  header?: string | null
  /**
   * Page
   * Indicates whether the form has a page or is a popup.
   * @default false
   */
  page?: boolean | null
  /**
   * Text
   * Introductory text displayed above the contact form, explaining its purpose to users.
   * @default null
   */
  text?: string | null
  /**
   * Type
   * The 'name' of the form and also splat.
   */
  type: string
}

/** FormField */
export interface LVFormField {
  /**
   * Label
   * Label of the field. Optional, but should be set for generic types like 'text', 'select', etc.
   * @default null
   */
  label?: string | null
  /**
   * Options
   * Value options for 'select' and 'multiselect' field types.
   * @default null
   */
  options?: string[] | null
  /**
   * Placeholder
   * Placeholder text for the field, providing a hint to the user about what to enter.
   * @default null
   */
  placeholder?: string | null
  /**
   * Required
   * Indicates whether the field is required to submit the form.
   */
  required: boolean
  /**
   * Sensitive
   * Indicates whether the rare circumstances contains sensitive information; will not store any values in our system if this is set. Default is False.
   * @default false
   */
  sensitive?: boolean
  /**
   * Type
   * Type of the field, such as 'name', 'email', 'phone', 'service', 'location', 'message', 'address', 'text', 'select', or 'multiselect'.
   */
  type: string
}

/** Forms */
export interface LVForms {
  /**
   * Forms
   * List of forms.
   * @default null
   */
  forms?: LVForm[]
}

/** GeoLocation */
export interface LVGeoLocation {
  /**
   * Latitude
   * Latitude coordinate for the business location, used for map displays and directions.
   */
  latitude: number
  /**
   * Longitude
   * Longitude coordinate for the business location, used for map displays and directions.
   */
  longitude: number
}

/** GeometryData */
export interface LVGeometryData {
  location: LVLocationData
  viewport: LVViewportData
}

/**
 * GoogleBusinessInfoBusinessDataSerpElementItem
 * GoogleBusinessInfoBusinessDataSerpElementItem
 */
export interface LVGoogleBusinessInfoBusinessDataSerpElementItem {
  /**
   * Additional Categories
   * additional business categories additional Google My Business categories that describe the services provided by the business entity in more detail
   * @default null
   */
  additional_categories?: string[] | null
  /**
   * Address
   * address of the business entity
   * @default null
   */
  address?: string | null
  /** @default null */
  address_info?: LVAddressInfo | null
  /** @default null */
  attributes?: LVBusinessDataAttributesInfo | null
  /**
   * Book Online Url
   * URL in the ‘book online’ button of the element URL directing users to the online booking or order page of the business entity
   * @default null
   */
  book_online_url?: string | null
  /**
   * Category
   * business category Google My Business general category that best describes the services provided by the business entity
   * @default null
   */
  category?: string | null
  /**
   * Category Ids
   * global category IDs universal category IDs that do not change based on the selected country
   * @default null
   */
  category_ids?: string[] | null
  /**
   * Cid
   * google-defined client id unique id of a local establishment; can be used with Google Reviews API to get a full list of reviews learn more about the identifier in this help center article
   * @default null
   */
  cid?: string | null
  /**
   * Contact Url
   * URL of the preferred contact page
   * @default null
   */
  contact_url?: string | null
  /**
   * Contributor Url
   * URL of the user’s or entity’s Local Guides profile, if available
   * @default null
   */
  contributor_url?: string | null
  /**
   * Description
   * description of the element in SERP the description of the business entity for which the results are collected
   * @default null
   */
  description?: string | null
  /** @default null */
  directory?: LVBusinessDirectoryInfo | null
  /**
   * Domain
   * domain of the business entity
   * @default null
   */
  domain?: string | null
  /**
   * Feature Id
   * the unique identifier of the element in SERP learn more about the identifier in this help center article
   * @default null
   */
  feature_id?: string | null
  /**
   * Hotel Rating
   * hotel class rating class ratings range between 1-5 stars, learn more if there is no hotel class rating information, the value will be null
   * @default null
   */
  hotel_rating?: number | null
  /**
   * Is Claimed
   * shows whether the entity is verified by its owner on Google Maps
   * @default null
   */
  is_claimed?: boolean | null
  /**
   * Is Directory Item
   * business establishment is a part of the directory indicates whether the business establishment is a part of the directory; if true, the item is a part of the larger directory of businesses with the same address (e.g., a mall or a business centre); note: if the business establishment is a parent item in the directory, the value will be null
   * @default null
   */
  is_directory_item?: boolean | null
  /**
   * Latitude
   * latitude coordinate of the local establishments in google maps example: "latitude": 51.584091
   * @default null
   */
  latitude?: number | null
  /**
   * Local Business Links
   * available interactions with the business list of options to interact with the business directly from search results
   * @default null
   */
  local_business_links?: LVBaseLocalBusinessLink[] | null
  /**
   * Logo
   * URL of the logo featured in Google My Business profile
   * @default null
   */
  logo?: string | null
  /**
   * Longitude
   * longitude coordinate of the local establishment in google maps example: "longitude": -0.31365919999999997
   * @default null
   */
  longitude?: number | null
  /**
   * Main Image
   * URL of the main image featured in Google My Business profile
   * @default null
   */
  main_image?: string | null
  /**
   * Original Title
   * original title of the element original title not translated by Google
   * @default null
   */
  original_title?: string | null
  /**
   * People Also Search
   * related business entities
   * @default null
   */
  people_also_search?: LVPeopleAlsoSearch[] | null
  /**
   * Phone
   * phone number of the business entity
   * @default null
   */
  phone?: string | null
  /**
   * Place Id
   * unique place identifier place id of the local establishment featured in the element learn more about the identifier in this help center article
   * @default null
   */
  place_id?: string | null
  /**
   * Place Topics
   * keywords mentioned in customer reviews contains most popular keywords related to products/services mentioned in customer reviews of a business entity and the number of reviews mentioning each keyword example:  "place_topics": { "egg roll": 48, "birthday": 33 }
   * @default null
   */
  place_topics?: Record<string, number | null> | null
  /** @default null */
  popular_times?: LVPopularTimes | null
  /**
   * Position
   * the alignment in SERP
   * @default null
   */
  position?: string | null
  /**
   * Price Level
   * property price level can take values: inexpensive, moderate, expensive, very_expensive if there is no price level information, the value will be null
   * @default null
   */
  price_level?: string | null
  /**
   * Questions And Answers Count
   * @default null
   */
  questions_and_answers_count?: number | null
  /**
   * Rank Absolute
   * absolute rank among all the elements
   * @default null
   */
  rank_absolute?: number | null
  /**
   * Rank Group
   * position within a group of elements with identical type values positions of elements with different type values are omitted from the rank_group
   * @default null
   */
  rank_group?: number | null
  /** @default null */
  rating?: LVRatingInfo | null
  /**
   * Rating Distribution
   * the distribution of ratings of the business entity the object displays the number of 1-star to 5-star ratings, as reviewed by users
   * @default null
   */
  rating_distribution?: Record<string, number | null> | null
  /**
   * Snippet
   * additional information on the business entity
   * @default null
   */
  snippet?: string | null
  /**
   * Title
   * title of the element in SERP the name of the business entity for which the results are collected
   * @default null
   */
  title?: string | null
  /**
   * Total Photos
   * total count of images featured in Google My Business profile
   * @default null
   */
  total_photos?: number | null
  /**
   * Type
   * type of element
   * @default null
   */
  type?: string | null
  /**
   * Url
   * absolute url of the business entity
   * @default null
   */
  url?: string | null
  /** @default null */
  work_time?: LVWorkTime | null
}

/** Header */
export interface LVHeader {
  /**
   * Logoconfig
   * Configuration for the logo display in the header, specifying size, position, or styling options.
   */
  logoConfig: string
}

/** HealthResponse */
export interface LVHealthResponse {
  /** Status */
  status: string
}

/** Hours */
export interface LVHours {
  /**
   * Close
   * Closing time in 12-hour format with AM/PM, such as '5:00PM'. Null if the business is closed all day.
   * @default null
   */
  close?: string | null
  /**
   * Closed
   * Boolean flag indicating if the business is completely closed on the specified days. True means closed, null or false means open.
   * @default null
   */
  closed?: boolean | null
  /**
   * Date
   * Specific date for special hours or closures in ISO format (YYYY-MM-DD), used for holidays or special events.
   * @default null
   */
  date?: string | null
  /**
   * Days
   * List of days of the week that share the same opening hours, such as ['Monday', 'Tuesday', 'Wednesday'].
   * @default null
   */
  days?: string[] | null
  /**
   * Open
   * Opening time in 12-hour format with AM/PM, such as '9:00AM'. Null if the business is closed all day.
   * @default null
   */
  open?: string | null
  /**
   * Reason
   * Explanation for special hours or closures, such as 'Christmas Day' or 'Staff Training'.
   * @default null
   */
  reason?: string | null
}

/** JobPosting */
export interface LVJobPosting {
  /**
   * Companydescription
   * Brief description of the company offering the job, highlighting key aspects relevant to job seekers.
   */
  companyDescription: string
  /**
   * Dateposted
   * Date and time when the job was posted, used for sorting and indicating recency.
   * @format date-time
   */
  datePosted: string
  /**
   * Educationrequirements
   * Education level or specific degrees required for the position, such as 'Bachelor's degree' or 'High school diploma'.
   * @default null
   */
  educationRequirements?: string | null
  /**
   * Employmenttype
   * List of employment types for the position, such as ['FULL_TIME', 'PART_TIME', 'CONTRACTOR', 'TEMPORARY'].
   * @default null
   */
  employmentType?: string[] | null
  /**
   * Experiencerequirements
   * Required work experience in months for the position. For example, 36 would indicate 3 years of experience.
   * @default null
   */
  experienceRequirements?: number | null
  /**
   * Group
   * Department or team category the job belongs to, such as 'Engineering', 'Marketing', or 'Customer Service'.
   */
  group: string
  /**
   * Id
   * Unique identifier for the job posting, used for reference and URL paths.
   */
  id: string
  /**
   * Jobdescription
   * Detailed description of the job responsibilities, expectations, and role details, often in markdown format.
   */
  jobDescription: string
  /**
   * Joblocationtype
   * Type of work location, such as 'TELECOMMUTE' for remote positions or 'ON_SITE' for in-office roles.
   * @default null
   */
  jobLocationType?: string | null
  /**
   * Locationref
   * Reference to the specific business location(s) where this job is based, linking to location objects.
   * @default null
   */
  locationRef?: string[] | null
  /**
   * Requirements
   * List of specific requirements or qualifications needed for the position, such as skills or certifications.
   */
  requirements: string[]
  /**
   * Salary information for the position, including type (hourly/yearly) and compensation range.
   * @default null
   */
  salary?: LVSalary | null
  /**
   * Title
   * Job title or position name, describing the role being advertised.
   */
  title: string
}

/** Location */
export interface LVLocation {
  /**
   * Structured address information for the business location, including street, city, state, and postal code.
   * @default null
   */
  address?: LVAddress | null
  /**
   * Addressstring
   * Array of address lines formatted for display, with each element representing a line in the address.
   * @default null
   */
  addressString?: string[] | null
  /** Geographic coordinates (latitude and longitude) for the business location, used for mapping. */
  geoLocation: LVGeoLocation
  /**
   * Googleplaceid
   * The google placeId for this location
   * @default null
   */
  googlePlaceId?: string | null
  /**
   * Hours
   * Operating hours specific to this location, if they differ from the business's general hours.
   * @default null
   */
  hours?: LVHours[] | null
  /**
   * Id
   * Unique identifier for the location used in URLs and internal references, typically a lowercase slug of the name.
   */
  id: string
  /**
   * Locationdescription
   * Detailed description of the location including nearby landmarks, accessibility information, and area details.
   */
  locationDescription: string
  /**
   * Locationmentions
   * List of nearby neighborhoods, landmarks, or areas served from this location, useful for SEO and local search.
   * @default null
   */
  locationMentions?: string[] | null
  /**
   * Measurearea
   * List of zipcodes or postal codes in other countries to measure this location based on. SEO Searches will be done within these areas
   * @default null
   */
  measureArea?: string[] | null
  /**
   * Name
   * This is the name of the location and the slug of the location page. This should be the official name of the city if there is only one location in the city. If there are multiple locations in the same city, this should include the city name and the neighborhood or area of the location, such as 'Austin - Downtown' or 'Austin - South Lamar'
   */
  name: string
  /**
   * Phonenumber
   * Contact phone number specific to this business location, formatted with area code, such as '512-555-1234'.
   * @default null
   */
  phoneNumber?: string | null
  /**
   * Servicearea
   * List of cities, towns, or regions served by this location, defining the geographic service coverage.
   * @default null
   */
  serviceArea?: LVServiceArea[] | null
}

/** LocationData */
export interface LVLocationData {
  /** Lat */
  lat: number
  /** Lng */
  lng: number
}

/** NavigationItem */
export interface LVNavigationItem {
  /**
   * Name
   * Internal identifier for the navigation item used for standard pages. A list of standard pages are 'Home' (always include), 'Services' (always include), 'About' (always include),  'Locations' (always include),'Stories', 'Events', 'Services', 'Gallery', 'FAQ', 'Menu' (always include for restaurant websites), 'Drinks', 'Food'. Do not include a contact page, as our footer has contact information across all pages. Where it's relevant a special page can be created from a story with a title and a relative url path. You can see an example of this on kateyvillalon's site with the IMAGO page.
   * @default null
   */
  name?: string | null
  /**
   * Path
   * Custom URL path for the navigation item, only needed for external links or non-standard pages.
   * @default null
   */
  path?: string | null
  /**
   * Title
   * Display text shown in the navigation menu, can be different from the name for customization for the business type or attributes of the business. For instance, 'Gallery' can be changed to 'Our Work' or 'Our Projects' for a construction company or 'Locations' can be changed to 'Visit Us' if it's a single location business that relies on foot traffic. Give the website a title if the previous page has a different name for the section than our name or if the current 'name' doesn't make sense for the company/industry.
   * @default null
   */
  title?: string | null
}

/** OpeningHoursData */
export interface LVOpeningHoursData {
  /** Open Now */
  open_now: boolean
  /** Periods */
  periods: LVPeriodData[]
  /** Weekday Text */
  weekday_text: string[]
}

/** PageConfig */
export interface LVPageConfig {
  /**
   * Name
   * Identifier for the page type or template, such as 'Home', 'ServicePage', or 'About'.
   */
  name: string
  /**
   * Sections
   * List of sections to be rendered on this page type, defining the page structure and content.
   *         Available page names that can be configured:
   *         - Home
   *         - ServicePage
   *         - About
   *         - LocationPage
   *         - StoryPage
   *         - EventsPage
   *         - GalleryPage
   *         - FAQ
   *         - MenuPage
   *         - DrinksPage
   *         - FoodPage
   *
   *
   *         Available sections:
   *
   *         INTRO HERO SECTIONS:
   *         - IntroHeroFullWidth: Full-width hero with background image and text overlay. Best for dramatic imagery that works well as a background. Uses introImage and intro from business.json as it's hero image and intro text from business.json respectively, and can take in a cta for the primary call to action in the websiteConfig config definition.
   *         - IntroHeroFullScreen: Full-screen height hero with background image. Best for immersive first impressions with striking visuals. Uses introImage and intro from business.json as it's hero image and intro text from business.json respectively, and will take in the business.json cta for the primary call to action in the websiteConfig config definition.
   *         - IntroHeroSplitImageRight: Split-screen hero with text left, image right. Good for balanced presentation of visual and textual content. Uses introImage and intro from business.json as it's hero image and intro text from business.json respectively, and can take in a cta for the primary call to action in the websiteConfig config definition.
   *         - IntroHeroImageTextBoxRight: Hero with floating text box over right side of image. Works well when text needs more emphasis over the image. Uses introImage and intro from business.json as it's hero image and intro text from business.json respectively, and can take in a cta for the primary call to action in the websiteConfig config definition.
   *         - GeneralHeroImageRight: Standard hero with image on right, text on left. Good for secondary pages where full-width/screen isn't needed. Requires a text and title, and can take in an image, cta for the primary call to action in the websiteConfig config definition.
   *         - IntroHeroWaveAnimationBG: This hero section is for websites that want to highlight their logo as the main hero and have multiple images that are representations of their work that can be rotated through in the background. Uses introImage and intro from business.json as it's hero image and intro text from business.json respectively, and the photos in images[] for the background rotating images, fullHeight=true if the images should take up the full height of the screen, and roundedBottom=false if the bottom should not be rounded styling wise in the websiteConfig config definition.
   *         - IntroHeroTextBoxRight: Hero with floating text box over right side of image. Works well when text needs more emphasis over the image. Uses introImage and intro from business.json as it's hero image and intro text from business.json respectively, and can take in a cta for the primary call to action and images[] for the background rotating images in the websiteConfig config definition.
   *         - IntroHeroRotatingBGImages: This hero section is for websites that want to highlight their logo as the main hero and have multiple images that are representations of their work that can be rotated through in the background. Uses introImage and intro from business.json as it's hero image and intro text from business.json respectively, and can take in a cta for the primary call to action, the photos in images[] for the background rotating images, fullHeight=true if the images should take up the full height of the screen, and roundedBottom=false if the bottom should not be rounded styling wise in the websiteConfig config definition.
   *
   *         LISTS OF ITEMS AND REVIEWS:
   *         - ServicesOffered: Grid or list of service cards. Used on most pages to showcase available services and make it easy for users to navigate to the service pages. Can take in a unique title in the websiteConfig config definition.
   *         - RelatedBlogs: Shows cards of related blog posts. Use at bottom of blog posts or relevant service pages. Can be used on home pages that don't have a lot of content. Can take in a unique title in the websiteConfig config definition. Can be filtered to certain blogs by passing in tags in the websiteConfig config definition. Will show blogs related to the service on service pages.
   *         - FeedbackSimple: Clean, simple display of customer testimonials. Good for most pages where social proof is valuable. Can take in a unique title in the websiteConfig config definition. Will show Reviews related to the service on service pages, and related to the location on location pages.
   *         - FAQSection: FAQ section for the page, will show FAQs related to the service on service pages.  Can take in a unique title in the websiteConfig config definition.
   *         - ProductList: This is a simple grid section that displays the products in the productsGroupIds[] array defined in the websiteConfig config definition. It will display the product name, description, and if a product has them, the featured image, price, variants and deitary attributes.
   *
   *         GALLERY SECTIONS:
   *         - BeforeAfterGallery: Interactive before/after image comparison. Perfect for renovation, restoration, or transformation services. Only use if buiness has specific and separate before and after images to showcase.
   *         - ImageGallery: Grid of images with lightbox viewing. Great for portfolios or showcasing work examples.  Can take in a unique title in the websiteConfig config definition.
   *         - ProjectGallery: Project showcase with images and descriptions. Ideal for showcasing project work that includes multiple images, detailed case studies or portfolio items. Will show project galleries related to the service on service pages.
   *         - HighlightGallery: This is a simple grid section that displays a highlight-gallery story type that shows off items with an image, title and description in a grid layout. It has the story title and description above the grid. Will show highlight galleries related to the service on service pages.
   *
   *
   *         EVENT SECTIONS:
   *         - FullEventList: Complete listing of upcoming, current and past events with details. Use when upcoming and past events are important examples of their services. Use on a dedicated event page or service pages that have related events to showcase. Will show events related to the service on service pages.
   *         - UpcomingEventCalendar: This is a calendar section that displays the upcoming events for the business. It will display the event name, date, time, location, and an external link to the event if it's an external event. Use on a dedicated event page or service pages that have related events to showcase. Will show events related to the service on service pages.
   *
   *         CONTENT SECTIONS:
   *         - ImageLeftContentRightSection: Image on left with content on right. Good for breaking up long text with visuals. If paired with another split header or content section, alternate the image and content positions.  Requires a title and text and can take in a image for the background in the websiteConfig config definition.
   *         - ImageRightContentLeftSection: Content on left with image on right. Alternative to above for visual variety. If paired with another split header or content section, alternate the image and content positions. Requires a title and text and can take in a image for the background in the websiteConfig config definition.
   *         - VisualListSection: List with icons or small images. Great for features, benefits, or process steps. This is good for a list of 2, 4, or 6 items to serve as mid-page visual breaks. Ensure that the list item titles are 1 or two words, the descriptions are short and concise and the icons are relevant to the list item and from phosphoricon. The list should be no more than 6 items. This Virtual List Section uses the primary color of the theme as the background color of the list items - so use this version of the list section when the primary color is a pleasing color to the eye and not too bright. Takes in a title, description, and items[] where each item needs a title, description and icon in the WebsiteConfig config section.
   *         - VisualListSectionRounded: Same as above but with rounded styling and the primary color of the theme lightened to 15% opacity for the background color of the list items. A less bold, more casual appearance. Takes in a title, description, and items[] where each item needs a title, description and icon in the WebsiteConfig config section.
   *         - VisualListSection_configColor: Similar to VisualListSection above, but can take in an odd number of items, so does well with 1, 2, 3, 4, 5, and 6 items. Additionally, you can set the color of the background to primary, secondary or accent. You can use this if too much of the primary is used, or primary is a overly bright color like red. Takes in a title, description, color and items[] where each item needs a title, description and icon in the WebsiteConfig config section.
   *         - ImageBGHero: Full-width section with background image and overlay text. Good for mid-page visual breaks. Can take in an image, title and text in the websiteConfig config definition.
   *         - SplitPortraitTextHeroSection: Split section with portrait photo and text. Perfect for team member highlights or highlights of portrait images. Takes in an image, title and text from websiteConfig in the config defintion for the content.
   *         - TextOnlyCTASection: Text-focused call to action section thats a ribbon of text with a CTA button. Use for strong CTAs without visual distraction for non-primary CTAs that are also important and don't have a specfic page dedicated to them. Example for this are newsletter subscriptions and links to get gift cards, but can be any sort of non-primary, but still important CTA for the business. Takes in a title, text, cta in the WebsiteConfig config definition. Use if there are two important CTAs like a primary contact cta and a subscription cta to subscribe to an email list.
   *         - VisualMenuList: This is specifically for restaurant websites that want to display links to their food and drinks menu for easy access on their website. It will display the menu cover image and title of the specific menu, the title of the food and the drinks menu can be passed in as a food>title and drinks>title in the websiteConfig config definition.
   *
   *         SERVICE-SPECIFIC SECTIONS:
   *         - ServiceHeroImageOverlay: Service page hero with text overlay on image. Good for service pages with strong relevant imagery. Uses the service image, summary, description and cta for it's content. Can pass in fullHeight=false if the image should not take up the full height of the screen, and showSummary=false if the summary should not be shown in the hero section.
   *         - ServiceHeroImageRight: Service intro with right-aligned image. Standard layout for service detail pages. Uses the service image, summary, description and cta for it's content.
   *         - ServicesHeroImageRightWaveAnimation - Service intro with right aligned image with a wave animation with the intro content. Goes with sites tht use IntroHeroWaveAnimationBG as the main home page intro. Uses the service image, summary, description and cta for it's content.
   *         - ServiceHeroImageTop: Service page with top image banner. Alternative to overlay when text clarity is priority. Uses the service image, summary, description and cta for it's content.
   *         - ServicesOptionsNoImages: Text-only service options list. Good when all services don't have a strong primary image element. Images can be added in the markdown content for the sub service description. Uses the subservice name, description, price and cta for it's content.
   *         - ServicesOptionsTOC: Service options with table of contents. Best for pages with many service subsections. Uses the subservice name and summary for it's content
   * @default null
   */
  sections?: LVSectionConfig[] | null
}

/** Payment */
export interface LVPayment {
  /**
   * Description
   * Detailed information about payment policies, options, pricing models, or insurance information.
   * @default null
   */
  description?: string | null
  /**
   * Insurance
   * Information about insurance coverage, accepted insurance providers, or related payment options.
   * @default null
   */
  insurance?: string | null
  /**
   * Methods
   * List of accepted payment methods, such as ['Cash', 'Credit Card', 'Check'].
   */
  methods: string[]
}

/**
 * PeopleAlsoSearch
 * PeopleAlsoSearch
 */
export interface LVPeopleAlsoSearch {
  /**
   * Cid
   * google-defined client id unique id of a local establishment learn more about the identifier in this help center article
   * @default null
   */
  cid?: string | null
  /**
   * Feature Id
   * the unique identifier of the element in SERP learn more about the identifier in this help center article
   * @default null
   */
  feature_id?: string | null
  /** @default null */
  rating?: LVRatingInfo | null
  /**
   * Title
   * title of the element in SERP the name of the business entity for which the results are collected
   * @default null
   */
  title?: string | null
}

/** PeriodData */
export interface LVPeriodData {
  /** @default null */
  close?: LVTimeData | null
  open: LVTimeData
}

/** PlaceDetails */
export interface LVPlaceDetails {
  /**
   * Business Status
   * @default null
   */
  business_status?: string | null
  /** @default null */
  editorial_summary?: LVEditorialSummaryData
  /**
   * Formatted Address
   * @default null
   */
  formatted_address?: string | null
  /**
   * Formatted Phone Number
   * @default null
   */
  formatted_phone_number?: string | null
  geometry: LVGeometryData
  /** Name */
  name: string
  /** @default null */
  opening_hours?: LVOpeningHoursData | null
  /** Place Id */
  place_id: string
  /**
   * Price Level
   * @default null
   */
  price_level?: number | null
  /** Rating */
  rating: number
  /** Reviews */
  reviews: LVReviewData[]
  /** Url */
  url: string
  /** User Ratings Total */
  user_ratings_total: number
  /**
   * Vicinity
   * @default null
   */
  vicinity?: string | null
  /**
   * Website
   * @default null
   */
  website?: string
}

/** PlaceDetailsResult */
export interface LVPlaceDetailsResult {
  /** Html Attributions */
  html_attributions: any[]
  result: LVPlaceDetails
  /** Status */
  status: string
}

/**
 * PopularTimes
 * PopularTimes
 */
export interface LVPopularTimes {
  /**
   * Popular Times By Days
   * popular hours information about busy hours of the local establishment on each day of the week
   * @default null
   */
  popular_times_by_days?: Record<string, LVBusyWorkingTimeInfo[] | null> | null
}

/** Product */
export interface LVProduct {
  /**
   * Attributes
   * The attributes of the product.
   * @default null
   */
  attributes?: LVProductAttribute[] | null
  /**
   * Description
   * A description of the product.
   */
  description: string
  /**
   * Externalproductlinks
   * Links to external product listings.
   * @default null
   */
  externalProductLinks?: LVProductLink[] | null
  /**
   * Image
   * The image of the product.
   * @default null
   */
  image?: string | null
  /**
   * Images
   * Additional images of the product.
   * @default null
   */
  images?: string[] | null
  /**
   * Name
   * The name of the product.
   */
  name: string
  /**
   * Price
   * The price of the product.
   * @default null
   */
  price?: number | null
  /**
   * Productgroupref
   * The reference to the product group this product belongs to.
   * @default null
   */
  productGroupRef?: string[] | null
  /**
   * Slug
   * The URL slug for this product.
   */
  slug: string
  /**
   * Variants
   * The variants of the product, either you should have variants with price or an overall price.
   * @default null
   */
  variants?: LVProductVariant[] | null
}

/** ProductAttribute */
export interface LVProductAttribute {
  /**
   * Name
   * The name of the attribute, some type of products like food might have a set of attributes like calories, allergies, etc.
   */
  name: string
  /**
   * Value
   * The value of the attribute for this product.
   */
  value: string
}

/** ProductBulkImport */
export interface LVProductBulkImport {
  /** Bulk */
  bulk: LVProduct[]
}

/** ProductGroup */
export interface LVProductGroup {
  /**
   * Description
   * a description of the product group
   */
  description: string
  /**
   * Image
   * the image of the product group
   * @default null
   */
  image?: string | null
  /**
   * Images
   * additional images of the product group
   * @default null
   */
  images?: string[] | null
  /**
   * Name
   * the name of the product group
   */
  name: string
  /**
   * Parentproductgroupref
   * the reference to the product group this product belongs to
   * @default null
   */
  parentProductGroupRef?: string[] | null
  /**
   * Slug
   * the url slug for this product group
   */
  slug: string
}

/** ProductGroupBulkImport */
export interface LVProductGroupBulkImport {
  /** Bulk */
  bulk: LVProductGroup[]
}

/** ProductLink */
export interface LVProductLink {
  /**
   * Text
   * The display text of the URL to the product.
   */
  text: string
  /**
   * Url
   * The external URL to the product.
   */
  url: string
}

/** ProductVariant */
export interface LVProductVariant {
  /**
   * Image
   * The image of the variant.
   * @default null
   */
  image?: string | null
  /**
   * Images
   * Additional images of the variant.
   * @default null
   */
  images?: string[] | null
  /**
   * Name
   * The name of the variant (e.g. size, color).
   */
  name: string
  /**
   * Price
   * The price of the variant.
   * @default null
   */
  price?: number | null
}

/** Products */
export interface LVProducts {
  /**
   * Productgroups
   * the list of product groups
   * @default null
   */
  productGroups?: LVProductGroup[] | null
  /**
   * Products
   * the list of products
   * @default null
   */
  products?: LVProduct[] | null
}

/**
 * RatingInfo
 * RatingInfo
 */
export interface LVRatingInfo {
  /**
   * Rating Max
   * the maximum value for a rating_type
   * @default null
   */
  rating_max?: number | null
  /**
   * Rating Type
   * the type of rating here you can find the following elements: Max5, Percents, CustomMax
   * @default null
   */
  rating_type?: string | null
  /**
   * Value
   * the value of the rating
   * @default null
   */
  value?: number | null
  /**
   * Votes Count
   * the amount of feedback
   * @default null
   */
  votes_count?: number | null
}

/** Redirect */
export interface LVRedirect {
  /**
   * From
   * Source URL path that should trigger the redirect when visited. If the website is created from a previous website, this should contain the old URL path of the subject material. This should assume that the old website was hosted on the same domain as the new website.
   */
  from: string
  /**
   * To
   * Destination URL path where users should be redirected to. If the website is created from a previous website, this should contain the new URL path of the subject material should be redirected to. This should assume that the old website was hosted on the same domain as the new website.
   */
  to: string
}

/** ReviewData */
export interface LVReviewData {
  /** Author Name */
  author_name: string
  /** Author Url */
  author_url: string
  /**
   * Language
   * @default null
   */
  language?: string | null
  /**
   * Original Language
   * @default null
   */
  original_language?: string | null
  /** Profile Photo Url */
  profile_photo_url: string
  /** Rating */
  rating: number
  /** Relative Time Description */
  relative_time_description: string
  /** Text */
  text: string
  /** Time */
  time: number
  /** Translated */
  translated: boolean
}

/** Salary */
export interface LVSalary {
  /**
   * Max
   * Maximum salary amount in the compensation range, typically in dollars or the local currency unit.
   */
  max: number
  /**
   * Min
   * Minimum salary amount in the compensation range, typically in dollars or the local currency unit.
   */
  min: number
  /**
   * Type
   * Type of salary structure, such as 'hourly', 'yearly', or 'range', indicating how the compensation is calculated.
   */
  type: string
}

/**
 * ScrapeDataFile
 * Data model for scrape files
 */
export interface LVScrapeDataFile {
  /** Content */
  content: string
  /** Description */
  description: string
  /** Images */
  images: LVScrapeImage[]
  /** Site Name */
  site_name: string
  /** Title */
  title: string
  /** Url */
  url: string
}

/**
 * ScrapeDataFileNames
 * Data model for scrape files
 */
export interface LVScrapeDataFileNames {
  /** Filename */
  filename: string
}

/**
 * ScrapeImage
 * Data model for scrape images
 */
export interface LVScrapeImage {
  /** Alt */
  alt: string
  /** Url */
  url: string
}

/** SectionConfig */
export interface LVSectionConfig {
  /**
   * Config
   * Optional customized configuration parameters for the section, can be a JSON string or reference to a markdown file.
   * @default null
   */
  config?: string | null
  /**
   * Name
   * Name of the section component to render, such as 'IntroHeroFullWidth' or 'ServicesOffered'.
   */
  name: string
}

/** Service */
export interface LVService {
  /**
   * Cta
   * Call-to-action identifier associated with this service, such as 'contact', 'quote', or a custom value.
   * @default null
   */
  cta?: string | null
  /**
   * Ctalink
   * Custom URL or path for the call-to-action button, if different from the default CTA behavior for this type.
   * @default null
   */
  ctaLink?: string | null
  /**
   * Description
   * Comprehensive description of the service, its benefits, process, and relevant details. This description should be formatted in markdown and not contain any headings higher than h2.
   * @default null
   */
  description?: string | null
  /**
   * Id
   * Unique identifier for the service, used in URLs, reference tags, and internal linking.
   */
  id: string
  /**
   * Image
   * Primary image representing the service, used in service listings and detail pages.
   * @default null
   */
  image?: string | null
  /**
   * Name
   * Display name of the service shown to users, describing the main service category.
   */
  name: string
  /**
   * Price
   * Price information for the service, which can be a fixed amount, range, or descriptive text like 'Contact for quote'.
   * @default null
   */
  price?: string | null
  /**
   * Subservices
   * List of more specific services within this main service category, each with its own details and pricing.
   * @default null
   */
  subServices?: LVSubService[] | null
  /**
   * Summary
   * Brief overview of the service, typically shown in cards or list views before displaying full details.
   */
  summary: string
}

/** ServiceArea */
export interface LVServiceArea {
  /**
   * Locality
   * City or town name that is part of the business's service area, where they provide services to customers. This should be the official name of the city or town, not a nickname or abbreviation.
   */
  locality: string | null
  /**
   * Postalcode
   * Postal code (zipcode) of the service area.
   * @default null
   */
  postalCode?: string | null
  /**
   * Region
   * State or region code for the service area locality, typically the two-letter state code in the US, such as 'TX'.
   */
  region: string
}

/** SiteData */
export interface LVSiteData {
  /** @default null */
  business?: LVBusiness | null
  /**
   * Faq
   * @default null
   */
  faq?: LVFAQItem[] | null
  /** @default null */
  forms?: LVForms | null
  /**
   * Jobs
   * @default null
   */
  jobs?: LVJobPosting[] | null
  /** @default null */
  products?: LVProducts | null
  /**
   * Published
   * @default false
   */
  published?: boolean
  /** @default null */
  theme?: LVTheme | null
  /** Version */
  version: number
  /** @default null */
  websiteConfig?: LVWebsiteConfig | null
}

/** SiteVersionInput */
export interface LVSiteVersionInput {
  /** @default null */
  business?: LVBusiness | null
  /**
   * Faq
   * @default null
   */
  faq?: LVFAQItem[] | null
  /** @default null */
  forms?: LVForms | null
  /**
   * Jobs
   * @default null
   */
  jobs?: LVJobPosting[] | null
  /** @default null */
  products?: LVProducts | null
  /** @default null */
  theme?: LVTheme | null
  /** @default null */
  websiteConfig?: LVWebsiteConfig | null
}

/** Social */
export interface LVSocial {
  /**
   * Angieslist
   * Angie's List profile URL.
   * @default null
   */
  angieslist?: string | null
  /**
   * Bbb
   * Better Business Bureau profile URL.
   * @default null
   */
  bbb?: string | null
  /**
   * Facebook
   * Facebook username or page identifier, used to generate the complete Facebook profile URL.
   * @default null
   */
  facebook?: string | null
  /**
   * Google
   * Google Business profile URL.
   * @default null
   */
  google?: string | null
  /**
   * Homeadvisor
   * HomeAdvisor profile URL.
   * @default null
   */
  homeadvisor?: string | null
  /**
   * Instagram
   * Instagram username, used to generate the complete Instagram profile URL.
   * @default null
   */
  instagram?: string | null
  /**
   * Linkedin
   * LinkedIn username or profile identifier, used to generate the complete LinkedIn profile URL.
   * @default null
   */
  linkedin?: string | null
  /**
   * Nextdoor
   * Nextdoor profile URL.
   * @default null
   */
  nextdoor?: string | null
  /**
   * Pinterest
   * Pinterest username, used to generate the complete Pinterest profile URL.
   * @default null
   */
  pinterest?: string | null
  /**
   * Snapchat
   * Snapchat username, used to generate the complete Snapchat profile URL.
   * @default null
   */
  snapchat?: string | null
  /**
   * Thumbtack
   * Thumbtack profile URL.
   * @default null
   */
  thumbtack?: string | null
  /**
   * Tiktok
   * TikTok username, used to generate the complete TikTok profile URL.
   * @default null
   */
  tiktok?: string | null
  /**
   * Twitter
   * Twitter username, used to generate the complete Twitter profile URL.
   * @default null
   */
  twitter?: string | null
  /**
   * Whatsapp
   * WhatsApp contact number, used to generate the complete WhatsApp contact URL.
   * @default null
   */
  whatsapp?: string | null
  /**
   * Yelp
   * Yelp profile URL.
   * @default null
   */
  yelp?: string | null
  /**
   * Youtube
   * YouTube channel or user identifier, used to generate the complete YouTube profile URL.
   * @default null
   */
  youtube?: string | null
}

/** SubService */
export interface LVSubService {
  /**
   * Cta
   * Call-to-action identifier associated with this sub-service, such as 'contact' or 'appointment'. Only add a cta for a subservice if the previous site that we are converting from had a specific cta for that subservice.
   * @default null
   */
  cta?: string | null
  /**
   * Ctalink
   * Direct URL or path for the call-to-action button, if different from the default CTA behavior.
   * @default null
   */
  ctaLink?: string | null
  /**
   * Description
   * Detailed description of the sub-service, its benefits, process, and any other relevant information. This description should be formatted in markdown and not contain any headings higher than h2.
   * @default null
   */
  description?: string | null
  /**
   * Id
   * Unique identifier for the sub-service, used in URLs and for reference in other components.
   * @default null
   */
  id?: string | null
  /**
   * Image
   * Image representing the sub-service, used in service listings and detail views.
   * @default null
   */
  image?: string | null
  /**
   * Name
   * Display name of the sub-service shown to users, describing the specific service offered.
   */
  name: string
  /**
   * Price
   * Price information for the sub-service, which can be a fixed amount, range, or 'Starting at' value. If the price is not explicitly included in the source materials, do not make up a price and leave this null.
   * @default null
   */
  price?: string | null
  /**
   * Summary
   * Brief description of the sub-service, typically shown in cards or list views before expanding details.
   */
  summary: string
}

/**
 * TaskResponse
 * Response model for task status
 */
export interface LVTaskResponse {
  /** Task Id */
  task_id: string
}

/** Theme */
export interface LVTheme {
  /**
   * Accent
   * Accent color used for highlighting or emphasizing certain elements. Specified as a hex code.
   * @default null
   */
  accent?: string | null
  /**
   * Accentforeground
   * Text color used on elements with the accent background color. Specified as a hex code. The foreground color should have a high enough contrast with the background color to meet WCAG 2.1 AA contrast requirements.
   * @default null
   */
  accentForeground?: string | null
  /**
   * Background
   * Primary background color for the website, used for the main body or container areas. Specified as a hex code.
   * @default null
   */
  background?: string | null
  /**
   * Bodyfont
   * Font family specifically for body text, if different from the primary font.
   * @default null
   */
  bodyFont?: string | null
  /**
   * Border
   * Color used for borders and dividers throughout the website. Specified as a hex code.
   * @default null
   */
  border?: string | null
  /**
   * Card
   * Background color for card elements like service cards or blog post previews. Specified as a hex code.
   * @default null
   */
  card?: string | null
  /**
   * Cardforeground
   * Text color used within card elements that contrasts with the card background. Specified as a hex code. The foreground color should have a high enough contrast with the background color to meet WCAG 2.1 AA contrast requirements.
   * @default null
   */
  cardForeground?: string | null
  /**
   * Content
   * Background color for content sections or cards within the main layout. Specified as a hex code.
   * @default null
   */
  content?: string | null
  /**
   * Contentforeground
   * Text color used within content sections that contrasts with the content background. Specified as a hex code. The foreground color should have a high enough contrast with the background color to meet WCAG 2.1 AA contrast requirements.
   * @default null
   */
  contentForeground?: string | null
  /**
   * Destructive
   * Color used for destructive actions or error states, typically a red shade. Specified as a hex code.
   * @default null
   */
  destructive?: string | null
  /**
   * Destructiveforeground
   * Text color used on elements with the destructive background color. Specified as a hex code. The foreground color should have a high enough contrast with the background color to meet WCAG 2.1 AA contrast requirements.
   * @default null
   */
  destructiveForeground?: string | null
  /**
   * Fontfamily
   * Primary font family for the website, used for most text elements. Font family options are Inter, Roboto, Open Sans, Lora, Montserrat, or Oswald. (use this if you don't set the next two)
   * @default null
   */
  fontFamily?: string | null
  /**
   * Footer
   * Background color for the website footer section. Specified as a hex code.
   * @default null
   */
  footer?: string | null
  /**
   * Footerforeground
   * Text color used within the footer that contrasts with the footer background. Specified as a hex code. The foreground color should have a high enough contrast with the background color to meet WCAG 2.1 AA contrast requirements.
   * @default null
   */
  footerForeground?: string | null
  /**
   * Foreground
   * Primary foreground (text) color that contrasts with the background color. Specified as a hex code. The foreground color should have a high enough contrast with the background color to meet WCAG 2.1 AA contrast requirements.
   * @default null
   */
  foreground?: string | null
  /**
   * Header
   * Background color for the website header/navigation section. Specified as a hex code.
   * @default null
   */
  header?: string | null
  /**
   * Headerforeground
   * Text color used within the header that contrasts with the header background. Specified as a hex code. The foreground color should have a high enough contrast with the background color to meet WCAG 2.1 AA contrast requirements.
   * @default null
   */
  headerForeground?: string | null
  /**
   * Headingfont
   * Font family specifically for headings, if different from the primary font. Font family options are Inter, Roboto, Open Sans, Lora, Montserrat, or Oswald.
   * @default null
   */
  headingFont?: string | null
  /**
   * Input
   * Color used for form input borders and backgrounds. Specified as a hex code.
   * @default null
   */
  input?: string | null
  /**
   * Muted
   * Subtle background color used for less prominent elements or disabled states. Specified as a hex code.
   * @default null
   */
  muted?: string | null
  /**
   * Mutedforeground
   * Text color used on muted background elements, typically less prominent than the main text. Specified as a hex code. The foreground color should have a high enough contrast with the background color to meet WCAG 2.1 AA contrast requirements.
   * @default null
   */
  mutedForeground?: string | null
  /**
   * Primary
   * Primary brand color used for buttons, links, and highlighted elements. Specified as a hex code.
   * @default null
   */
  primary?: string | null
  /**
   * Primaryforeground
   * Text color used on elements with the primary background color. Specified as a hex code. The text color should have a high enough contrast with the background color to meet WCAG 2.1 AA contrast requirements.
   * @default null
   */
  primaryForeground?: string | null
  /**
   * Radius
   * Border radius size used for rounded corners throughout the UI, specified with units such as 'px'.
   * @default null
   */
  radius?: string | null
  /**
   * Ring
   * Color used for focus rings around interactive elements for accessibility. Specified as a hex code.
   * @default null
   */
  ring?: string | null
  /**
   * Secondary
   * Secondary brand color used for alternative buttons, accents, and highlights. Specified as a hex code.
   * @default null
   */
  secondary?: string | null
  /**
   * Secondaryforeground
   * Text color used on elements with the secondary background color. Specified as a hex code. The foreground color should have a high enough contrast with the background color to meet WCAG 2.1 AA contrast requirements.
   * @default null
   */
  secondaryForeground?: string | null
}

/** TimeData */
export interface LVTimeData {
  /** Day */
  day: number
  /** Time */
  time: string
}

/** UserData */
export interface LVUserData {
  /**
   * Created At
   * Date and time for when the model object was created.
   * @default null
   */
  created_at?: string | null
  /**
   * Email
   * @default null
   */
  email?: string | null
  /**
   * First Name
   * @default null
   */
  first_name?: string | null
  /**
   * Id
   * Unique uuid for the model object.
   * @default null
   */
  id?: string | null
  /**
   * Last Name
   * @default null
   */
  last_name?: string | null
  /**
   * Phone
   * @default null
   */
  phone?: string | null
  /**
   * Session Id
   * @default null
   */
  session_id?: string | null
  /**
   * Updated At
   * Date and time for when the model object was last updated.
   * @default null
   */
  updated_at?: string | null
}

/** ValidationErrorData */
export interface LVValidationErrorData {
  /** Message */
  message: string
  /** Path */
  path: string
}

/** ValidationInput */
export type LVValidationInput = Record<string, any>

/** ViewportData */
export interface LVViewportData {
  northeast: LVLocationData
  southwest: LVLocationData
}

/** WebsiteConfig */
export interface LVWebsiteConfig {
  /**
   * Configkeys
   * Integration configurations for third-party services like analytics and tracking.
   * @default null
   */
  configKeys?: LVConfigKeys[] | null
  /**
   * Configuration for the main contact form, including fields and display options.
   * @default null
   */
  contactForm?: LVContactForm | null
  /** Configuration for all call-to-action buttons used throughout the website. */
  cta: LV_CTA
  /**
   * Configuration for the website footer, including floating CTAs and other footer elements.
   * @default null
   */
  footer?: LVFooter | null
  /**
   * Configuration for the website header, including logo settings and header styling.
   * @default null
   */
  header?: LVHeader | null
  /**
   * Navigation
   * List of navigation items defining the main menu structure of the website. A site should always have a home page, services page and about page. If converting from a previous website, this should include the previous website's navigation items and be ordered in the same way as the previous website. The standard sections/routes for our menu include 'home', 'services', 'about', 'contact', 'blog', 'events', 'locations', 'gallery', and 'faq'. Do not include a contact page, as our footer has contact information across all pages. Where it's relevant or where previous sites have special menu items, a special page can be created from a story. You can see an example of this on kateyvillalon's site with the IMAGO page.
   */
  navigation: LVNavigationItem[]
  /**
   * Pageconfig
   * List of page names with their section configurations, defining the structure of different page types.
   */
  pageConfig: LVPageConfig[]
  /**
   * Redirect
   * List of URL redirects to handle legacy URLs or restructured content.
   * @default null
   */
  redirect?: LVRedirect[] | null
  /**
   * Sectionconfig
   * Global section configurations that can override default section settings across the site.
   * @default null
   */
  sectionConfig?: LVSectionConfig[] | null
  /**
   * Configuration for the newsletter or subscription form, if different from the main contact form.
   * @default null
   */
  subscriptionForm?: LVContactForm | null
}

/**
 * WorkDayInfo
 * WorkDayInfo
 */
export interface LVWorkDayInfo {
  /** @default null */
  close?: LVWorkTimeInfo | null
  /** @default null */
  open?: LVWorkTimeInfo | null
}

/**
 * WorkHours
 * WorkHours
 */
export interface LVWorkHours {
  /**
   * Current Status
   * current status of the establishment indicates whether the establishment is opened or closed
   * @default null
   */
  current_status?: string | null
  /**
   * Timetable
   * work hours timetable
   * @default null
   */
  timetable?: Record<string, LVWorkDayInfo[] | null> | null
}

/**
 * WorkTime
 * WorkTime
 */
export interface LVWorkTime {
  /** @default null */
  work_hours?: LVWorkHours | null
}

/**
 * WorkTimeInfo
 * WorkTimeInfo
 */
export interface LVWorkTimeInfo {
  /**
   * Hour
   * hours in the 24-hour format
   * @default null
   */
  hour?: number | null
  /**
   * Minute
   * minutes
   * @default null
   */
  minute?: number | null
}

export type QueryParamsType = Record<string | number, any>
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean
  /** request path */
  path: string
  /** content type of request body */
  type?: ContentType
  /** query params */
  query?: QueryParamsType
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat
  /** request body */
  body?: unknown
  /** base url */
  baseUrl?: string
  /** request cancellation token */
  cancelToken?: CancelToken
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">
  securityWorker?: (
    securityData: SecurityDataType | null
  ) => Promise<RequestParams | void> | RequestParams | void
  customFetch?: typeof fetch
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown>
  extends Response {
  data: D
  error: E
}

type CancelToken = Symbol | string | number

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = ""
  private securityData: SecurityDataType | null = null
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"]
  private abortControllers = new Map<CancelToken, AbortController>()
  private customFetch = (...fetchParams: Parameters<typeof fetch>) =>
    fetch(...fetchParams)

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  }

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig)
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data
  }

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key)
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key])
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key]
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&")
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {}
    const keys = Object.keys(query).filter(
      (key) => "undefined" !== typeof query[key]
    )
    return keys
      .map((key) =>
        Array.isArray(query[key])
          ? this.addArrayQueryParam(query, key)
          : this.addQueryParam(query, key)
      )
      .join("&")
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery)
    return queryString ? `?${queryString}` : ""
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.Text]: (input: any) =>
      input !== null && typeof input !== "string"
        ? JSON.stringify(input)
        : input,
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key]
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
              ? JSON.stringify(property)
              : `${property}`
        )
        return formData
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  }

  protected mergeRequestParams(
    params1: RequestParams,
    params2?: RequestParams
  ): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    }
  }

  protected createAbortSignal = (
    cancelToken: CancelToken
  ): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken)
      if (abortController) {
        return abortController.signal
      }
      return void 0
    }

    const abortController = new AbortController()
    this.abortControllers.set(cancelToken, abortController)
    return abortController.signal
  }

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken)

    if (abortController) {
      abortController.abort()
      this.abortControllers.delete(cancelToken)
    }
  }

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {}
    const requestParams = this.mergeRequestParams(params, secureParams)
    const queryString = query && this.toQueryString(query)
    const payloadFormatter = this.contentFormatters[type || ContentType.Json]
    const responseFormat = format || requestParams.format

    return this.customFetch(
      `${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`,
      {
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData
            ? { "Content-Type": type }
            : {}),
        },
        signal:
          (cancelToken
            ? this.createAbortSignal(cancelToken)
            : requestParams.signal) || null,
        body:
          typeof body === "undefined" || body === null
            ? null
            : payloadFormatter(body),
      }
    ).then(async (response) => {
      const r = response.clone() as HttpResponse<T, E>
      r.data = null as unknown as T
      r.error = null as unknown as E

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data
              } else {
                r.error = data
              }
              return r
            })
            .catch((e) => {
              r.error = e
              return r
            })

      if (cancelToken) {
        this.abortControllers.delete(cancelToken)
      }

      if (!response.ok) throw data
      return data
    })
  }
}

/**
 * @title Local Victor API
 * @version 1.0.0
 *
 * API documentation
 */
export class LVAPI<SecurityDataType extends unknown> {
  http: HttpClient<SecurityDataType>

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http
  }

  api = {
    /**
 * No description
 *
 * @tags account
 * @name V1AcccountCreate
 * @summary 
    Create a new account
 * @request POST:/api/v1/acccount
 */
    v1AcccountCreate: (data: LVAccountData, params: RequestParams = {}) =>
      this.http.request<LVAccountData, any>({
        path: `/api/v1/acccount`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags dfseo
 * @name V1DfseoBusinessInfoRequestDetail
 * @summary 
    Get business info request for a place_id
 * @request GET:/api/v1/dfseo/business_info/request/{place_id}
 */
    v1DfseoBusinessInfoRequestDetail: (
      placeId: string,
      params: RequestParams = {}
    ) =>
      this.http.request<LVTaskResponse, any>({
        path: `/api/v1/dfseo/business_info/request/${placeId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags dfseo
 * @name V1DfseoBusinessInfoTaskDetail
 * @summary 
    Get task status for a task_id
 * @request GET:/api/v1/dfseo/business_info/task/{task_id}
 */
    v1DfseoBusinessInfoTaskDetail: (
      taskId: string,
      params: RequestParams = {}
    ) =>
      this.http.request<LVGoogleBusinessInfoBusinessDataSerpElementItem, any>({
        path: `/api/v1/dfseo/business_info/task/${taskId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags google
 * @name V1GoogleAutocompleteList
 * @summary 
    Get business info request for a place_id
 * @request GET:/api/v1/google/autocomplete
 */
    v1GoogleAutocompleteList: (
      query: {
        input: string
      },
      params: RequestParams = {}
    ) =>
      this.http.request<LVEstablishment[], any>({
        path: `/api/v1/google/autocomplete`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags google
 * @name V1GooglePlaceDetailsDetail
 * @summary 
    Get task status for a task_id
 * @request GET:/api/v1/google/place_details/{place_id}
 */
    v1GooglePlaceDetailsDetail: (placeId: string, params: RequestParams = {}) =>
      this.http.request<LVPlaceDetailsResult, any>({
        path: `/api/v1/google/place_details/${placeId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags health
     * @name V1HealthList
     * @request GET:/api/v1/health
     */
    v1HealthList: (
      query: {
        request_body: string
      },
      params: RequestParams = {}
    ) =>
      this.http.request<LVHealthResponse, any>({
        path: `/api/v1/health`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags account
 * @name V1ScrapeList
 * @summary 
    List scraped files
 * @request GET:/api/v1/scrape
 */
    v1ScrapeList: (params: RequestParams = {}) =>
      this.http.request<LVScrapeDataFileNames[], any>({
        path: `/api/v1/scrape`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags scrape
 * @name V1ScrapeDetail
 * @summary 
    Get scraped file
 * @request GET:/api/v1/scrape/{filename}
 */
    v1ScrapeDetail: (filename: string, params: RequestParams = {}) =>
      this.http.request<LVScrapeDataFile, any>({
        path: `/api/v1/scrape/${filename}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags site
     * @name V1SiteBusinessList
     * @summary Get the profile of the currently authenticated user
     * @request GET:/api/v1/site/business
     */
    v1SiteBusinessList: (params: RequestParams = {}) =>
      this.http.request<LVBusiness, any>({
        path: `/api/v1/site/business`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags site
     * @name V1SiteBusinessCreate
     * @summary Get the profile of the currently authenticated user
     * @request POST:/api/v1/site/business
     */
    v1SiteBusinessCreate: (data: LVBusiness, params: RequestParams = {}) =>
      this.http.request<LVBusiness, any>({
        path: `/api/v1/site/business`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags site
     * @name V1SiteBusinessLocationCreate
     * @summary Get the profile of the currently authenticated user
     * @request POST:/api/v1/site/business/location
     */
    v1SiteBusinessLocationCreate: (
      data: LVBusinessLocationInput,
      params: RequestParams = {}
    ) =>
      this.http.request<LVLocation[], any>({
        path: `/api/v1/site/business/location`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags site
     * @name V1SiteFaqsList
     * @summary Get the list of all FAQs for the current site
     * @request GET:/api/v1/site/faqs
     */
    v1SiteFaqsList: (params: RequestParams = {}) =>
      this.http.request<LVFAQItem[], any>({
        path: `/api/v1/site/faqs`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags site
     * @name V1SiteFaqsDetail
     * @summary Get a specific FAQ by its ID
     * @request GET:/api/v1/site/faqs/{faq_id}
     */
    v1SiteFaqsDetail: (faqId: string, params: RequestParams = {}) =>
      this.http.request<LVFAQItem, any>({
        path: `/api/v1/site/faqs/${faqId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags site
     * @name V1SiteFaqsCreate
     * @summary Create or update an FAQ
     * @request POST:/api/v1/site/faqs/{faq_id}
     */
    v1SiteFaqsCreate: (
      faqId: string,
      data: LVFAQItem,
      params: RequestParams = {}
    ) =>
      this.http.request<LVFAQItem, any>({
        path: `/api/v1/site/faqs/${faqId}`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags site
     * @name V1SiteFormsList
     * @summary Get the forms of the currently authenticated site
     * @request GET:/api/v1/site/forms
     */
    v1SiteFormsList: (params: RequestParams = {}) =>
      this.http.request<LVForms, any>({
        path: `/api/v1/site/forms`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags site
     * @name V1SiteFormsDelete
     * @summary Delete a form by type
     * @request DELETE:/api/v1/site/forms/{form_type}
     */
    v1SiteFormsDelete: (formType: string, params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/api/v1/site/forms/${formType}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * No description
     *
     * @tags site
     * @name V1SiteFormsDetail
     * @summary Get a specific form by type
     * @request GET:/api/v1/site/forms/{form_type}
     */
    v1SiteFormsDetail: (formType: string, params: RequestParams = {}) =>
      this.http.request<LVForm, any>({
        path: `/api/v1/site/forms/${formType}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags site
     * @name V1SiteFormsCreate
     * @summary Create or update a form
     * @request POST:/api/v1/site/forms/{form_type}
     */
    v1SiteFormsCreate: (
      formType: string,
      data: LVForm,
      params: RequestParams = {}
    ) =>
      this.http.request<LVForm, any>({
        path: `/api/v1/site/forms/${formType}`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags site
     * @name V1SiteJobsList
     * @summary Get the list of all job postings for the current site
     * @request GET:/api/v1/site/jobs
     */
    v1SiteJobsList: (params: RequestParams = {}) =>
      this.http.request<LVJobPosting[], any>({
        path: `/api/v1/site/jobs`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags site
     * @name V1SiteJobsDetail
     * @summary Get a specific job posting by its ID
     * @request GET:/api/v1/site/jobs/{job_id}
     */
    v1SiteJobsDetail: (jobId: string, params: RequestParams = {}) =>
      this.http.request<LVJobPosting, any>({
        path: `/api/v1/site/jobs/${jobId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags site
     * @name V1SiteJobsCreate
     * @summary Create or update a job posting
     * @request POST:/api/v1/site/jobs/{job_id}
     */
    v1SiteJobsCreate: (
      jobId: string,
      data: LVJobPosting,
      params: RequestParams = {}
    ) =>
      this.http.request<LVJobPosting, any>({
        path: `/api/v1/site/jobs/${jobId}`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags site
     * @name V1SiteProductGroupsList
     * @summary Get a specific product group by slug
     * @request GET:/api/v1/site/product-groups
     */
    v1SiteProductGroupsList: (params: RequestParams = {}) =>
      this.http.request<LVProductGroup[], any>({
        path: `/api/v1/site/product-groups`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags site
     * @name V1SiteProductGroupsBulkCreate
     * @summary Bulk create or update product groups
     * @request POST:/api/v1/site/product-groups/bulk
     */
    v1SiteProductGroupsBulkCreate: (
      data: LVProductGroupBulkImport,
      params: RequestParams = {}
    ) =>
      this.http.request<LVProductGroupBulkImport, any>({
        path: `/api/v1/site/product-groups/bulk`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags site
     * @name V1SiteProductGroupsDelete
     * @summary Delete a product group by slug
     * @request DELETE:/api/v1/site/product-groups/{group_slug}
     */
    v1SiteProductGroupsDelete: (
      groupSlug: string,
      params: RequestParams = {}
    ) =>
      this.http.request<void, any>({
        path: `/api/v1/site/product-groups/${groupSlug}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * No description
     *
     * @tags site
     * @name V1SiteProductGroupsDetail
     * @summary Get a specific product group by slug
     * @request GET:/api/v1/site/product-groups/{group_slug}
     */
    v1SiteProductGroupsDetail: (
      groupSlug: string,
      params: RequestParams = {}
    ) =>
      this.http.request<LVProductGroup, any>({
        path: `/api/v1/site/product-groups/${groupSlug}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags site
     * @name V1SiteProductGroupsCreate
     * @summary Create or update a product group
     * @request POST:/api/v1/site/product-groups/{group_slug}
     */
    v1SiteProductGroupsCreate: (
      groupSlug: string,
      data: LVProductGroup,
      params: RequestParams = {}
    ) =>
      this.http.request<LVProductGroup, any>({
        path: `/api/v1/site/product-groups/${groupSlug}`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags site
     * @name V1SiteProductsList
     * @summary Get the products of the currently authenticated site
     * @request GET:/api/v1/site/products
     */
    v1SiteProductsList: (params: RequestParams = {}) =>
      this.http.request<LVProducts, any>({
        path: `/api/v1/site/products`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags site
     * @name V1SiteProductsBulkCreate
     * @summary Bulk create or update products
     * @request POST:/api/v1/site/products/bulk
     */
    v1SiteProductsBulkCreate: (
      data: LVProductBulkImport,
      params: RequestParams = {}
    ) =>
      this.http.request<LVProduct[], any>({
        path: `/api/v1/site/products/bulk`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags site
     * @name V1SiteProductsDelete
     * @summary Delete a product by slug
     * @request DELETE:/api/v1/site/products/{product_slug}
     */
    v1SiteProductsDelete: (productSlug: string, params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/api/v1/site/products/${productSlug}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * No description
     *
     * @tags site
     * @name V1SiteProductsDetail
     * @summary Get a specific product by slug
     * @request GET:/api/v1/site/products/{product_slug}
     */
    v1SiteProductsDetail: (productSlug: string, params: RequestParams = {}) =>
      this.http.request<LVProduct, any>({
        path: `/api/v1/site/products/${productSlug}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags site
     * @name V1SiteProductsCreate
     * @summary Create or update a product
     * @request POST:/api/v1/site/products/{product_slug}
     */
    v1SiteProductsCreate: (
      productSlug: string,
      data: LVProduct,
      params: RequestParams = {}
    ) =>
      this.http.request<LVProduct, any>({
        path: `/api/v1/site/products/${productSlug}`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags site
     * @name V1SiteRevertDetail
     * @summary Revert site version to {version_number} deleting all version higher, this is irreversible so be careful
     * @request GET:/api/v1/site/revert/{version_number}
     */
    v1SiteRevertDetail: (versionNumber: string, params: RequestParams = {}) =>
      this.http.request<LVSiteData, any>({
        path: `/api/v1/site/revert/${versionNumber}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags site
     * @name V1SiteThemeList
     * @summary Get the theme configuration for the current site
     * @request GET:/api/v1/site/theme
     */
    v1SiteThemeList: (params: RequestParams = {}) =>
      this.http.request<LVTheme, any>({
        path: `/api/v1/site/theme`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags site
     * @name V1SiteThemeCreate
     * @summary Update the theme configuration for the current site
     * @request POST:/api/v1/site/theme
     */
    v1SiteThemeCreate: (data: LVTheme, params: RequestParams = {}) =>
      this.http.request<LVTheme, any>({
        path: `/api/v1/site/theme`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags site
     * @name V1SiteVersionCreate
     * @summary Get the profile of the currently authenticated user
     * @request POST:/api/v1/site/version
     */
    v1SiteVersionCreate: (
      data: LVSiteVersionInput,
      params: RequestParams = {}
    ) =>
      this.http.request<LVSiteData, any>({
        path: `/api/v1/site/version`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags site
     * @name V1SiteVersionLatestList
     * @request GET:/api/v1/site/version/latest
     */
    v1SiteVersionLatestList: (params: RequestParams = {}) =>
      this.http.request<LVSiteData, any>({
        path: `/api/v1/site/version/latest`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags site
     * @name V1SiteVersionPublishedList
     * @summary Get the profile of the currently authenticated user
     * @request GET:/api/v1/site/version/published
     */
    v1SiteVersionPublishedList: (params: RequestParams = {}) =>
      this.http.request<LVSiteData, any>({
        path: `/api/v1/site/version/published`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags site
     * @name V1SiteVersionDetail
     * @summary Get the profile of the currently authenticated user
     * @request GET:/api/v1/site/version/{version_number}
     */
    v1SiteVersionDetail: (versionNumber: string, params: RequestParams = {}) =>
      this.http.request<LVSiteData, any>({
        path: `/api/v1/site/version/${versionNumber}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags site
     * @name V1SiteWebsiteConfigList
     * @summary Get the website configuration for the current site
     * @request GET:/api/v1/site/website-config
     */
    v1SiteWebsiteConfigList: (params: RequestParams = {}) =>
      this.http.request<LVWebsiteConfig, any>({
        path: `/api/v1/site/website-config`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags site
     * @name V1SiteWebsiteConfigCreate
     * @summary Update the website configuration for the current site
     * @request POST:/api/v1/site/website-config
     */
    v1SiteWebsiteConfigCreate: (
      data: LVWebsiteConfig,
      params: RequestParams = {}
    ) =>
      this.http.request<LVWebsiteConfig, any>({
        path: `/api/v1/site/website-config`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name V1UsersMeList
     * @summary Get the profile of the currently authenticated user
     * @request GET:/api/v1/users/me
     */
    v1UsersMeList: (params: RequestParams = {}) =>
      this.http.request<LVUserData, any>({
        path: `/api/v1/users/me`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags validate
     * @name V1ValidateProductGroupCreate
     * @summary Validate a product group against the ProductGroup model
     * @request POST:/api/v1/validate/product-group
     */
    v1ValidateProductGroupCreate: (
      data: LVValidationInput,
      params: RequestParams = {}
    ) =>
      this.http.request<LVValidationErrorData[], any>({
        path: `/api/v1/validate/product-group`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags validate
     * @name V1ValidateProductConfigCreate
     * @summary Validate a product against the Product model
     * @request POST:/api/v1/validate/productConfig
     */
    v1ValidateProductConfigCreate: (
      data: LVValidationInput,
      params: RequestParams = {}
    ) =>
      this.http.request<LVValidationErrorData[], any>({
        path: `/api/v1/validate/productConfig`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  }
}
