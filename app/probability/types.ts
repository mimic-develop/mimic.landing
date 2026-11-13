// 뽑기 확률 공개 API 응답 형태.
// 계약 원문: mimic-backend-java docs/levelup/CONTEXT.md "뽑기 확률 공개 API 계약"
// 확률(percent) 은 서버가 반올림까지 끝낸 문자열 — 화면에서 계산하지 않는다.

export interface ProbabilityItem {
  itemId: number
  name: string
  seriesName?: string | null
}

export interface ProbabilitySlot {
  code: string
  name: string
  percent: string | null
  description: string
  perItemPercent: string | null
  perItemFormula: string | null
  itemsLabel: string | null
  items: ProbabilityItem[]
  replacements: { condition: 'ALL_OWNED' | 'OWNED' | 'SOLD_OUT'; text: string }[]
  limited: {
    startsAt: string
    endsAt: string
    totalQuantity: number
    remainingQuantity: number
    state: 'ACTIVE' | 'SOLD_OUT' | 'ENDED'
  } | null
}

// 현재 버전이 없으면(첫 버전 적용 전) version·state·effectiveFrom 이 null, slots 는 빈 배열
export interface ProbabilityTable {
  asOf: string
  version: number | null
  state: 'CURRENT' | 'UPCOMING' | 'PAST' | null
  effectiveFrom: string | null
  effectiveUntil: string | null
  paused: boolean
  drawCost: string
  slots: ProbabilitySlot[]
  upcoming: { version: number; effectiveFrom: string; noticeId: number }[]
}

export type NoticeKind =
  | 'INITIAL'
  | 'SERIES_ADDED'
  | 'SERIES_REMOVED'
  | 'PROBABILITY_CHANGED'
  | 'LIMITED_START'
  | 'LIMITED_END'
  | 'CANCELED'

export interface ProbabilityNotice {
  id: number
  kind: NoticeKind
  title: string
  announcedAt: string
  effectiveAt: string
  status: 'SCHEDULED' | 'APPLIED' | 'CANCELED'
  fromVersion: number | null
  toVersion: number
  changes: { target: string; before: string | null; after: string }[]
}

export interface NoticePage {
  list: ProbabilityNotice[]
  totalSize: number
  totalPage: number
  currentPage: number
  hasNext: boolean
}
