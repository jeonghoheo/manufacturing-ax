# Manufacturing AX

제조 현장에서 사용하는 작업지시서(Work Instruction)를 더 안전하고 효율적으로 생성하기 위한 AX 프로젝트입니다.

현재는 AI를 붙이기 전에, 제조 데이터를 어떻게 구조화하고 서로 연결할지 학습하고 구현하는 단계입니다.

## Project Goal

최종 목표는 다음과 같은 제조 데이터를 활용하여 작업지시서 초안을 자동으로 생성하는 시스템을 만드는 것입니다.

- BOM
- Routing
- SOP
- Production Order

향후 LLM, RAG, Structured Output, Validation, Human Approval 등을 단계적으로 추가할 예정입니다.

최종적으로는 다음과 같은 흐름을 목표로 합니다.

```text
Production Order
      +
     BOM
      +
   Routing
      +
     SOP
      ↓
필요한 제조 데이터 수집
      ↓
관련 SOP 검색 (RAG)
      ↓
LLM 작업지시서 초안 생성
      ↓
Validation
      ↓
Supervisor Approval
      ↓
Work Instruction
```

## Core Principle

이 프로젝트에서 가장 중요하게 생각하는 원칙은 다음과 같습니다.

> 이미 정답이 존재하는 데이터를 LLM에게 다시 판단하게 하지 않는다.

예를 들어 다음 정보는 회사 시스템이나 제조 문서에서 직접 가져와야 합니다.

```text
생산 수량
부품 번호
부품 수량
작업 순서
Torque
설비 정보
안전 기준
```

LLM은 이러한 값을 새롭게 만들어내는 것이 아니라, 이미 존재하는 데이터를 작업자가 이해하기 쉬운 형태로 표현하는 역할을 담당합니다.

예:

```text
SOP
Torque = 35Nm
        ↓
LLM
        ↓
"B20 Bolt를 35Nm로 체결하십시오."
```

반대로 다음과 같은 동작은 허용하지 않는 방향으로 설계합니다.

```text
Torque 정보 없음
        ↓
LLM이 추측
        ↓
"40Nm로 체결하십시오."
```

## Manufacturing Concepts

### BOM

BOM은 `Bill of Materials`의 약자로, 제품을 생산하기 위해 필요한 부품과 수량을 나타냅니다.

예:

```text
Bearing A12 × 1
Bolt B20 × 4
```

질문으로 표현하면:

> 무엇이 필요한가?

### Routing

Routing은 제품을 생산하기 위해 어떤 작업을 어떤 순서로 수행해야 하는지를 나타냅니다.

예:

```text
1. Bearing 장착
2. Bolt 체결
3. 정렬 검사
```

질문으로 표현하면:

> 어떤 순서로 작업하는가?

### SOP

SOP는 `Standard Operating Procedure`의 약자로, 특정 작업을 어떻게 수행해야 하는지를 정의합니다.

예:

```text
Bolt 체결

Torque: 35Nm
Safety: 보안경 착용
```

질문으로 표현하면:

> 이 작업을 어떻게 해야 하는가?

## Current Implementation

현재 프로젝트에서는 BOM, Routing, SOP를 TypeScript 데이터로 표현하고 있습니다.

예:

```ts
const bom = [
  {
    partNumber: "B20",
    partName: "Bolt",
    quantity: 4,
  },
];

const routing = [
  {
    sequence: 1,
    operation: "Bearing 장착",
  },
  {
    sequence: 2,
    operation: "Bolt 체결",
  },
];

const sop = [
  {
    operation: "Bearing 장착",
    machine: "Press P-01",
    safety: "보안경 착용",
  },
  {
    operation: "Bolt 체결",
    torque: "35Nm",
    safety: "보안경 착용",
  },
];
```

특정 작업을 기준으로 관련 데이터를 검색합니다.

```ts
const targetOperation = "Bolt 체결";

const targetRouting = routing.find(
  (item) => item.operation === targetOperation
);

const targetSop = sop.find(
  (item) => item.operation === targetOperation
);
```

필요한 제조 데이터를 찾을 수 없는 경우 작업을 계속 진행하지 않습니다.

```ts
if (!targetRouting) {
  throw new Error(
    `${targetOperation} Routing을 찾을 수 없습니다.`
  );
}

if (!targetSop) {
  throw new Error(
    `${targetOperation} SOP를 찾을 수 없습니다.`
  );
}
```

이 프로젝트에서는 이러한 방식을 `Fail Fast` 원칙의 시작점으로 사용하고 있습니다.

필수 제조 데이터가 없는 상태에서 잘못된 작업지시서를 생성하는 것보다 명확하게 실패하는 것이 더 안전하다고 판단하기 때문입니다.

현재 생성되는 작업 데이터의 예시는 다음과 같습니다.

```text
Work Step: {
  sequence: 2,
  part: 'Bolt (B20)',
  quantity: 4,
  torque: '35Nm',
  safety: '보안경 착용'
}
```

## Tech Stack

현재 사용 중인 기술:

```text
TypeScript
Node.js
tsx
npm
```

향후 추가 예정:

```text
Zod
OpenAI API
Structured Output
PostgreSQL
pgvector
RAG
Vector Search
Evaluation
Human Approval
Docker
```

## Getting Started

프로젝트 의존성을 설치합니다.

```bash
npm install
```

현재 예제를 실행합니다.

```bash
npx tsx index.ts
```

## Current Learning Topics

현재까지 학습한 내용:

- BOM / Routing / SOP의 차이
- 제조 데이터와 LLM 역할 분리
- JavaScript / TypeScript 배열
- `find()`를 이용한 데이터 검색
- Optional Chaining
- Fail Fast
- 하드코딩 줄이기
- LLM Hallucination의 위험
- RAG의 기본 개념
- Embedding의 기본 개념
- Vector Search의 기본 개념
- Chunk의 역할

## Roadmap

다음 단계에서는 프로젝트를 아래 방향으로 확장합니다.

```text
1. BOM에서 작업에 맞는 부품 검색
2. 여러 Routing 작업 처리
3. Work Step 생성 함수 분리
4. TypeScript 타입 정의
5. Zod Validation 추가
6. LLM 연결
7. Structured Output
8. 작업지시서 생성
9. SOP 문서 RAG
10. Retrieval Evaluation
11. Human Approval
12. Audit / Traceability
```

## Long-Term Goal

이 프로젝트의 목적은 단순한 AI 챗봇을 만드는 것이 아닙니다.

최종적으로는 다음 질문에 답할 수 있는 시스템을 만드는 것이 목표입니다.

> 제조 현장에 존재하는 Production Order, BOM, Routing, SOP 등의 데이터를 어떻게 안전하게 연결하고, LLM을 제한적으로 활용하여 추적 가능하고 검증 가능한 작업지시서를 생성할 수 있을까?

LLM이 모든 것을 결정하도록 만드는 대신,

```text
FACT
→ 제조 시스템

RULE
→ 프로그램

LANGUAGE
→ LLM
```

으로 역할을 분리하여 실제 제조 환경에서도 사용할 수 있는 AX 시스템을 설계하는 것을 목표로 합니다.