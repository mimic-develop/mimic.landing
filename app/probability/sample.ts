// API 가 생기기 전 화면 확인용 예시 데이터 — 계약 형태 그대로.
// 버전 1 의 칸 확률은 확정안(D26)과 같지만, 핸드박스 이름·개수·날짜와
// 버전 2(기간 한정 레거시 칸·84%)는 화면을 보기 위한 가짜 값이다.
import type { NoticePage, ProbabilityItem, ProbabilitySlot, ProbabilityTable } from './types'

const legacy: ProbabilityItem[] = Array.from({ length: 28 }, (_, i) => ({
  itemId: 100 + i,
  name: `레거시 핸드박스 ${String(i + 1).padStart(2, '0')}`,
}))

const series = (count: number): ProbabilityItem[] =>
  Array.from({ length: count }, (_, i) => {
    const s = `시리즈 ${String.fromCharCode(65 + i)}`
    return { itemId: 200 + i, name: `${s} 핸드박스`, seriesName: s }
  })

const periodSlot = (days: 1 | 3, percent: string): ProbabilitySlot => ({
  code: `PERIOD_HANDBOX_${days}D`,
  name: `기간 핸드박스 (${days}일)`,
  percent,
  description: `레거시 핸드박스 중 하나를 골라 ${days}일 동안 써요`,
  perItemPercent: null,
  perItemFormula: null,
  itemsLabel: '고를 수 있는 핸드박스',
  items: legacy,
  replacements: [
    { condition: 'ALL_OWNED', text: '레거시 핸드박스를 모두 영구로 가지고 있으면 미믹 피스 5개를 받아요' },
  ],
  limited: null,
})

const pieceSlot = (count: 1 | 3, percent: string): ProbabilitySlot => ({
  code: `MIMIC_PIECE_${count}`,
  name: `미믹 피스 ${count}개`,
  percent,
  description: '미믹 피스 10개를 모으면 원하는 영구 핸드박스로 바꿀 수 있어요',
  perItemPercent: null,
  perItemFormula: null,
  itemsLabel: null,
  items: [],
  replacements: [],
  limited: null,
})

const permanentSlot = (items: ProbabilityItem[], perItemPercent: string): ProbabilitySlot => ({
  code: 'PERMANENT_HANDBOX',
  name: '영구 핸드박스',
  percent: '0.25',
  description: '아래 핸드박스 중 하나가 나와요. 종류마다 확률이 같아요',
  perItemPercent,
  perItemFormula: `0.25% ÷ ${items.length}종`,
  itemsLabel: '나올 수 있는 핸드박스',
  items,
  replacements: [{ condition: 'OWNED', text: '이미 가진 핸드박스가 나오면 미믹 피스 5개를 받아요' }],
  limited: null,
})

const v1: ProbabilityTable = {
  asOf: '2026-12-10T15:00:00+09:00',
  version: 1,
  state: 'CURRENT',
  effectiveFrom: '2026-12-01T12:00:00+09:00',
  effectiveUntil: null,
  paused: false,
  drawCost: '뽑기권 1장',
  slots: [
    periodSlot(1, '85'),
    periodSlot(3, '6.75'),
    pieceSlot(1, '7'),
    pieceSlot(3, '1'),
    permanentSlot(series(6), '0.04167'),
  ],
  upcoming: [{ version: 2, effectiveFrom: '2026-12-15T12:00:00+09:00', noticeId: 2 }],
}

const v2: ProbabilityTable = {
  ...v1,
  version: 2,
  state: 'UPCOMING',
  effectiveFrom: '2026-12-15T12:00:00+09:00',
  slots: [
    periodSlot(1, '84'),
    periodSlot(3, '6.75'),
    pieceSlot(1, '7'),
    pieceSlot(3, '1'),
    permanentSlot(series(7), '0.03571'),
    {
      code: 'LIMITED_LEGACY',
      name: '기간 한정 레거시 핸드박스',
      percent: '1',
      description: '기간 동안만 나와요. 나오면 영구로 가져요',
      perItemPercent: '0.3333',
      perItemFormula: '1% ÷ 3종',
      itemsLabel: '이번에 나오는 핸드박스',
      items: legacy.slice(0, 3),
      replacements: [{ condition: 'SOLD_OUT', text: '다 나가거나 기간이 끝나면 이 칸은 기간 핸드박스 (1일)로 바뀌어요' }],
      limited: {
        startsAt: '2026-12-15T12:00:00+09:00',
        endsAt: '2026-12-29T11:59:59+09:00',
        totalQuantity: 300,
        remainingQuantity: 300,
        state: 'ACTIVE',
      },
    },
  ],
  upcoming: [],
}

export const sampleTable = (version?: number): ProbabilityTable | null =>
  version === undefined || version === 1 ? v1 : version === 2 ? v2 : null

export const sampleNotices: NoticePage = {
  list: [
    {
      id: 4,
      kind: 'CANCELED',
      title: '12월 22일 변경을 취소해요',
      announcedAt: '2026-12-10T09:00:00+09:00',
      effectiveAt: '2026-12-22T12:00:00+09:00',
      status: 'APPLIED',
      fromVersion: null,
      toVersion: 3,
      changes: [{ target: '12월 22일 변경', before: '예정', after: '취소 — 지금 확률 그대로예요' }],
    },
    {
      id: 3,
      kind: 'SERIES_REMOVED',
      title: '12월 22일부터 뽑기 구성이 바뀌어요',
      announcedAt: '2026-12-09T10:00:00+09:00',
      effectiveAt: '2026-12-22T12:00:00+09:00',
      status: 'CANCELED',
      fromVersion: 2,
      toVersion: 3,
      changes: [{ target: '영구 핸드박스 구성', before: '7종', after: '6종 (시리즈 A 핸드박스 빠짐)' }],
    },
    {
      id: 2,
      kind: 'SERIES_ADDED',
      title: '12월 15일부터 뽑기 구성이 바뀌어요',
      announcedAt: '2026-12-08T10:00:00+09:00',
      effectiveAt: '2026-12-15T12:00:00+09:00',
      status: 'SCHEDULED',
      fromVersion: 1,
      toVersion: 2,
      changes: [
        { target: '영구 핸드박스 구성', before: '6종', after: '7종 (시리즈 G 핸드박스 추가)' },
        { target: '영구 핸드박스 종류별 확률', before: '0.04167%', after: '0.03571%' },
        { target: '기간 한정 레거시 핸드박스', before: null, after: '1% (3종, 총 300개, 12월 15일 12:00 ~ 12월 29일 11:59)' },
        { target: '기간 핸드박스 (1일)', before: '85%', after: '84%' },
      ],
    },
    {
      id: 1,
      kind: 'INITIAL',
      title: '뽑기 확률을 공개해요',
      announcedAt: '2026-11-24T10:00:00+09:00',
      effectiveAt: '2026-12-01T12:00:00+09:00',
      status: 'APPLIED',
      fromVersion: null,
      toVersion: 1,
      changes: [
        { target: '기간 핸드박스 (1일)', before: null, after: '85%' },
        { target: '기간 핸드박스 (3일)', before: null, after: '6.75%' },
        { target: '미믹 피스 1개', before: null, after: '7%' },
        { target: '미믹 피스 3개', before: null, after: '1%' },
        { target: '영구 핸드박스', before: null, after: '0.25% (6종, 종류별 0.04167%)' },
      ],
    },
  ],
  totalSize: 4,
  totalPage: 1,
  currentPage: 0,
  hasNext: false,
}
