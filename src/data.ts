import type { BomItem, RoutingItem, SopItem } from "./types";

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

export { targetOperation, bom, routing, sop };
