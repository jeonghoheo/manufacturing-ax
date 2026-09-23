export type BomItem = {
  partNumber: string;
  partName: string;
  quantity: number;
};

export type RoutingItem = {
  sequence: number;
  operationId: string;
  operation: string;
  partNumber: string;
};

export type SopItem = {
  operationId: string;
  operation: string;
  torque?: string;
  machine?: string;
  safety: string;
};

export type WorkStep = {
  sequence: number;
  operationId: string;
  operation: string;
  part: string;
  quantity: number;
  torque?: string;
  machine?: string;
  safety: string;
};
