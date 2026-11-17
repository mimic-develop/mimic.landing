<template>
  <div class="prob-page">
    <main class="prob-main">
      <a class="home-link" href="/">MIMIC</a>

      <h1>확률형 아이템 정보</h1>
      <p class="lead">
        미믹 앱의 <strong>뽑기</strong>는 확률형 아이템이에요. 뽑기권 1장으로 1번 뽑고,
        아래 확률대로 결과 하나를 받아요. 결과는 뽑는 순간 바로 지급돼요.
      </p>

      <p v-if="isSample" class="sample-banner">
        지금 보이는 내용은 화면 확인용 예시예요. 실제 확률은 뽑기가 열릴 때 이 페이지에 공개돼요.
      </p>
      <p v-if="unpublished" class="muted">확률 정보는 뽑기가 열릴 때 이 페이지에 공개돼요.</p>

      <p v-if="loading" class="muted">불러오는 중이에요…</p>
      <p v-else-if="tableError" class="error">{{ tableError }}</p>

      <template v-else-if="table">
        <p v-if="table.paused" class="notice-strip">
          지금은 뽑기를 잠시 쉬고 있어요. 다시 열리면 앱에서 알려 드릴게요.
        </p>

        <section v-if="table.version === null" class="block">
          <h2>지금 확률</h2>
          <p class="muted">아직 적용 중인 확률이 없어요.</p>
          <p v-for="u in table.upcoming" :key="u.version" class="notice-strip">
            {{ fmtDate(u.effectiveFrom) }}부터 뽑기가 열려요.
            <a :href="`/probability?version=${u.version}`">공개될 확률 보기</a>
          </p>
        </section>

        <section v-else class="block">
          <div class="table-head">
            <h2 v-if="table.state === 'UPCOMING'">{{ fmtDate(table.effectiveFrom) }}부터 바뀌는 확률</h2>
            <h2 v-else-if="table.state === 'PAST'">지난 확률</h2>
            <h2 v-else>지금 확률</h2>
            <p class="muted small">
              <template v-if="table.state === 'PAST' && table.effectiveUntil">
                {{ fmtDate(table.effectiveFrom) }}부터 {{ fmtDate(table.effectiveUntil) }}까지 적용됐어요
              </template>
              <template v-else>{{ fmtDate(table.effectiveFrom) }}부터 적용</template>
              · 기준 시각 {{ fmtDate(table.asOf) }}
            </p>
          </div>

          <p v-if="table.state === 'UPCOMING'" class="notice-strip">
            아직 적용 전인 확률이에요. <a href="/probability">지금 확률 보기</a>
          </p>
          <p v-else-if="table.state === 'PAST'" class="notice-strip">
            지금은 쓰지 않는 확률이에요. <a href="/probability">지금 확률 보기</a>
          </p>
          <p v-for="u in table.state === 'CURRENT' ? table.upcoming : []" :key="u.version" class="notice-strip">
            {{ fmtDate(u.effectiveFrom) }}부터 확률이 바뀌어요.
            <a :href="`/probability?version=${u.version}`">바뀌는 확률 보기</a>
          </p>

          <table class="prob-table">
            <thead>
              <tr>
                <th scope="col">결과</th>
                <th scope="col" class="num">확률</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="s in table.slots" :key="s.code">
                <td>
                  <div class="slot-name">{{ s.name }}</div>
                  <div class="slot-desc">{{ s.description }}</div>
                  <div v-if="s.perItemPercent" class="slot-desc">
                    종류별 {{ s.perItemPercent }}% ({{ s.perItemFormula }})
                  </div>
                  <div v-if="s.limited" class="slot-desc">
                    기간 {{ fmtDate(s.limited.startsAt) }} ~ {{ fmtDate(s.limited.endsAt) }} ·
                    총 {{ fmtNum(s.limited.totalQuantity) }}개 ·
                    남은 수량 {{ fmtNum(s.limited.remainingQuantity) }}개
                    <template v-if="s.limited.state === 'SOLD_OUT'"> · 다 나갔어요</template>
                    <template v-else-if="s.limited.state === 'ENDED'"> · 기간이 끝났어요</template>
                  </div>
                  <div v-for="r in s.replacements" :key="r.condition" class="slot-desc replace">{{ r.text }}</div>
                </td>
                <td class="num pct">{{ s.percent }}%</td>
              </tr>
            </tbody>
          </table>
          <p class="muted small">
            확률은 백분율이고, 0이 아닌 첫 자리부터 네 자리까지 보여 줘요(그 아래에서 반올림).
          </p>
        </section>

        <section v-for="g in itemGroups" :key="g.key" class="block">
          <h2>{{ g.names }} — {{ g.slot.itemsLabel }} ({{ g.slot.items.length }}종)</h2>
          <p class="muted small">
            <template v-if="g.slot.perItemPercent">각 {{ g.slot.perItemPercent }}% ({{ g.slot.perItemFormula }})</template>
            <template v-else>뽑은 뒤 이 중에서 하나를 골라요</template>
          </p>
          <ul class="item-list">
            <li v-for="it in g.slot.items" :key="it.itemId">{{ it.name }}</li>
          </ul>
        </section>
      </template>

      <section v-if="notices || noticesError" class="block">
        <h2>변경 안내</h2>
        <p class="muted small">뽑기 구성이나 확률이 바뀔 때는 바뀌기 전에 여기와 앱에 먼저 알려요.</p>
        <p v-if="noticesError" class="error">{{ noticesError }}</p>
        <p v-else-if="notices && notices.list.length === 0" class="muted">아직 안내가 없어요.</p>
        <article v-for="n in notices?.list ?? []" :key="n.id" class="notice">
          <div class="notice-head">
            <span v-if="n.kind === 'CANCELED'" class="badge badge-applied">취소 안내</span>
            <span v-else class="badge" :class="`badge-${n.status.toLowerCase()}`">{{ statusLabel[n.status] }}</span>
            <h3>{{ n.title }}</h3>
          </div>
          <p class="muted small">
            알린 날 {{ fmtDate(n.announcedAt) }} · 적용 {{ fmtDate(n.effectiveAt) }}
          </p>
          <ul class="changes">
            <li v-for="(c, i) in n.changes" :key="i">
              <strong>{{ c.target }}</strong>{{ ': ' + (c.before ? `${c.before} → ${c.after}` : c.after) }}
            </li>
          </ul>
          <a
            v-if="n.status === 'SCHEDULED' && n.toVersion !== table?.version"
            :href="`/probability?version=${n.toVersion}`"
            class="small"
          >바뀌는 확률 보기</a>
        </article>
      </section>

      <footer class="prob-footer">
        <a href="/">미믹 홈으로</a>
      </footer>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import type { NoticePage, ProbabilitySlot, ProbabilityTable } from '../probability/types'
import { sampleNotices, sampleTable } from '../probability/sample'

useHead({
  title: '확률형 아이템 정보 - MIMIC',
  meta: [{ name: 'description', content: '미믹 앱 뽑기의 결과별 확률, 나올 수 있는 핸드박스 목록, 확률 변경 안내' }],
})

const config = useRuntimeConfig()
const apiBase = (config.public.gachaApiBase as string).replace(/\/$/, '')
// 예시 데이터는 개발 서버에서만 — 주소 없이 운영 빌드하면 가짜 확률 대신 "곧 공개"만 보임
const isSample = !apiBase && import.meta.dev
const unpublished = !apiBase && !import.meta.dev

const table = ref<ProbabilityTable | null>(null)
const notices = ref<NoticePage | null>(null)
const loading = ref(!unpublished)
const tableError = ref('')
const noticesError = ref('')
const requestedVersion = ref<number | undefined>()
// 기간 핸드박스 1일·3일처럼 목록이 같은 칸은 한 번만 보여 준다
const itemGroups = computed(() => {
  const groups = new Map<string, { key: string; names: string; slot: ProbabilitySlot }>()
  for (const s of table.value?.slots ?? []) {
    if (s.items.length === 0) continue
    const key = `${s.itemsLabel}|${s.perItemPercent}|${s.items.map((i) => i.itemId).join(',')}`
    const g = groups.get(key)
    if (g) g.names += ` · ${s.name}`
    else groups.set(key, { key, names: s.name, slot: s })
  }
  return [...groups.values()]
})

const statusLabel = { SCHEDULED: '예정', APPLIED: '적용됨', CANCELED: '취소됨' } as const

const dateFmt = new Intl.DateTimeFormat('ko-KR', {
  timeZone: 'Asia/Seoul',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  hourCycle: 'h23', // hour12:false 는 오래된 엔진에서 자정을 24:00 으로 찍음
})
const fmtDate = (iso: string) => dateFmt.format(new Date(iso))
const fmtNum = (n: number) => n.toLocaleString('ko-KR')

onMounted(async () => {
  const v = Number(new URLSearchParams(window.location.search).get('version'))
  requestedVersion.value = Number.isInteger(v) && v > 0 ? v : undefined

  if (unpublished) return
  if (isSample) {
    table.value = sampleTable(requestedVersion.value)
    notices.value = sampleNotices
    if (!table.value) tableError.value = '찾는 확률표가 없어요.'
    loading.value = false
    return
  }

  // 표와 공지는 따로 받음 — 한쪽이 실패해도 다른 쪽은 보이게
  const q = requestedVersion.value ? `?version=${requestedVersion.value}` : ''
  const [t, n] = await Promise.allSettled([
    $fetch<ProbabilityTable>(`${apiBase}/gacha/probability${q}`),
    $fetch<NoticePage>(`${apiBase}/gacha/probability/notices?page=0&size=50`),
  ])
  if (t.status === 'fulfilled') table.value = t.value
  else if (requestedVersion.value && (t.reason as { statusCode?: number })?.statusCode === 404)
    tableError.value = '찾는 확률표가 없어요.'
  else tableError.value = '확률 정보를 불러오지 못했어요. 잠시 뒤 다시 열어 주세요.'
  if (n.status === 'fulfilled') notices.value = n.value
  else noticesError.value = '변경 안내를 불러오지 못했어요. 잠시 뒤 다시 열어 주세요.'
  loading.value = false
})
</script>

<style>
/* 브랜드 화면(index)의 html/body overflow:hidden 을 이 페이지에서 쓰지 않도록 자체 스크롤 영역을 둔다 */
@font-face {
  font-family: 'Gmarket Sans TTF';
  src: url('~/assets/fonts/GmarketSansTTFMedium.ttf') format('truetype');
  font-weight: 500;
  font-style: normal;
}
@font-face {
  font-family: 'Gmarket Sans TTF';
  src: url('~/assets/fonts/GmarketSansTTFBold.ttf') format('truetype');
  font-weight: 700;
  font-style: normal;
}
html, body { margin: 0; padding: 0; background: #000; }
</style>

<style scoped>
.prob-page {
  position: fixed;
  inset: 0;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  background: #000;
  color: #f2f2f2;
  font-family: 'Gmarket Sans TTF', -apple-system, 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif;
  font-weight: 500;
  line-height: 1.6;
}
.prob-main {
  max-width: 760px;
  margin: 0 auto;
  padding: 40px 16px 64px;
}
.home-link {
  font-family: 'Courage', sans-serif;
  font-style: italic;
  font-size: 22px;
  letter-spacing: 0.06em;
  color: #fff;
  text-decoration: none;
}
h1 { font-size: 28px; font-weight: 700; margin: 28px 0 12px; }
h2 { font-size: 19px; font-weight: 700; margin: 0 0 6px; }
h3 { font-size: 16px; font-weight: 700; margin: 0; }
.lead { color: #d0d0d0; margin: 0 0 20px; }
.lead strong { color: #fff; }
.muted { color: #9a9a9a; }
.small { font-size: 13px; }
a { color: #ff5a5a; }
.error { color: #ff7b7b; }
.sample-banner {
  border: 1px dashed #ff5a5a;
  color: #ffb3b3;
  padding: 10px 12px;
  border-radius: 8px;
  font-size: 14px;
}
.block { margin-top: 36px; }
.table-head { margin-bottom: 12px; }
.notice-strip {
  background: #1c1c1c;
  border-left: 3px solid #ff5a5a;
  padding: 10px 12px;
  margin: 0 0 12px;
  font-size: 14px;
}
.prob-table { width: 100%; border-collapse: collapse; margin-bottom: 8px; }
.prob-table th {
  text-align: left;
  font-size: 13px;
  color: #9a9a9a;
  border-bottom: 1px solid #333;
  padding: 8px 4px;
}
.prob-table td { border-bottom: 1px solid #222; padding: 14px 4px; vertical-align: top; }
.num { text-align: right; white-space: nowrap; }
.pct { font-size: 18px; font-weight: 700; color: #fff; padding-left: 12px; }
.slot-name { font-size: 16px; font-weight: 700; color: #fff; }
.slot-desc { font-size: 13px; color: #b5b5b5; margin-top: 2px; }
.replace { color: #ffb3b3; }
.item-list {
  list-style: none;
  padding: 0;
  margin: 10px 0 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
  gap: 6px;
}
.item-list li {
  background: #151515;
  border: 1px solid #262626;
  border-radius: 6px;
  padding: 7px 10px;
  font-size: 14px;
}
.notice { border-top: 1px solid #262626; padding: 16px 0; }
.notice-head { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
.badge { font-size: 12px; padding: 2px 8px; border-radius: 999px; border: 1px solid; }
.badge-scheduled { color: #ff8a8a; border-color: #ff8a8a; }
.badge-applied { color: #9a9a9a; border-color: #555; }
.badge-canceled { color: #777; border-color: #444; text-decoration: line-through; }
.changes { margin: 8px 0; padding-left: 18px; font-size: 14px; color: #d0d0d0; }
.changes strong { color: #fff; }
.prob-footer { margin-top: 48px; border-top: 1px solid #262626; padding-top: 16px; font-size: 13px; color: #9a9a9a; }
@media (max-width: 480px) {
  h1 { font-size: 23px; }
  .pct { font-size: 16px; }
}
</style>
