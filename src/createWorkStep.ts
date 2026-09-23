import { bom, sop } from "./data";
import type { RoutingItem, WorkStep } from "./types";

export function createWorkStep(routingItem: RoutingItem): WorkStep {
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
