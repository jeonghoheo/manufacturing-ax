type BomItem = {
  partNumber: string;
  partName: string;
  quantity: number;
};

type RoutingItem = {
  sequence: number;
  operationId: string;
  operation: string;
  partNumber: string;
};

type SopItem = {
  operationId: string;
  operation: string;
  torque?: string;
  machine?: string;
  safety: string;
};

type WorkStep = {
  sequence: number;
  operationId: string;
  operation: string;
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
    operationId: "OP-001",
    operation: "Bearing 장착",
    partNumber: "A12"
  },
  {
    sequence: 2,
    operationId: "OP-002",
    operation: targetOperation,
    partNumber: "B20"
  }
];

const sop: SopItem[] = [
  {
    operationId: "OP-001",
    operation: "Bearing 장착",
    machine: "Press P-01",
    safety: "보안경 착용"
  },
  {
    operationId: "OP-002",
    operation: targetOperation,
    torque: "35Nm",
    safety: "보안경 착용"
  }
];

function createWorkStep(routingItem: RoutingItem): WorkStep {
  const targetPart = bom.find(
    (item) => item.partNumber === routingItem.partNumber
  );

  if (!targetPart) {
    throw new Error(
      `${routingItem.partNumber} 부품을 BOM에서 찾을 수 없습니다.`
    );
  }

  const targetSop = sop.find(
    (item) => item.operationId === routingItem.operationId
  );

  if (!targetSop) {
    throw new Error(` ${routingItem.operation} SOP를 찾을 수 없습니다.`);
  }

  return {
    sequence: routingItem.sequence,
    operationId: routingItem.operationId,
    operation: routingItem.operation,
    part: `${targetPart.partName} (${targetPart.partNumber})`,
    quantity: targetPart.quantity,
    torque: targetSop.torque,
    safety: targetSop.safety
  };
}

const workStep = routing.map(createWorkStep);
console.log("Work Step:", workStep);
