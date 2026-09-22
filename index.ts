type BomItem = {
  partNumber: string;
  partName: string;
  quantity: number;
};

type RoutingItem = {
  sequence: number;
  operation: string;
  partNumber: string;
};

type SopItem = {
  operation: string;
  torque?: string;
  machine?: string;
  safety: string;
};

type WorkStep = {
  sequence: number;
  part: string;
  quantity: number;
  torque?: string;
  machine?: string;
  safety: string;
};

const targetOperation = "Bolt 체결";

const bom: BomItem[] = [
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

const routing: RoutingItem[] = [
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

const sop: SopItem[] = [
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

function createWorkStep(targetOperation: string): WorkStep {
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

const workStep = routing.map((item) => createWorkStep(item.operation));
console.log("Work Step:", workStep);
