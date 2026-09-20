const targetOperation = "Bolt 체결";

const bom = [
  {
    partNumber: "A12",
    partName: "Bearing",
    quantity: 1
  },
  {
    partNumber: "B20",
    partName: "Bolt",
    quantity: 4
  }
];

const routing = [
  {
    sequence: 1,
    operation: "Bearing 장착",
    partNumber: "A12"
  },
  {
    sequence: 2,
    operation: targetOperation,
    partNumber: "B20"
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

function createWorkStep(targetOperation: string) {
  const targetRouting = routing.find(
    (item) => item.operation === targetOperation
  );

  if (!targetRouting) {
    throw new Error(` ${targetOperation} Routing을 찾을 수 없습니다.`);
  }

  const targetPart = bom.find(
    (item) => item.partNumber === targetRouting.partNumber
  );

  if (!targetPart) {
    throw new Error(
      `${targetRouting.partNumber} 부품을 BOM에서 찾을 수 없습니다.`
    );
  }

  const targetSop = sop.find((item) => item.operation === targetOperation);

  if (!targetSop) {
    throw new Error(` ${targetOperation} SOP를 찾을 수 없습니다.`);
  }

  return {
    sequence: targetRouting.sequence,
    part: `${targetPart.partName} (${targetPart.partNumber})`,
    quantity: targetPart.quantity,
    torque: targetSop.torque,
    safety: targetSop.safety
  };
}

const workStep = createWorkStep("Bolt 체결");
console.log("Work Step:", workStep);
