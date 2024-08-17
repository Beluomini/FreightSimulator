export interface SimulationResponse {
  id: number;
  userName: string;
  prodHeight: number;
  prodWidth: number;
  prodDepth: number;
  prodWeight: number;
  toAddress: string;
  fromAddress: string;
  distance: number;
  fasterLogisticOperator: string;
  cheaperLogisticOperator: string;
}

export interface SimulationRequest {
  clientName: string;
  toAddress: string;
  fromAddress: string;
  productHeight: number;
  productWidth: number;
  productDepth: number;
  productWeight: number;
}
