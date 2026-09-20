const targetOperation = "Bolt 체결";

const bom = [
  {
    partNumber: "B20",
    partName: "Bolt",
    quantity: 4
  }
];

const routing = [
  {
    sequence: 1,
    operation: "Bearing 장착"
  },
  {
    sequence: 2,
    operation: targetOperation
  }
];

const sop = [
  {
    operation: "Bearing 장착",
    machine: "Press P-01",
    safety: "보안경 착용"
  },
  {
    operation: targetOperation,
    torque: "35Nm",
    safety: "보안경 착용"
  }
];

const targetRouting = routing.find(
  (item) => item.operation === targetOperation
);
const targetSop = sop.find((item) => item.operation === targetOperation);

// Faile test case: Bolt 체결 Routing 또는 SOP가 없는 경우
if (!targetRouting) {
  throw new Error(` ${targetOperation} Routing을 찾을 수 없습니다.`);
}

if (!targetSop) {
  throw new Error(` ${targetOperation} SOP를 찾을 수 없습니다.`);
}

const workStep = {
  sequence: targetRouting.sequence,
  part: `${bom[0].partName} (${bom[0].partNumber})`,
  quantity: bom[0].quantity,
  torque: targetSop.torque,
  safety: targetSop.safety
};

console.log("Work Step:", workStep);
